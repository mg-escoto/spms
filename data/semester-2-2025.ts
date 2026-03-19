export type Dimension = "Ql" | "Qn" | "T";

export interface RatingEntry {
  dim: Dimension;
  commitment: string;
  q1Actual: string;
  q1Rating: number | null;
  q2Actual: string;
  q2Rating: number | null;
  semAvg: number | null;
}

export interface SI {
  id: number;
  part: "A" | "B";
  name: string;
  successIndicator: string;
  ratings: RatingEntry[];
  avePerSI: number | null;
}

export interface SemesterData {
  employee: string;
  position: string;
  period: string;
  semesterLabel: string;
  partASubtotal: number;
  partBSubtotal: number | null;
  overallNumerical: number;
  overallAdjectival: string;
  partAWeight: number;
  partBWeight: number;
  sis: SI[];
}

const data: SemesterData = {
  employee: "Mary Grace L. Escoto",
  position: "Chief Administrative Officer",
  period: "04 August to 31 December 2025",
  semesterLabel: "2nd Semester 2025",
  partASubtotal: 4.71,
  partBSubtotal: null,
  overallNumerical: 3.77,
  overallAdjectival: "Very Satisfactory",
  partAWeight: 80,
  partBWeight: 20,
  sis: [
    {
      id: 1,
      part: "A",
      name: "Review and Approve/Endorse HRDD Policies",
      successIndicator:
        "80% reviewed and approved/endorsed HRDD-related guidelines to the immediate supervisor with each submission accepted with three (3) to four (4) major revisions on the set deadline.",
      ratings: [
        {
          dim: "Ql",
          commitment: "Accepted with (3) to four (4) major revisions",
          q1Actual:
            "(1) Constitution of the PDC — accepted without revision\n(2) DO 2025-011 — accepted with 1 revision",
          q1Rating: 4.5,
          q2Actual: "N/A",
          q2Rating: null,
          semAvg: 4.5,
        },
        {
          dim: "Qn",
          commitment: "80% submission rate on the set deadline",
          q1Actual: "5",
          q1Rating: 5,
          q2Actual: "5",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "On the set deadline",
          q1Actual: "5",
          q1Rating: 5,
          q2Actual: "5",
          q2Rating: 5,
          semAvg: 5,
        },
      ],
      avePerSI: 4.83,
    },
    {
      id: 2,
      part: "A",
      name: "Review and Submit Annual L&D Plan",
      successIndicator:
        "Reviewed and submitted the draft Annual Learning and Development Plan partially aligned with the competency assessment results, other assessment tools, organizational priorities, and other related guidelines on or before 31 March of each calendar year.",
      ratings: [
        {
          dim: "Ql",
          commitment:
            "L&D Plan shows partial alignment with validated competency gaps and other assessment related tools and guidelines.",
          q1Actual:
            "Complete alignment with validated competency gaps and other assessment related tools and guidelines.",
          q1Rating: 5,
          q2Actual: "N/A",
          q2Rating: null,
          semAvg: 5,
        },
        {
          dim: "Qn",
          commitment: "Submitted Annual L&D Plan",
          q1Actual: "Submitted Annual L&D Plan",
          q1Rating: 5,
          q2Actual: "N/A",
          q2Rating: null,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "On or before 31 March of the current year",
          q1Actual: "Submitted Annual L&D Plan on 14 Mar 2025",
          q1Rating: 5,
          q2Actual: "N/A",
          q2Rating: null,
          semAvg: null,
        },
      ],
      avePerSI: 5.0,
    },
    {
      id: 3,
      part: "A",
      name: "Review and Submit CBLDIs",
      successIndicator:
        "100% of CBLDIs were partially aligned with validated competency assessment results, organizational needs, and CSC/agency standards with complete details submitted to the Director for Administrative Service on the prescribed deadline.",
      ratings: [
        {
          dim: "Ql",
          commitment:
            "CBLDIs were partially aligned with validated competency assessment results, organizational needs, and CSC/agency standards with complete details",
          q1Actual:
            "Complete alignment with validated competency assessment results, organizational needs, and CSC/agency standards with complete details",
          q1Rating: 5,
          q2Actual: "N/A",
          q2Rating: null,
          semAvg: 5,
        },
        {
          dim: "Qn",
          commitment: "100% submission rate",
          q1Actual: "100% submission rate",
          q1Rating: 5,
          q2Actual: "N/A",
          q2Rating: null,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "On the prescribed deadline",
          q1Actual: "Submitted CBLDI Plan on 14 Mar 2025",
          q1Rating: 5,
          q2Actual: "N/A",
          q2Rating: null,
          semAvg: null,
        },
      ],
      avePerSI: 5.0,
    },
    {
      id: 4,
      part: "A",
      name: "Review and Submit Quarterly L&D Calendar",
      successIndicator:
        "100% submission rate of the quarterly L&D Calendar were partially aligned with CBLDI on the set deadlines for each quarter.",
      ratings: [
        {
          dim: "Ql",
          commitment:
            "Drafted Q1 L&D Calendar reflects and partially aligned with approved CBLDIs and L&D priorities for January–March, complete with all the necessary details.",
          q1Actual:
            "Complete alignment of the 1st Q L&D Calendar to the approved CBLDI and with all the necessary details",
          q1Rating: 5,
          q2Actual:
            "Complete alignment of the 1st Q L&D Calendar to the approved CBLDI and with all the necessary details",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "Qn",
          commitment: "100% submission rate",
          q1Actual: "100% submission rate",
          q1Rating: 5,
          q2Actual: "100% submission rate",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "On the set deadline",
          q1Actual:
            "Approval delayed due to recent change in administration, which consequently affected the authorized signatories.",
          q1Rating: null,
          q2Actual:
            "Approval delayed due to recent change in administration, which consequently affected the authorized signatories.",
          q2Rating: null,
          semAvg: null,
        },
      ],
      avePerSI: 5.0,
    },
    {
      id: 5,
      part: "A",
      name: "Comply to at Least One L&D Intervention per Employee per Year",
      successIndicator:
        "80% compliance rate of the organic personnel undergone at least one (1) planned HRDI during the year.",
      ratings: [
        {
          dim: "Qn",
          commitment: "80% compliance rate",
          q1Actual: "N/A",
          q1Rating: null,
          q2Actual: "45% Compliance rate",
          q2Rating: 3,
          semAvg: 3,
        },
        {
          dim: "Ql",
          commitment: "Satisfactory feedback",
          q1Actual: "Outstanding feedback",
          q1Rating: 5,
          q2Actual: "Outstanding feedback",
          q2Rating: 5,
          semAvg: 5,
        },
      ],
      avePerSI: 3.0,
    },
    {
      id: 6,
      part: "A",
      name: "Review and Approve/Endorse On-the-Job Training (OJTs)",
      successIndicator:
        "80% On-the-Job Training endorsement of qualified OJT Trainees deployed to Offices/Services/Divisions reviewed and approved/endorsed within 2 days with satisfactory feedback.",
      ratings: [
        {
          dim: "Ql",
          commitment: "Satisfactory feedback",
          q1Actual: "Outstanding feedback",
          q1Rating: 5,
          q2Actual: "Outstanding feedback",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "Qn",
          commitment: "80% On-the-Job Training endorsement",
          q1Actual: "100% On-the-Job Training endorsement",
          q1Rating: 5,
          q2Actual: "100% On-the-Job Training endorsement",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "2 days",
          q1Actual: "1 day after receipt",
          q1Rating: 4.62,
          q2Actual: "1 day after receipt",
          q2Rating: 4.95,
          semAvg: 4.79,
        },
      ],
      avePerSI: 4.93,
    },
    {
      id: 7,
      part: "A",
      name: "Review and Endorse for Approval of Local Travel Order (LTO) / Memo Directive (MD)",
      successIndicator:
        "100% of the request reviewed and endorsed for approval of drafted Local Travel Orders (LTOs)/Memo Directives (MDs) for local non-study programs without Non-Conformity findings on Audit, 3 WDs prior the start of the program.",
      ratings: [
        {
          dim: "Qn",
          commitment: "100% of the requests reviewed and endorsed",
          q1Actual: "100% of the requests reviewed and endorsed",
          q1Rating: 5,
          q2Actual: "100% of the requests reviewed and endorsed",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "3 WDs before the start of the program",
          q1Actual:
            "Average of 4.5 WDs before the start of the program — please refer to MT for justification",
          q1Rating: 4.57,
          q2Actual:
            "Average of 4.5 WDs before the start of the program — please refer to MT for justification",
          q2Rating: 4.56,
          semAvg: 4.56,
        },
        {
          dim: "Ql",
          commitment: "Without Non-Conformity findings on Audit",
          q1Actual: "Without Non-Conformity findings on Audit",
          q1Rating: 5,
          q2Actual: "Without Non-Conformity findings on Audit",
          q2Rating: 5,
          semAvg: 5,
        },
      ],
      avePerSI: 4.85,
    },
    {
      id: 8,
      part: "A",
      name: "Review and Endorse Memorandum Evaluation for L&D Programs Not in CBLDI",
      successIndicator:
        "80-89% memo evaluations of training request with partial alignment with CSC and HRDD issuances released within 7 working days.",
      ratings: [
        {
          dim: "Ql",
          commitment: "With partial alignment with CSC and HRDD issuances",
          q1Actual: "Complete alignment with CSC and HRDD issuances",
          q1Rating: 5,
          q2Actual: "Complete alignment with CSC and HRDD issuances",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "Qn",
          commitment: "80-89% memo evaluations of training request",
          q1Actual: "100% (1/1) memo evaluations of training request",
          q1Rating: 5,
          q2Actual: "100% (6/6) memo evaluations of training request",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "7 working days upon receipt",
          q1Actual: "1-3 working days upon receipt",
          q1Rating: 5,
          q2Actual: "7 working days upon receipt",
          q2Rating: 3,
          semAvg: 4,
        },
      ],
      avePerSI: 4.67,
    },
    {
      id: 9,
      part: "A",
      name: "Review and Endorse Foreign Travel Order (FTO) for Non-Study / Study Programs",
      successIndicator:
        "100% of FTO reviewed and endorsed to the Office of the Director for Administrative Service within 2 WDs accepted with two revisions.",
      ratings: [
        {
          dim: "Ql",
          commitment: "Two (2) revisions",
          q1Actual: "With an average of 1 revision",
          q1Rating: 4.89,
          q2Actual: "With an average of 1 revision",
          q2Rating: 4.36,
          semAvg: 4.625,
        },
        {
          dim: "Qn",
          commitment:
            "Review and endorse 100% of drafted FTOs for foreign non-study and study programs as well as official and non-official travels",
          q1Actual:
            "100% (112/112 TAs) reviewed and endorsed for approval to the approving authorities",
          q1Rating: 5,
          q2Actual:
            "100% (139/139 TAs) reviewed and endorsed for approval to the approving authorities",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "Within two (2) WDs upon receipt of complete documents",
          q1Actual:
            "Within an average turn-around time less than a day upon receipt of complete documents",
          q1Rating: 4.78,
          q2Actual:
            "Within an average turn-around time less than a day upon receipt of complete documents",
          q2Rating: 4.81,
          semAvg: 4.795,
        },
      ],
      avePerSI: 4.81,
    },
    {
      id: 10,
      part: "A",
      name: "Review and Approve and Submit Foreign Quarterly Report to OP",
      successIndicator:
        "Foreign Travel Quarterly Report to the Office of the President reviewed and endorsed to the Office of the Director for Administrative Service every fifteenth (15th) working day of the following month of every quarter, with two (2) revisions.",
      ratings: [
        {
          dim: "Ql",
          commitment: "With two (2) revisions",
          q1Actual: "No revision",
          q1Rating: 5,
          q2Actual: "No revision",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment:
            "15th working day of the following month of every quarter",
          q1Actual:
            "12 WDs after the deadline (delay due to waiting for clarification re submission of the Travel Report to OP)",
          q1Rating: 5,
          q2Actual: "3 WDs before the deadline",
          q2Rating: 5,
          semAvg: 5,
        },
      ],
      avePerSI: 5.0,
    },
    {
      id: 11,
      part: "A",
      name: "Review and Endorse Scholars/Participants to Foreign Study/Non-Study Programs — Dissemination Documents",
      successIndicator:
        "80% scholarship related dissemination documents reviewed and endorsed to the Office of the Director for Administrative Service with 2 revisions within 2 days.",
      ratings: [
        {
          dim: "Ql",
          commitment: "With two (2) revisions",
          q1Actual: "No revision",
          q1Rating: 5,
          q2Actual: "No revision",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "Qn",
          commitment:
            "80% scholarship related dissemination documents reviewed and endorsed",
          q1Actual:
            "100% scholarship related dissemination documents reviewed and endorsed",
          q1Rating: 5,
          q2Actual:
            "100% scholarship related dissemination documents reviewed and endorsed",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "Two (2) WDs",
          q1Actual: "Average of 1-2 working days upon receipt",
          q1Rating: 3.75,
          q2Actual: "Average of 2 working days upon receipt",
          q2Rating: 3,
          semAvg: 3.38,
        },
      ],
      avePerSI: 4.46,
    },
    {
      id: 12,
      part: "A",
      name: "Review and Approve Recommendation of Applicants for Foreign Study and Non-Study Program",
      successIndicator:
        "100% reviewed recommendation of applicants to the Personnel Development Committee (PDC) for Foreign Study/Non-Study Programs with 3 revisions submitted within 5 WDs upon receipt of complete requirements.",
      ratings: [
        {
          dim: "Ql",
          commitment: "With 3 revisions",
          q1Actual: "No revision",
          q1Rating: 5,
          q2Actual: "No revision",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "Qn",
          commitment: "100% reviewed recommendation of applicants",
          q1Actual: "100% reviewed recommendation of applicants",
          q1Rating: 5,
          q2Actual: "100% reviewed recommendation of applicants",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "5 WDs upon receipt of complete requirements",
          q1Actual: "Average of 2-3 WDs upon receipt of complete requirements",
          q1Rating: 4.2,
          q2Actual: "Average of 2-3 WDs upon receipt of complete requirements",
          q2Rating: 4.56,
          semAvg: 4.38,
        },
      ],
      avePerSI: 4.79,
    },
    {
      id: 13,
      part: "A",
      name: "Monitor Post-Study Requirements and Prepare Semestral Reports for Foreign Programs",
      successIndicator:
        "80% collected, facilitated of Post-Study Requirements and data encoded via an active database within thirty (30) days upon return from the non-study/study program.",
      ratings: [
        {
          dim: "Qn",
          commitment:
            "80% Post-Study Requirements collected and facilitated and encoded data via an active database",
          q1Actual:
            "100% Post-Study Requirements collected and facilitated and encoded data via an active database",
          q1Rating: 5,
          q2Actual:
            "100% Post-Study Requirements collected, facilitated and encoded data via an active database",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment:
            "Within thirty (30) days upon return from the non-study/study program",
          q1Actual:
            "Within thirty (20) days upon return from the non-study/study program",
          q1Rating: 5,
          q2Actual:
            "Within thirty (20) days upon return from the non-study/study program",
          q2Rating: 5,
          semAvg: 5,
        },
      ],
      avePerSI: 5.0,
    },
    {
      id: 14,
      part: "A",
      name: "Review and Submit Scholarship Semestral Report to the Personnel Development Committee",
      successIndicator:
        "Scholarship Semestral Report reviewed and endorsed to the Office of the Director for Administrative Service every fifteenth (15th) working day of the following month of every semester, with two (2) revisions.",
      ratings: [
        {
          dim: "Ql",
          commitment: "With two (2) revisions",
          q1Actual: "No revision",
          q1Rating: 5,
          q2Actual: "No revision",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment:
            "15th working day of the following month of every semester",
          q1Actual: "N/A",
          q1Rating: null,
          q2Actual:
            "Sent on the 9th working day of the following month of every semester",
          q2Rating: 4,
          semAvg: 4,
        },
      ],
      avePerSI: 4.5,
    },
    {
      id: 15,
      part: "A",
      name: "Review and Approve/Endorse Individual Performance Evaluation Report and Communications",
      successIndicator:
        "80% reviewed and endorsed/approved communications and reports related in the Individual Performance Evaluation within 2 working days upon receipt with 2 revisions before acceptance of the immediate supervisor.",
      ratings: [
        {
          dim: "Ql",
          commitment: "2 revisions",
          q1Actual: "Average of 0-1 revision",
          q1Rating: 4.99,
          q2Actual: "Average of 0-1 revision",
          q2Rating: 4.96,
          semAvg: 4.975,
        },
        {
          dim: "Qn",
          commitment: "80% reviewed and endorsed/approved",
          q1Actual: "100% (62/62) reviewed and endorsed/approved",
          q1Rating: 5,
          q2Actual: "100% (40/40) reviewed and endorsed/approved",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "2 working days",
          q1Actual:
            "Average of less than a day to 1 WD processing upon receipt",
          q1Rating: 4.98,
          q2Actual: "Average of less than a day processing upon receipt",
          q2Rating: 5,
          semAvg: 4.99,
        },
      ],
      avePerSI: 4.99,
    },
    {
      id: 16,
      part: "A",
      name: "Review and Approve/Endorse CES Eligibility and Performance Evaluation",
      successIndicator:
        "80% review and approval of the endorsement of Career Executive Service (CES) Eligibility and/or Examination requirements submitted on the set deadline by the CESB.",
      ratings: [
        {
          dim: "Qn",
          commitment: "80% reviewed",
          q1Actual: "100% reviewed",
          q1Rating: 5,
          q2Actual: "100% reviewed",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "On the deadline",
          q1Actual: "2 days before the prescribed deadline",
          q1Rating: 5,
          q2Actual: "2 days before the prescribed deadline",
          q2Rating: 5,
          semAvg: 5,
        },
      ],
      avePerSI: 5.0,
    },
    {
      id: 17,
      part: "A",
      name: "Review and Approve/Endorse CESPES Forms and Communications",
      successIndicator:
        "80% of the CESPES forms and communications reviewed and approved/endorsed within 3 days upon receipt.",
      ratings: [
        {
          dim: "Qn",
          commitment: "80% administration rate",
          q1Actual:
            "100% (20/20) CESPES forms and communications reviewed and approved/endorsed",
          q1Rating: 5,
          q2Actual:
            "100% (4/4) CESPES forms and communications reviewed and approved/endorsed",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "3 days",
          q1Actual: "Average of 1-2 working days processing upon receipt",
          q1Rating: 4.9,
          q2Actual: "Average of 1 working day processing upon receipt",
          q2Rating: 5,
          semAvg: 4.95,
        },
      ],
      avePerSI: 4.98,
    },
    {
      id: 18,
      part: "A",
      name: "Oversight and Stewardship of Conference Rooms — Trainings, Workshops, Meetings",
      successIndicator:
        "100% management, organization, facilitation, maintenance, and operation of Audio-Visual (AV) equipment and tools at various DOTr Conference rooms checked on the day of the scheduled event with satisfactory feedback.",
      ratings: [
        {
          dim: "Qn",
          commitment:
            "Oversee 100% organization, facilitation, maintenance, and operation of AV equipment at various DOTr Conference rooms",
          q1Actual:
            "100% (32/32) management, organization, facilitation, maintenance, and operation of AV equipment at various DOTr Conference rooms",
          q1Rating: 5,
          q2Actual:
            "98% (44/45) management, organization, facilitation, maintenance, and operation of AV equipment at various DOTr Conference rooms",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "Ql",
          commitment: "Satisfactory feedback",
          q1Actual: "Very Satisfactory Feedback",
          q1Rating: 4,
          q2Actual: "Very Satisfactory Feedback",
          q2Rating: 4.63,
          semAvg: 4.315,
        },
        {
          dim: "T",
          commitment: "On the day of the program",
          q1Actual: "Two (2) hours before the program",
          q1Rating: 3,
          q2Actual: "Two (2) hours before the program",
          q2Rating: 3.8,
          semAvg: 3.4,
        },
      ],
      avePerSI: 4.24,
    },
    {
      id: 19,
      part: "A",
      name: "Conduct of Newly-Hired Employees Orientation (NEO)",
      successIndicator:
        "100% Conduct of one newly-hired employees orientation every last working day of March, June, August and December.",
      ratings: [
        {
          dim: "Qn",
          commitment: "Conduct of one (1) Newly Hired Employees Orientation",
          q1Actual: "Conduct of one (1) Newly Hired Employees Orientation",
          q1Rating: 5,
          q2Actual: "Conduct of one (1) Newly Hired Employees Orientation",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "Last working day",
          q1Actual: "2 days before the prescribed deadline",
          q1Rating: 5,
          q2Actual: "2 days before the prescribed deadline",
          q2Rating: 5,
          semAvg: 5,
        },
      ],
      avePerSI: 5.0,
    },
    {
      id: 20,
      part: "A",
      name: "Conduct and Facilitate Learning and Development Programs",
      successIndicator:
        "80-89% of the scheduled L&D programs conducted and facilitated on the indicated dates on scheduled with Satisfactory Feedback.",
      ratings: [
        {
          dim: "Ql",
          commitment: "Satisfactory Feedback",
          q1Actual: "Very Satisfactory Feedback",
          q1Rating: 4,
          q2Actual: "Very Satisfactory Feedback",
          q2Rating: 4,
          semAvg: 4,
        },
        {
          dim: "Qn",
          commitment: "80-89% Conduct and facilitation of scheduled training programs",
          q1Actual: "100% Conduct and facilitation of scheduled training programs",
          q1Rating: 5,
          q2Actual: "100% Conduct and facilitation of scheduled training programs",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "On scheduled",
          q1Actual: "Facilitated the training programs as scheduled",
          q1Rating: 5,
          q2Actual: "Facilitated the training programs as scheduled",
          q2Rating: 5,
          semAvg: 5,
        },
      ],
      avePerSI: 4.67,
    },
    {
      id: 21,
      part: "A",
      name: "Review and Approve/Endorse Budget Earmarking for Approved L&D Programs",
      successIndicator:
        "80-89% of approved earmarking for the learning and development programs reviewed and approved/endorsed one working day.",
      ratings: [
        {
          dim: "Qn",
          commitment:
            "Maintain 100% endorsement rate of required budget documents for Q1 L&D programs.",
          q1Actual:
            "N/A — Trainings facilitated were out-of-house and not requiring earmarking",
          q1Rating: null,
          q2Actual:
            "100% endorsement rate of required budget documents for Q2 L&D programs.",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "One working day",
          q1Actual:
            "N/A — Trainings facilitated were out-of-house and not requiring earmarking",
          q1Rating: null,
          q2Actual: "Average of 3 days processing time before the training",
          q2Rating: 5,
          semAvg: 5,
        },
      ],
      avePerSI: 5.0,
    },
    {
      id: 22,
      part: "A",
      name: "Review and Endorse Disbursement Vouchers (DV) and Obligation Status Request (ORS) for Approved L&D Programs",
      successIndicator:
        "80-89% of L&D activities require payments reviewed DV and ORS processed and endorsed, return once for revision/correction, 2 working days after the conduct of the program.",
      ratings: [
        {
          dim: "Qn",
          commitment: "80-89%",
          q1Actual:
            "N/A — Non-submission of required documents for DV/ORS",
          q1Rating: null,
          q2Actual:
            "100% of L&D programs with financial transactions have DVs/ORS prepared and endorsed.",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "2 working days after the conduct of the program",
          q1Actual:
            "N/A — Non-submission of required documents for DV/ORS",
          q1Rating: null,
          q2Actual:
            "Average of 13 working days after the conduct of the program",
          q2Rating: 1,
          semAvg: 1,
        },
      ],
      avePerSI: 3.0,
    },
    {
      id: 23,
      part: "A",
      name: "Prepare and Endorse Certificate of Recognition / Attendance / Completion",
      successIndicator:
        "80-89% certificates of completion per training program reviewed endorsed for approval 10 working days after the event; 5–10% certificates with minor errors but corrected before final issuance; no major complaints.",
      ratings: [
        {
          dim: "Ql",
          commitment:
            "5–10% certificates with minor errors but corrected before final issuance; no major complaints",
          q1Actual: "Zero (0) Complaints received",
          q1Rating: 5,
          q2Actual: "Zero (0) Complaints received",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "Qn",
          commitment: "80-89% certificates of completion per training program",
          q1Actual:
            "100% (102/102) certificates of completion reviewed and endorsed",
          q1Rating: 5,
          q2Actual:
            "100% (314/314) certificates of completion reviewed and endorsed",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "10 working days after the event",
          q1Actual:
            "N/A — DPCR was revised in July and target matrix for the timeline will be implemented for 2nd Sem",
          q1Rating: null,
          q2Actual:
            "N/A — DPCR was revised in July and target matrix for the timeline will be implemented for 2nd Sem",
          q2Rating: null,
          semAvg: null,
        },
      ],
      avePerSI: 5.0,
    },
    {
      id: 24,
      part: "A",
      name: "Conduct the Civil Service Examination In-House Review Program",
      successIndicator:
        "60% of pre-registered employees accommodated in the civil service examination in-house review program conducted on scheduled with satisfactory feedback.",
      ratings: [
        { dim: "Ql", commitment: "N/A", q1Actual: "N/A", q1Rating: null, q2Actual: "N/A", q2Rating: null, semAvg: null },
        { dim: "Qn", commitment: "N/A", q1Actual: "N/A", q1Rating: null, q2Actual: "N/A", q2Rating: null, semAvg: null },
        { dim: "T", commitment: "N/A", q1Actual: "N/A", q1Rating: null, q2Actual: "N/A", q2Rating: null, semAvg: null },
      ],
      avePerSI: null,
    },
    {
      id: 25,
      part: "A",
      name: "Conduct of Periodic Review of the DOTr Competency Framework",
      successIndicator:
        "80% to 89% of the O/S/Ds participated in the periodic review of the DOTr Competency Framework submitted by the end of June.",
      ratings: [
        { dim: "Qn", commitment: "N/A", q1Actual: "N/A", q1Rating: null, q2Actual: "N/A", q2Rating: null, semAvg: null },
        { dim: "T", commitment: "N/A", q1Actual: "N/A", q1Rating: null, q2Actual: "N/A", q2Rating: null, semAvg: null },
      ],
      avePerSI: null,
    },
    {
      id: 26,
      part: "A",
      name: "Conduct of Organization-Wide Competency Assessment",
      successIndicator:
        "90-94% of all plantilla personnel completed the competency assessment conducted as scheduled per quarter.",
      ratings: [
        { dim: "Qn", commitment: "N/A", q1Actual: "N/A", q1Rating: null, q2Actual: "N/A", q2Rating: null, semAvg: null },
        { dim: "T", commitment: "N/A", q1Actual: "N/A", q1Rating: null, q2Actual: "N/A", q2Rating: null, semAvg: null },
      ],
      avePerSI: null,
    },
    {
      id: 27,
      part: "A",
      name: "Facilitate the Department's Monthly Flag Raising Ceremony",
      successIndicator:
        "80% of the monthly Flag Raising Ceremony organized and facilitated on the prescribed schedule.",
      ratings: [
        {
          dim: "Qn",
          commitment: "80% organized and facilitated",
          q1Actual: "100% organized and facilitated",
          q1Rating: 5,
          q2Actual: "100% organized and facilitated",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "On the prescribed schedule",
          q1Actual: "On the prescribed schedule",
          q1Rating: 5,
          q2Actual: "On the prescribed schedule",
          q2Rating: 5,
          semAvg: 5,
        },
      ],
      avePerSI: 5.0,
    },
    {
      id: 28,
      part: "A",
      name: "Review and Approve/Endorse HRDD Projects, Activities, Programs (PAPs) & Other Initiatives",
      successIndicator:
        "80% of HRDD Projects, Activities, and/or Programs (PAPs) reviewed and approved/endorsed to immediate supervisor on the set deadlines.",
      ratings: [
        {
          dim: "Qn",
          commitment: "80% implementation rate",
          q1Actual: "N/A",
          q1Rating: null,
          q2Actual: "100% organized the Independence Day participation",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment: "On the set deadlines",
          q1Actual: "N/A",
          q1Rating: null,
          q2Actual: "More than five working days before the set deadlines.",
          q2Rating: 5,
          semAvg: 5,
        },
      ],
      avePerSI: 5.0,
    },
    {
      id: 29,
      part: "B",
      name: "Inter & Intra-Agency Coordination — Membership to Committees, TWGs, Task Force Groups",
      successIndicator:
        "100% participation and conduct of inter and intra-agency committee meetings as directed and scheduled vis-à-vis ensuring that discussions held during meetings are relayed and reported within three (3) working days upon return.",
      ratings: [
        { dim: "Qn", commitment: "N/A", q1Actual: "N/A", q1Rating: null, q2Actual: "N/A", q2Rating: null, semAvg: null },
        { dim: "T", commitment: "N/A", q1Actual: "N/A", q1Rating: null, q2Actual: "N/A", q2Rating: null, semAvg: null },
      ],
      avePerSI: null,
    },
    {
      id: 30,
      part: "B",
      name: "Submit Internal Reportorial Requirements to Concerned Offices/Services/Divisions",
      successIndicator:
        "100% submission of internal reportorial requirements to the respective O/S/Ds on the specified deadline.",
      ratings: [
        {
          dim: "Qn",
          commitment: "100% compliance rate",
          q1Actual: "100% compliance rate",
          q1Rating: 5,
          q2Actual: "100% compliance rate",
          q2Rating: 5,
          semAvg: 5,
        },
        {
          dim: "T",
          commitment:
            "Complied on the specified deadline set by the respective O/S/Ds",
          q1Actual:
            "Complied on the specified deadline set by the respective O/S/Ds",
          q1Rating: 5,
          q2Actual:
            "Complied on the specified deadline set by the respective O/S/Ds",
          q2Rating: 5,
          semAvg: 5,
        },
      ],
      avePerSI: 5.0,
    },
    {
      id: 31,
      part: "B",
      name: "Participate to Learning and Development (L&D) Intervention",
      successIndicator:
        "100% participation of the HRDD personnel in at least one (1) Learning and Development Intervention per employee within the year of the rating period.",
      ratings: [
        {
          dim: "Qn",
          commitment:
            "50% of HRDD personnel participated in at least one (1) study or non-study program whether in-house or out-of-house.",
          q1Actual: "N/A",
          q1Rating: null,
          q2Actual:
            "50% (7/14) of HRDD personnel participated in at least one (1) study or non-study program whether in-house or out-of-house.",
          q2Rating: 3,
          semAvg: 3,
        },
      ],
      avePerSI: 3.0,
    },
  ],
};

export default data;
