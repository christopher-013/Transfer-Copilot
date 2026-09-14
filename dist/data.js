"use strict";
const COURSES = [
  {
    "id": "math151",
    "code": "MATH 151",
    "title": "Calculus with Analytic Geometry II",
    "units": 4,
    "category": "Math",
    "page": 566,
    "targets": [
      "ucsd",
      "sdsu",
      "csusm"
    ],
    "topic": "Calculus II",
    "reason": "Continue the calculus sequence. The UCSD math department lists Mesa MATH 151 for UCSD MATH 20B; other target matches in this demo are illustrative.",
    "verified": "UCSD MATH 20B",
    "completed": false,
    "college": "San Diego Mesa College",
    "source": "https://www.sdmesa.edu/academics/v2/courses/course.html?id=MATH151",
    "sourceDate": "2026-09-13",
    "catalogYear": "2026–27",
    "seats": null,
    "offeringStatus": "Spring 2027 not checked",
    "transferability": [
      "UC",
      "CSU"
    ]
  },
  {
    "id": "cisc187",
    "code": "CISC 187",
    "title": "Data Structures in C++",
    "units": 4,
    "category": "Computer science",
    "page": 454,
    "targets": [
      "ucsd",
      "sdsu",
      "csusm"
    ],
    "topic": "Data structures",
    "reason": "Explore the value of taking data structures next. Target matches are sample assumptions; local programming prerequisites still need to be checked.",
    "completed": false,
    "college": "San Diego Mesa College",
    "source": "https://www.sdmesa.edu/academics/v2/courses/course.html?id=CISC187",
    "sourceDate": "2026-09-13",
    "catalogYear": "2026–27",
    "seats": null,
    "offeringStatus": "Spring 2027 not checked",
    "transferability": [
      "UC",
      "CSU"
    ]
  },
  {
    "id": "cisc246",
    "code": "CISC 246",
    "title": "Discrete Mathematics for Computer Science",
    "units": 3,
    "category": "Computer science",
    "page": 457,
    "targets": [
      "ucsd",
      "csusm"
    ],
    "topic": "Discrete mathematics",
    "reason": "In this sample, discrete math advances two pathways. That overlap is a demonstration rule, not a verified university equivalency.",
    "completed": false,
    "college": "San Diego Mesa College",
    "source": "https://www.sdmesa.edu/academics/v2/courses/course.html?id=CISC246",
    "sourceDate": "2026-09-13",
    "catalogYear": "2026–27",
    "seats": null,
    "offeringStatus": "Spring 2027 not checked",
    "transferability": [
      "UC",
      "CSU"
    ]
  },
  {
    "id": "phys196",
    "code": "PHYS 196",
    "title": "Electricity and Magnetism",
    "units": 5,
    "category": "Physics",
    "page": 608,
    "targets": [
      "sdsu"
    ],
    "topic": "Additional science",
    "reason": "Use this optional course to test a heavier semester. Its SDSU contribution here is illustrative, not an official requirement determination.",
    "completed": false,
    "college": "San Diego Mesa College",
    "source": "https://www.sdmesa.edu/academics/v2/courses/course.html?id=PHYS196",
    "sourceDate": "2026-09-13",
    "catalogYear": "2026–27",
    "seats": null,
    "offeringStatus": "Spring 2027 not checked",
    "transferability": [
      "UC",
      "CSU"
    ]
  },
  {
    "id": "math150",
    "code": "MATH 150",
    "title": "Calculus with Analytic Geometry I",
    "units": 5,
    "category": "Math",
    "page": 565,
    "targets": [
      "ucsd",
      "sdsu",
      "csusm"
    ],
    "topic": "Calculus I",
    "verified": "UCSD MATH 20A",
    "completed": true,
    "college": "San Diego Mesa College",
    "source": "https://www.sdmesa.edu/academics/v2/courses/course.html?id=MATH150",
    "sourceDate": "2026-09-13",
    "catalogYear": "2026–27",
    "seats": null,
    "offeringStatus": "Spring 2027 not checked",
    "transferability": [
      "UC",
      "CSU"
    ]
  },
  {
    "id": "cisc190",
    "code": "CISC 190",
    "title": "Java Programming",
    "units": 4,
    "category": "Computer science",
    "page": 454,
    "targets": [
      "ucsd",
      "sdsu",
      "csusm"
    ],
    "topic": "Introductory programming",
    "completed": true,
    "college": "San Diego Mesa College",
    "source": "https://www.sdmesa.edu/academics/v2/courses/course.html?id=CISC190",
    "sourceDate": "2026-09-13",
    "catalogYear": "2026–27",
    "seats": null,
    "offeringStatus": "Spring 2027 not checked",
    "transferability": [
      "UC",
      "CSU"
    ]
  },
  {
    "id": "phys195",
    "code": "PHYS 195",
    "title": "Mechanics",
    "units": 5,
    "category": "Physics",
    "page": 608,
    "targets": [
      "ucsd",
      "sdsu",
      "csusm"
    ],
    "topic": "Science foundation",
    "completed": true,
    "college": "San Diego Mesa College",
    "source": "https://www.sdmesa.edu/academics/v2/courses/course.html?id=PHYS195",
    "sourceDate": "2026-09-13",
    "catalogYear": "2026–27",
    "seats": null,
    "offeringStatus": "Spring 2027 not checked",
    "transferability": [
      "UC",
      "CSU"
    ]
  }
];
const SOURCES = {
  "catalog": "https://www.sdccd.edu/docs/ISPT/instsrv/Catalogs/MetaFiles/2026_2027/Mesa2026_2027.pdf",
  "classSearch": "https://www.sdccd.edu/students/class-search/search.html",
  "ucsdMath": "https://math.ucsd.edu/students/undergraduate/transfer-equivalencies",
  "ucsdPrep": "https://admissions.ucsd.edu/transfer/transfer-major-preparation.html",
  "sdsu": "https://admissions.sdsu.edu/transfers",
  "sdsuPathway": "https://admissions.sdsu.edu/transfers/sdccd",
  "csusm": "https://www.csusm.edu/academicadvising/majorminor/worksheets/cs/cs.pdf",
  "assist": "https://assist.org",
  "assistApiDocs": "https://prod.assistng.org/apidocs/docs/articulation/agreement",
  "assistTerms": "https://resource.assist.org/Development/Terms"
};
const ASSIST_AGREEMENTS = {
  "ucb": {
    "program": "Computer Science, B.A. + EECS, B.S.",
    "year": "2025–26",
    "published": "August 28, 2026",
    "reviewed": ["math151", "cisc187", "cisc246"],
    "source": "https://assist.org/transfer/results?year=76&institution=101&agreement=79&agreementType=to&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=76%2F101%2Fto%2F79%2FMajor%2F18bc32d8-6aa4-47cc-aced-08ddbf3f4ee7",
    "matches": {
      "math151": {"receiving": "MATH 52", "title": "Calculus II", "programNote": "Listed in both the Computer Science B.A. and EECS B.S. agreements."}
    }
  },
  "ucla": {
    "program": "Computer Science, B.S.",
    "year": "2025–26",
    "published": "April 22, 2026",
    "reviewed": ["math151", "cisc187", "cisc246"],
    "source": "https://assist.org/transfer/results?year=76&institution=101&agreement=117&agreementType=to&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=76%2F101%2Fto%2F117%2FMajor%2F3fc7b07d-4058-4a0a-1f72-08ddcb96df9e",
    "matches": {
      "math151": {"receiving": "MATH 31B", "title": "Integration and Infinite Series"},
      "cisc187": {"receiving": "COM SCI 32", "title": "Introduction to Computer Science II"}
    }
  },
  "pomona": {
    "program": "Computer Science, B.S.",
    "year": "2026–27",
    "published": "September 2, 2026",
    "reviewed": ["math151", "cisc187", "cisc246"],
    "source": "https://assist.org/transfer/results?year=77&institution=101&agreement=75&agreementType=to&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=77%2F101%2Fto%2F75%2FMajor%2F1155e584-f038-4757-8c82-08deaabd5f92",
    "matches": {
      "math151": {"receiving": "MAT 1150", "title": "Calculus II"},
      "cisc187": {"receiving": "CS 2400", "title": "Data Structures and Advanced Programming"},
      "cisc246": {"receiving": "CS 1300", "title": "Discrete Structures"}
    }
  }
};
const TARGETS = [
  {
    "id": "ucsd",
    "name": "UC San Diego",
    "short": "UCSD",
    "monogram": "UC",
    "color": "",
    "total": 8,
    "extras": [
      "Linear algebra",
      "Multivariable calculus"
    ],
    "note": "UCSD publishes CS transfer preparation covering calculus, linear algebra, programming, data structures, discrete math and an approved science course. Only the linked Mesa calculus equivalencies below have been separately verified; the rest of this student's matches are illustrative.",
    "source": "ucsdPrep"
  },
  {
    "id": "sdsu",
    "name": "San Diego State",
    "short": "SDSU",
    "monogram": "SD",
    "color": "red",
    "total": 9,
    "extras": [
      "Further major preparation",
      "General education review",
      "University conditions"
    ],
    "note": "SDSU publishes a specific SDCCD transfer pathway with conditions. This demo does not assess that pathway, ADT completion, local status, GPA, or guaranteed admission. Its checklist and non-UCSD-math mappings are synthetic.",
    "source": "sdsuPathway"
  },
  {
    "id": "csusm",
    "name": "CSU San Marcos",
    "short": "CSUSM",
    "monogram": "SM",
    "color": "teal",
    "total": 8,
    "extras": [
      "Further major preparation",
      "University conditions"
    ],
    "note": "CSUSM is included as a sample CSU comparison. The linked CS advising worksheet is historical (2023–24), not an applicable 2027 admissions agreement. All CSUSM mappings and checklist totals here are illustrative.",
    "source": "csusm"
  }
];
