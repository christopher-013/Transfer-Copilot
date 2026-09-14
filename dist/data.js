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
// Miramar → Computer Science agreements, read on ASSIST (2025–26) and entered by hand for the demo. Approved ASSIST API
// access replaces these snapshots. Shape mirrors the ASSIST page: section (counts: whether it feeds Transfer Efficiency) →
// group (rule "all" | "one" | "units" with minUnits, ASSIST instruction verbatim) → receiving item → Miramar courses.
// courseIds is every Miramar course on the item; options (when present) are OR alternatives, each an AND bundle;
// acceptedCourseIds narrows a bundle where the agreement note says the major accepts part of it; alternateListing items
// repeat content listed elsewhere and are never counted.
const miramarAssistSource = (receiving,key) => "https://www.assist.org/transfer/results?year=76&institution=45&agreement="+receiving+"&agreementType=to&viewAgreementsOptions=true&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=76%2F45%2Fto%2F"+receiving+"%2FMajor%2F"+key;
const MIRAMAR_UCB_CS_SOURCE = miramarAssistSource(79,"18bc32d8-6aa4-47cc-aced-08ddbf3f4ee7");
const MIRAMAR_UCLA_CS_SOURCE = miramarAssistSource(117,"3fc7b07d-4058-4a0a-1f72-08ddcb96df9e");
const MIRAMAR_SLO_CS_SOURCE = miramarAssistSource(11,"e0eb8add-48f9-4510-c15b-08ddf49aba41");
const miramarId = code => "miramar_"+code.toLowerCase().replace(/[^a-z0-9]/g,"");
const miramarCourse = (code,title,units,category,source,targets) => ({id:miramarId(code),code,title,units,category,college:"San Diego Miramar College",schoolId:"miramar",catalogYear:"2025–26 ASSIST",source,sourceDate:"2026-09-14",targets,transferability:[...(targets.some(t=>t!=="slo")?["UC"]:[]),...(targets.includes("slo")?["CSU"]:[])]});
const MIRAMAR_CS_COURSES = [
  miramarCourse("MATH 150","Calculus with Analytic Geometry I",5,"Math",MIRAMAR_UCB_CS_SOURCE,["ucb","ucla","slo"]),
  miramarCourse("MATH 151","Calculus with Analytic Geometry II",4,"Math",MIRAMAR_UCB_CS_SOURCE,["ucb","ucla","slo"]),
  miramarCourse("MATH 252","Calculus with Analytic Geometry III",4,"Math",MIRAMAR_UCLA_CS_SOURCE,["ucla","slo"]),
  miramarCourse("MATH 254","Introduction to Linear Algebra",3,"Math",MIRAMAR_UCB_CS_SOURCE,["ucb","ucla","slo"]),
  miramarCourse("MATH 255","Differential Equations",3,"Math",MIRAMAR_UCB_CS_SOURCE,["ucb","ucla","slo"]),
  miramarCourse("MATH 245","Discrete Mathematics",3,"Math",MIRAMAR_UCLA_CS_SOURCE,["ucla"]),
  miramarCourse("CISC 190","Java Programming",4,"Computer science",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("CISC 192","C/C++ Programming",4,"Computer science",MIRAMAR_UCLA_CS_SOURCE,["ucla","slo"]),
  miramarCourse("CISC 187","Data Structures in C++",4,"Computer science",MIRAMAR_UCLA_CS_SOURCE,["ucla","slo"]),
  miramarCourse("CISC 191","Intermediate Java Programming",4,"Computer science",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("CISC 211","Computer Organization and Assembly Language",4,"Computer science",MIRAMAR_UCLA_CS_SOURCE,["ucla","slo"]),
  miramarCourse("CISC 246","Discrete Mathematics for Computer Science",3,"Computer science",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("PHYS 195","Mechanics",5,"Physics",MIRAMAR_UCLA_CS_SOURCE,["ucla","slo"]),
  miramarCourse("PHYS 196","Electricity and Magnetism",5,"Physics",MIRAMAR_UCLA_CS_SOURCE,["ucla","slo"]),
  miramarCourse("PHYS 197","Waves, Optics and Modern Physics",5,"Physics",MIRAMAR_UCLA_CS_SOURCE,["ucla","slo"]),
  miramarCourse("ENGL C1000","Academic Reading and Writing",3,"English",MIRAMAR_UCLA_CS_SOURCE,["ucla"]),
  miramarCourse("ENGL 105","Composition and Literature",3,"English",MIRAMAR_UCLA_CS_SOURCE,["ucla"]),
  miramarCourse("ENGL C1001","Critical Thinking and Writing",3,"English",MIRAMAR_UCLA_CS_SOURCE,["ucla"]),
  miramarCourse("PHIL 205","Critical Thinking and Writing in Philosophy",3,"Philosophy",MIRAMAR_UCLA_CS_SOURCE,["ucla"]),
  miramarCourse("PHIL 102A","Introduction to Philosophy: Reality and Knowledge",3,"Philosophy",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("PHIL 102B","Introduction to Philosophy: Values",3,"Philosophy",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("BIOL 107","General Biology-Lecture and Laboratory",4,"Biology",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("BIOL 210A","Introduction to the Biological Sciences I",4,"Biology",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("BIOL 205","General Microbiology",5,"Biology",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("CHEM 200","General Chemistry I - Lecture",3,"Chemistry",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("CHEM 200L","General Chemistry I - Laboratory",2,"Chemistry",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("CHEM 201","General Chemistry II - Lecture",3,"Chemistry",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("CHEM 201L","General Chemistry II - Laboratory",2,"Chemistry",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("CHEM 231","Organic Chemistry I - Lecture",3,"Chemistry",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("CHEM 231L","Organic Chemistry I - Laboratory",2,"Chemistry",MIRAMAR_SLO_CS_SOURCE,["slo"]),
  miramarCourse("ENGE 200","Statics",3,"Engineering",MIRAMAR_SLO_CS_SOURCE,["slo"])
];
const agrItem = (id,receivingCode,receivingTitle,receivingUnits,codes,extra={}) => ({id,receivingCode,receivingTitle,receivingUnits,courseIds:codes.map(miramarId),...extra});
const agrNone = (id,receivingCode,receivingTitle,receivingUnits,extra={}) => ({id,receivingCode,receivingTitle,receivingUnits,courseIds:[],noArticulation:"No Course Articulated",...extra});
const agrAlts = (id,receivingCode,receivingTitle,receivingUnits,optionCodes,extra={}) => {const options=optionCodes.map(b=>b.map(miramarId));return {id,receivingCode,receivingTitle,receivingUnits,options,courseIds:[...new Set(options.flat())],...extra}};
const MIRAMAR_CS_AGREEMENTS = {
  ucb:{id:"miramar-ucb-cs-ba-2025-26",schoolId:"miramar",sending:"San Diego Miramar College",targetId:"ucb",receiving:"UC Berkeley",shortName:"Berkeley",program:"Computer Science, B.A.",year:"2025–26",published:"August 28, 2026",source:MIRAMAR_UCB_CS_SOURCE,retrieved:"2026-09-14",
    efficiencyLabel:"Required for admission",
    keyNotes:["Berkeley considers only applicants who complete every required course here plus UC’s 7-course pattern; highly recommended courses strengthen an application."],
    sections:[
      {id:"required",title:"Required for admission",stageTitle:"Required",instruction:"Complete A and B",counts:true,groups:[
        {id:"ucb-required-a",label:"A",rule:"all",items:[
          agrItem("ucb_math51","MATH 51","Calculus I",4,["MATH 150"]),
          agrItem("ucb_math52","MATH 52","Calculus II",4,["MATH 151"])
        ]},
        {id:"ucb-required-b",label:"B",rule:"one",instruction:"Complete 1 course from the following.",items:[
          agrItem("ucb_math54","MATH 54","Linear Algebra and Differential Equations",4,["MATH 254","MATH 255"],{acceptedCourseIds:[miramarId("MATH 254")],note:"Computer Science does not require full equivalence to Math 54 and will accept just the Linear Algebra course of an articulated Math 54-equivalent series.",
            labels:{[miramarId("MATH 254")]:"MATH 54 · CS accepts alone",[miramarId("MATH 255")]:"Part of MATH 54 (with MATH 254)"},
            notesByCourse:{[miramarId("MATH 254")]:"ASSIST lists MATH 254 and MATH 255 together for MATH 54. The agreement also states that Computer Science does not require full equivalence to Math 54 and will accept just the Linear Algebra course of an articulated Math 54-equivalent series.",[miramarId("MATH 255")]:"ASSIST lists MATH 255 together with MATH 254 for MATH 54. Per the agreement note, Computer Science will accept just the Linear Algebra course of that series (MATH 254)."}}),
          agrNone("ucb_eecs16a","EECS 16A","Designing Information Devices and Systems I",4),
          agrNone("ucb_math56","MATH 56","Linear Algebra",4)
        ]}
      ]},
      {id:"recommended",title:"Highly recommended",stageTitle:"Recommended",instruction:"Complete A",counts:false,groups:[
        {id:"ucb-recommended-a",label:"A",rule:"all",items:[
          agrNone("ucb_compsci61a","COMPSCI 61A","The Structure and Interpretation of Computer Programs",4),
          agrNone("ucb_compsci61b","COMPSCI 61B","Data Structures",4),
          agrNone("ucb_compsci61c","COMPSCI 61C","Machine Structures",4),
          {id:"ucb_compsci70",receivingCode:"COMPSCI 70",receivingTitle:"Discrete Mathematics and Probability Theory",receivingUnits:4,courseIds:[],atUniversity:"Course(s) must be taken at university. This course must be taken at the university after transfer."}
        ]}
      ]}
    ]},
  ucla:{id:"miramar-ucla-cs-bs-2025-26",schoolId:"miramar",sending:"San Diego Miramar College",targetId:"ucla",receiving:"UCLA",shortName:"UCLA",program:"Computer Science, B.S.",year:"2025–26",published:"",source:MIRAMAR_UCLA_CS_SOURCE,retrieved:"2026-09-14",quarter:true,
    efficiencyLabel:"Lower-division major requirements",
    keyNotes:["UCLA lists a minimum transferable cumulative GPA of 3.4 and expects preparation courses done by the end of spring before fall transfer. GPA is not evaluated here.","C++ is preferred; Java and C are also acceptable for the programming requirement.","Listed Miramar courses are approved substitutes for admission preparation and may not be exact equivalents of UCLA’s courses."],
    sections:[
      {id:"required",title:"Lower division major requirements",stageTitle:"Lower division",counts:true,groups:[
        {id:"ucla-1",label:"1",rule:"all",instruction:"Complete the following",items:[
          agrItem("ucla_cs31","COM SCI 31","Introduction to Computer Science I",4,["CISC 192"]),
          agrItem("ucla_cs32","COM SCI 32","Introduction to Computer Science II",4,["CISC 187"]),
          agrItem("ucla_cs33","COM SCI 33","Introduction to Computer Organization",5,["CISC 211"]),
          agrNone("ucla_cs35l","COM SCI 35L","Software Construction Laboratory",4)
        ]},
        {id:"ucla-2",label:"2",rule:"one",instruction:"Complete 1 course from A",items:[
          agrNone("ucla_csm51a","COM SCI M51A","Logic Design of Digital Systems",4),
          agrNone("ucla_ecm16","EC ENGR M16","Logic Design of Digital Systems",4,{sameAs:"COM SCI M51A"})
        ]},
        {id:"ucla-3",label:"3",rule:"all",instruction:"Complete the following",items:[
          agrItem("ucla_math31a","MATH 31A","Differential and Integral Calculus",4,["MATH 150"]),
          agrItem("ucla_math31b","MATH 31B","Integration and Infinite Series",4,["MATH 151"]),
          agrItem("ucla_math32a","MATH 32A","Calculus of Several Variables",4,["MATH 252"]),
          agrItem("ucla_math32b","MATH 32B","Calculus of Several Variables",4,["MATH 252"]),
          agrItem("ucla_math33a","MATH 33A","Linear Algebra and Applications",4,["MATH 254"]),
          agrItem("ucla_math33b","MATH 33B","Differential Equations",4,["MATH 255"]),
          agrItem("ucla_math61","MATH 61","Introduction to Discrete Structures",4,["MATH 245"])
        ]},
        {id:"ucla-4",label:"4",rule:"all",instruction:"Complete the following",items:[
          agrItem("ucla_physics","PHYSICS 1A, 1B, 1C, 4AL and 4BL","Physics for Scientists and Engineers series with mechanics and electricity & magnetism labs",19,["PHYS 195","PHYS 196","PHYS 197"])
        ]},
        {id:"ucla-5",label:"5",rule:"all",instruction:"Complete 1 course from A and B",items:[
          agrItem("ucla_engcomp3","ENGCOMP 3","English Composition, Rhetoric, and Language",5,["ENGL C1000"],{partLabel:"A"}),
          agrAlts("ucla_engcomp_b","English composition","English composition courses",null,[["ENGL 105"],["ENGL C1001"],["PHIL 205"]],{partLabel:"B"})
        ]},
        {id:"ucla-6",label:"6",rule:"all",instruction:"Complete 1 course from A",items:[
          agrItem("ucla_programming","Programming","Computer programming courses: C++ preferred",null,["CISC 192"],{partLabel:"A"})
        ]}
      ]}
    ]},
  slo:{id:"miramar-slo-cs-bs-2025-26",schoolId:"miramar",sending:"San Diego Miramar College",targetId:"slo",receiving:"Cal Poly San Luis Obispo",shortName:"Cal Poly SLO",program:"Computer Science, B.S.",year:"2025–26",published:"",source:MIRAMAR_SLO_CS_SOURCE,retrieved:"2026-09-14",quarter:true,
    efficiencyLabel:"Major and support courses",
    keyNotes:["This agreement lists the lower-division major and support courses for the degree. Cal Poly’s transfer selection criteria decide which are expected for admission; not every articulated course is required to be competitive.","Units are Cal Poly quarter units. Cal Poly moves to semesters in Fall 2026 and the agreement has not been updated for that yet."],
    sections:[
      {id:"major",title:"Major courses",stageTitle:"Major",counts:true,groups:[
        {id:"slo-major",rule:"all",items:[
          agrAlts("slo_csc101","CSC 101","Fundamentals of Computer Science",4,[["CISC 190"],["CISC 192"]],{sameAs:"CPE 101"}),
          agrNone("slo_csc123","CSC 123","Introduction to Computing",4,{sameAs:"CPE 123"}),
          agrAlts("slo_csc202","CSC 202","Data Structures",4,[["CISC 187"],["CISC 191"]],{sameAs:"CPE 202"}),
          agrNone("slo_csc203","CSC 203","Project-Based Object-Oriented Programming and Design",4,{sameAs:"CPE 203"}),
          agrNone("slo_cpe_series","CPE 101, CPE 202 and CPE 203","Fundamentals of Computer Science, Data Structures, and Project-Based Object-Oriented Programming and Design",12,{alternateListing:"The same courses as CSC 101, CSC 202 and CSC 203, listed as a CPE series."}),
          agrItem("slo_csc225","CSC 225","Introduction to Computer Organization",4,["CISC 211"],{sameAs:"CPE 225"}),
          agrItem("slo_csc248","CSC 248","Discrete Structures",4,["CISC 246"])
        ]}
      ]},
      {id:"support",title:"Support courses",stageTitle:"Support",counts:true,groups:[
        {id:"slo-support-math",rule:"all",items:[
          agrItem("slo_math141","MATH 141","Calculus I",4,["MATH 150"],{sameAs:"HNRS 141"}),
          agrItem("slo_math142","MATH 142","Calculus II",4,["MATH 151"],{sameAs:"HNRS 142"}),
          agrItem("slo_math141_142","MATH 141 and MATH 142","Calculus I and Calculus II",8,["MATH 150","MATH 151"],{alternateListing:"The same courses as MATH 141 and MATH 142, listed together."}),
          agrItem("slo_math143","MATH 143","Calculus III",4,["MATH 151"],{sameAs:"HNRS 143"})
        ]},
        {id:"slo-support-linear",rule:"one",instruction:"Select 1 course from the following.",items:[
          agrItem("slo_math206","MATH 206","Linear Algebra I",4,["MATH 254"]),
          agrItem("slo_math244","MATH 244","Linear Analysis I",4,["MATH 255","MATH 254"],{sameAs:"HNRS 244"})
        ]},
        {id:"slo-support-phil",rule:"one",instruction:"Select 1 course from the following.",items:[
          agrItem("slo_phil230","PHIL 230","Philosophical Classics: Knowledge & Reality",4,["PHIL 102A"],{sameAs:"HNRS 230"}),
          agrItem("slo_phil231","PHIL 231","Philosophical Classics: Ethics and Political Philosophy",4,["PHIL 102B"],{sameAs:"HNRS 231",note:"ASSIST lists PHIL 102B twice for PHIL 231: once as the preferred course and once as an acceptable substitute."})
        ]},
        {id:"slo-support-life",rule:"units",minUnits:4,instruction:"Select 4.00 units from the following.",items:[
          agrNone("slo_bio213_brae213","BIO 213 and BRAE 213","Life Science for Engineers and Bioengineering Fundamentals",4),
          agrItem("slo_bio111_life","BIO 111","General Biology",4,["BIOL 107"]),
          agrItem("slo_bio161_life","BIO 161","Introduction to Cell and Molecular Biology",4,["BIOL 210A"]),
          agrNone("slo_bot121_life","BOT 121","General Botany",4),
          agrItem("slo_mcro221_life","MCRO 221","Microbiology",4,["BIOL 205"])
        ]},
        {id:"slo-support-science",rule:"units",minUnits:4,instruction:"Select 4.00 units from the following.",items:[
          agrItem("slo_bio111_science","BIO 111","General Biology",4,["BIOL 107"]),
          agrItem("slo_bio161_science","BIO 161","Introduction to Cell and Molecular Biology",4,["BIOL 210A"]),
          agrNone("slo_bot121_science","BOT 121","General Botany",4),
          agrItem("slo_chem124","CHEM 124","General Chemistry for Physical Science and Engineering I",4,["CHEM 200","CHEM 200L"]),
          agrItem("slo_mcro221_science","MCRO 221","Microbiology",4,["BIOL 205"]),
          agrItem("slo_phys141","PHYS 141","General Physics I",4,["PHYS 195"],{sameAs:"HNRS 134"})
        ]},
        {id:"slo-support-sequence",rule:"units",minUnits:12,instruction:"Select 12.00 units from the following.",items:[
          agrItem("slo_chem_series","CHEM 124, CHEM 125 and CHEM 126","General Chemistry for Physical Science and Engineering I–III",12,["CHEM 200","CHEM 200L","CHEM 201","CHEM 201L"]),
          agrItem("slo_phys_series","PHYS 141, PHYS 142 and PHYS 143","General Physics I–III",12,["PHYS 195","PHYS 196","PHYS 197"])
        ]}
      ]},
      {id:"other",title:"Other courses (concentration, emphasis and electives)",stageTitle:"Other courses",counts:false,groups:[
        {id:"slo-other",rule:"all",items:[
          agrItem("slo_chem216","CHEM 216","Organic Chemistry I",5,["CHEM 231","CHEM 231L"]),
          agrNone("slo_chem217","CHEM 217","Organic Chemistry II",4),
          agrNone("slo_chem218","CHEM 218","Organic Chemistry III",3),
          agrNone("slo_ee201_251","EE 201 and EE 251","Electric Circuit Theory and Electric Circuits Laboratory",4),
          agrItem("slo_math241","MATH 241","Calculus IV",4,["MATH 252"],{sameAs:"HNRS 241"}),
          agrItem("slo_math242","MATH 242","Differential Equations I",4,["MATH 255"]),
          agrNone("slo_math248","MATH 248","Methods of Proof in Mathematics",4),
          agrItem("slo_me211","ME 211","Engineering Statics",3,["ENGE 200"],{sameAs:"HNRS 211"}),
          agrNone("slo_me212","ME 212","Engineering Dynamics",3,{sameAs:"HNRS 214"})
        ]},
        {id:"slo-other-media",rule:"one",instruction:"Select 1 course from the following.",items:[
          agrNone("slo_isla240","ISLA 240","Introduction to Media Arts and Technologies",4),
          agrNone("slo_art182","ART 182","Foundation in Digital Art I",4),
          agrNone("slo_art183","ART 183","Foundation in Digital Art II",4)
        ]}
      ]}
    ]}
};
// San Diego-area colleges checked for Berkeley requirements Miramar does not articulate: the same UC Berkeley
// Computer Science, B.A. 2025–26 agreement, read on ASSIST per college and entered by hand. Options are informational —
// a course set must be completed at that one college, and Miramar acceptance, prerequisites and seats are not verified.
const assistUcbCsSource = institution => "https://assist.org/transfer/results?year=76&institution="+institution+"&agreement=79&agreementType=to&viewAgreementsOptions=true&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=76%2F"+institution+"%2Fto%2F79%2FMajor%2F18bc32d8-6aa4-47cc-aced-08ddbf3f4ee7";
const NEARBY_UCB_CS = {
  targetId:"ucb",
  program:"Computer Science, B.A.",year:"2025–26",retrieved:"2026-09-14",
  checked:[
    {id:"city",name:"San Diego City College",city:"San Diego, CA",source:assistUcbCsSource(54)},
    {id:"mesa",name:"San Diego Mesa College",city:"San Diego, CA",source:assistUcbCsSource(101)},
    {id:"grossmont",name:"Grossmont College",city:"El Cajon, CA",source:assistUcbCsSource(106)},
    {id:"cuyamaca",name:"Cuyamaca College",city:"El Cajon, CA",source:assistUcbCsSource(99)},
    {id:"southwestern",name:"Southwestern College",city:"Chula Vista, CA",source:assistUcbCsSource(138)},
    {id:"palomar",name:"Palomar College",city:"San Marcos, CA",source:assistUcbCsSource(56)},
    {id:"miracosta",name:"MiraCosta College",city:"Oceanside, CA",source:assistUcbCsSource(108)}
  ],
  options:{
    ucb_eecs16a:[
      {college:"palomar",courses:[{code:"MATH 200",title:"Introduction to Linear Algebra",units:3},{code:"MATH 206",title:"Calculus with Differential Equations",units:4},{code:"ENGR 210",title:"Electrical Network Analysis",units:3},{code:"ENGR 210L",title:"Electrical Network Analysis Lab",units:1}],note:"Effective next fall, this articulation will be revised"}
    ],
    ucb_compsci61b:[
      {college:"southwestern",courses:[{code:"MATH 130",title:"Introduction to Computer Programming",units:4},{code:"MATH 140",title:"Data Structures and Algorithms",units:4}],note:"Must complete an additional university course after transfer to satisfy this requirement",additionalUniversityCourse:"COMPSCI 47B"},
      {college:"palomar",courses:[{code:"CSCI 210",title:"Data Structures",units:4},{code:"CSCI 222",title:"C++ and Object-Oriented Programming",units:4}]},
      {college:"miracosta",courses:[{code:"CS 112",title:"Introduction to Computer Science II: Java",units:3},{code:"CS 113",title:"Basic Data Structures and Algorithms",units:3}],note:"Must complete an additional university course after transfer to satisfy this requirement",additionalUniversityCourse:"COMPSCI 47B"}
    ]
  }
};
const ALL_COURSES = [...COURSES,...MIRAMAR_CS_COURSES];
const STATUS_RANK={none:0,planning:1,registered:2,completed:3},STATUS_LEVELS=["none","planning","registered","completed"];
function agreementItems(a){return a.sections.flatMap(s=>s.groups.flatMap(g=>g.items))}
function agreementCourseIds(a){return [...new Set(agreementItems(a).flatMap(i=>i.courseIds))]}
function itemBundles(item){return item.options||(item.courseIds.length?[item.acceptedCourseIds||item.courseIds]:[])}
function itemLevel(item){const b=itemBundles(item);return b.length?STATUS_LEVELS[Math.max(...b.map(x=>Math.min(...x.map(id=>STATUS_RANK[statusOf(id)]))))]:"none"}
function groupLevels(g){const items=g.items.filter(i=>!i.alternateListing);if(g.rule==="all")return items.map(itemLevel);const ranks=items.map(i=>({units:i.receivingUnits||0,rank:STATUS_RANK[itemLevel(i)]}));if(g.rule==="one")return[STATUS_LEVELS[Math.max(0,...ranks.map(x=>x.rank))]];for(let r=3;r>0;r--)if(ranks.filter(x=>x.rank>=r).reduce((n,x)=>n+x.units,0)>=g.minUnits)return[STATUS_LEVELS[r]];return["none"]}
function agreementDecisionLevels(a){return a.sections.filter(s=>s.counts).flatMap(s=>s.groups.flatMap(groupLevels))}
function assistAgreementFor(targetId){return PLAN.college==="miramar"&&isCS()?MIRAMAR_CS_AGREEMENTS[targetId]||null:null}
function activeAssistAgreements(){return PLAN.college==="miramar"&&isCS()?chosenCampuses().map(t=>MIRAMAR_CS_AGREEMENTS[t.id]).filter(Boolean):[]}
function activeAssistAgreement(){return activeAssistAgreements()[0]||null}
function activeCourses(){const list=activeAssistAgreements();if(!list.length)return COURSES;const ids=new Set(list.flatMap(agreementCourseIds));return MIRAMAR_CS_COURSES.filter(c=>ids.has(c.id))}
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
