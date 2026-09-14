import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

async function reachCoursework(page) {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Transfer planning progress" })).toBeVisible();
  await page.locator("label.school-tile", { hasText: "San Diego Miramar College" }).click();
  await page.getByRole("button", { name: /Choose my destinations/ }).click();
  await page.locator("label.school-tile", { hasText: "UC Berkeley" }).click();
  await page.locator("label.school-tile", { hasText: "UCLA" }).click();
  await page.getByRole("button", { name: /Choose my major/ }).click();
  await page.getByLabel("Intended major").fill("Computer Science");
  await page.getByRole("button", { name: /Add my coursework/ }).click();
  await expect(page.locator(".workflow-steps .current")).toContainText("Coursework");
  await expect(page.getByRole("navigation", { name: "ASSIST agreement workflow" })).toBeVisible();
}

test("Miramar to Berkeley and UCLA supports grouped decisions, completion and efficiency", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes("mobile"), "Covered by the focused mobile test");
  await reachCoursework(page);
  await expect(page.locator(".agreement-journey")).toContainText("Group A");
  await expect(page.locator(".agreement-journey")).toContainText("Group B");
  const math150 = page.locator('[data-course-tile="miramar_math150"]').first();
  await math150.getByRole("button", { name: /MATH 150/ }).click();
  await math150.getByRole("button", { name: "Completed" }).click();
  await expect(math150).toHaveClass(/status-completed/);
  await page.locator(".agreement-journey button").last().click();
  await page.getByRole("button", { name: /Review my plan/ }).click();
  await expect(page.getByRole("heading", { name: "Take your plan with you." })).toBeVisible();
  await expect(page.getByText("Transfer Completion", { exact: true }).first()).toBeVisible();
  await expect(page.locator(".export-grid")).toContainText("PDF");
  await expect(page.locator(".export-grid")).toContainText("Word");
  await expect(page.locator(".export-grid")).toContainText("Excel");
  await expect(page.locator(".export-grid")).toContainText("Markdown");
  const [markdownDownload] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: /Markdown/ }).click()]);
  expect(await readFile(await markdownDownload.path(), "utf8")).toContain("## Transfer Completion");
  await markdownDownload.saveAs(testInfo.outputPath("transfer-plan.md"));
  const [wordDownload] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: /Word/ }).click()]);
  expect((await readFile(await wordDownload.path())).toString("latin1")).toContain("word/document.xml");
  await wordDownload.saveAs(testInfo.outputPath("transfer-plan.docx"));
  const [excelDownload] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: /Excel/ }).click()]);
  expect((await readFile(await excelDownload.path())).toString("latin1")).toContain("xl/workbook.xml");
  await excelDownload.saveAs(testInfo.outputPath("transfer-plan.xlsx"));
  const [pdfReport] = await Promise.all([page.waitForEvent("popup"), page.getByRole("button", { name: /^PDF/ }).click()]);
  await expect(pdfReport).toHaveTitle("Transfer Copilot plan");
  await expect(pdfReport.getByRole("heading", { name: "Transfer Copilot plan" })).toBeVisible();
  await pdfReport.close();
  await page.getByRole("button", { name: /Open my transfer plan/ }).click();
  await expect(page.getByText("Transfer Efficiency", { exact: true })).toBeVisible();
  await expect(page.locator(".efficiency-score>strong")).toHaveText(/^\d+\.\d{2}$/);
  await expect(page.locator(".efficiency-summary")).toContainText("selected destinations");
  const recommendationBefore = await page.locator(".next-course>strong").textContent() + ":" + await page.locator(".efficiency-score>strong").textContent();
  await page.evaluate(() => setCourseStatus(nextMove().c.id, "completed"));
  const recommendationAfter = await page.locator(".next-course>strong").textContent() + ":" + await page.locator(".efficiency-score>strong").textContent();
  expect(recommendationAfter).not.toBe(recommendationBefore);
  const mapping = page.locator(".fit-row", { hasText: "MATH 150" }).first();
  await expect(mapping.locator(".fit-dest")).toHaveCount(2);
  await expect(mapping).toContainText("UC Berkeley");
  await expect(mapping).toContainText("UCLA");
});

test("mobile coursework keeps the workflow usable without page overflow", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Mobile-only layout assertion");
  await reachCoursework(page);
  const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(sizes.scroll).toBeLessThanOrEqual(sizes.client + 1);
  await expect(page.locator(".workflow-steps .current")).toContainText("Coursework");
  const map = page.locator(".articulation-map").first();
  const columns = await map.evaluate(el => getComputedStyle(el).gridTemplateColumns.split(" ").length);
  expect(columns).toBe(1);
});
