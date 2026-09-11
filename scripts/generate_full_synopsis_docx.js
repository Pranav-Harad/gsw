import fs from 'fs';
import path from 'path';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  AlignmentType, 
  HeadingLevel, 
  BorderStyle,
  ShadingType
} from 'docx';

const borderSubtle = {
  top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
};

function createHeaderCell(text, widthPercent, bg = "1E3A8A") {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { fill: bg, type: ShadingType.CLEAR },
    margins: { top: 120, bottom: 120, left: 140, right: 140 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 20, font: "Arial" })]
      })
    ]
  });
}

function createBodyCell(text, widthPercent, isCenter = false, isBold = false) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    borders: borderSubtle,
    children: [
      new Paragraph({
        alignment: isCenter ? AlignmentType.CENTER : AlignmentType.LEFT,
        children: [new TextRun({ text, bold: isBold, size: 18, font: "Arial", color: "111827" })]
      })
    ]
  });
}

function createSectionHeading(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 120 },
    children: [
      new TextRun({ text: title, bold: true, size: 24, font: "Arial", color: "1E3A8A" })
    ]
  });
}

function createSubHeading(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({ text: title, bold: true, size: 20, font: "Arial", color: "047857" })
    ]
  });
}

function createBodyParagraph(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({ text, size: 18, font: "Arial", color: "374151" })
    ]
  });
}

function createBulletItem(boldPrefix, text) {
  return new Paragraph({
    spacing: { after: 80 },
    bullet: { level: 0 },
    children: [
      new TextRun({ text: boldPrefix + " ", bold: true, size: 18, font: "Arial", color: "111827" }),
      new TextRun({ text: text, size: 18, font: "Arial", color: "374151" })
    ]
  });
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1000, bottom: 1000, left: 1200, right: 1200 }
        }
      },
      children: [
        // Institutional Header
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [new TextRun({ text: "Pimpri Chinchwad Education Trust's", size: 18, font: "Arial", color: "4B5563" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [new TextRun({ text: "PIMPRI CHINCHWAD COLLEGE OF ENGINEERING (PCCOE)", bold: true, size: 24, font: "Arial", color: "1E3A8A" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [new TextRun({ text: "(An Autonomous Institute | Affiliated to Savitribai Phule Pune University)", italics: true, size: 17, font: "Arial", color: "4B5563" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "MDM - DIGITAL MARKETING & IT CAPSTONE PROJECT SYNOPSIS [BCE27MD06]", bold: true, size: 20, font: "Arial", color: "047857" })]
        }),

        // Metadata Table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createBodyCell("Department: Information Technology / Computer Engineering (Regional Language)", 60, false, true),
                createBodyCell("Academic Year: 2026 - 2027", 40, false, true),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("Year & Semester: B. Tech | Semester I", 60, false, false),
                createBodyCell("Group ID: Group 16", 40, false, true),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("Project Guide: Dr. Vinayak Malavade", 60, false, true),
                createBodyCell("Date: September 2026", 40, false, false),
              ]
            })
          ]
        }),

        new Paragraph({ text: "", spacing: { after: 150 } }),

        // Team Table
        createSubHeading("Team Members:"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell("PRN No.", 18),
                createHeaderCell("Name of Student", 25),
                createHeaderCell("Department", 22),
                createHeaderCell("Official Email", 25),
                createHeaderCell("Contact No.", 10),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("123B1F028", 18, true),
                createBodyCell("Pranav Harad", 25, false, true),
                createBodyCell("Information Technology", 22),
                createBodyCell("pranav.harad23@pccoepune.org", 25),
                createBodyCell("7499713778", 10, true),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("123B1F032", 18, true),
                createBodyCell("Avishkar Jadhav", 25, false, true),
                createBodyCell("Information Technology", 22),
                createBodyCell("avishkar.jadhav23@pccoepune.org", 25),
                createBodyCell("9309452502", 10, true),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("123B1F033", 18, true),
                createBodyCell("Jay Jadhav", 25, false, true),
                createBodyCell("Information Technology", 22),
                createBodyCell("jay.jadhav23@pccoepune.org", 25),
                createBodyCell("9322231537", 10, true),
              ]
            })
          ]
        }),

        new Paragraph({ text: "", spacing: { after: 200 } }),

        // Title & Problem Statement
        createSubHeading("Project Title:"),
        createBodyParagraph("A Dual-Layer Digital Marketing Strategy and AI-Driven Social Media Intelligence Platform ('GSW Marketing Copilot') for Gurumauli Steel Works (Lonar, Buldhana)"),

        createSubHeading("Problem Statement:"),
        createBodyParagraph("Design and implementation of an integrated omnichannel digital marketing campaign (Instagram, Facebook, LinkedIn, YouTube, and WhatsApp) backed by a custom Full-Stack AI-Powered Marketing Automation Platform for Gurumauli Steel Works (GSW). This system eliminates the regional language barrier through automated Marathi/Hindi AI copywriting, handles scheduled social distribution via background cron schedulers, and accelerates qualifiable farmer lead conversions through integrated WhatsApp CRM workflows at zero operating cost."),

        // SDG Goals Table
        createSubHeading("SDG Goals Aligned with the Project:"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell("SDG No.", 15),
                createHeaderCell("Goal Title", 30),
                createHeaderCell("Alignment & Project Contribution", 55),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("SDG 2", 15, true, true),
                createBodyCell("Zero Hunger", 30, false, true),
                createBodyCell("Accelerates rural adoption of modern reversible ploughs, improving soil aeration, moisture retention, and crop productivity in black cotton soils.", 55),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("SDG 8", 15, true, true),
                createBodyCell("Decent Work & Economic Growth", 30, false, true),
                createBodyCell("Strengthens a rural manufacturing MSME, expanding its dealership footprint across Maharashtra, MP, and Gujarat while supporting local engineering jobs.", 55),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("SDG 9", 15, true, true),
                createBodyCell("Industry, Innovation & Infrastructure", 30, false, true),
                createBodyCell("Democratizes enterprise-grade AI LLMs (Google Gemini), cloud auto-scheduling, and digital CRM workflows for small-scale rural manufacturers at zero expense.", 55),
              ]
            })
          ]
        }),

        createSectionHeading("1. Executive Summary & Business Background"),
        createBodyParagraph("Gurumauli Steel Works (GSW) is an ISO 9001:2015 certified manufacturing enterprise based in Lonar, District Buldhana, Maharashtra (PIN: 443302), specializing in the engineering and fabrication of heavy-duty agricultural equipment, predominantly Reversible Ploughs compatible with 20 to 55 HP tractors. The company currently caters to over 25,000+ satisfied farmers across Maharashtra, Madhya Pradesh, and Gujarat through a network of 120+ localized dealers."),
        createBodyParagraph("While GSW has built an outstanding reputation for manufacturing durability, its marketing operations have remained traditional and dealer-dependent. Over 1.2 Crore farmers in Western and Central India now actively use smartphones, YouTube, and WhatsApp to evaluate tractor implements before purchase. This project bridges IT software engineering and applied digital marketing by building a custom Full-Stack Web Application & AI Marketing Copilot that autonomously generates regional content in Marathi, Hindi, and English, manages automated social scheduling via background cron jobs, and captures buyer inquiries directly into an automated WhatsApp quotation workflow."),

        createSectionHeading("2. GSW Machinery Portfolio & Technical Specifications"),
        createBodyParagraph("The platform and marketing campaigns are customized for GSW's 5 real, proprietary agricultural implements:"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell("#", 8),
                createHeaderCell("GSW Implement Name", 35),
                createHeaderCell("Tractor HP", 17),
                createHeaderCell("Engineering & Agronomic Application", 40),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("1", 8, true),
                createBodyCell("GSW Hi Tech Reversible Plough", 35, false, true),
                createBodyCell("35 - 55 HP", 17, true),
                createBodyCell("Boron steel share points for 12-14 in. deep summer tillage; up to 20% diesel savings.", 40),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("2", 8, true),
                createBodyCell("Two Bottom GSW Hydraulic Reversible Plough", 35, false, true),
                createBodyCell("40 - 50 HP", 17, true),
                createBodyCell("Twin hydraulic turnover cylinders; zero-jerk inversion in heavy black cotton soils.", 40),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("3", 8, true),
                createBodyCell("GSW Hi Tech Auto Reversible Plough", 35, false, true),
                createBodyCell("35 - 45 HP", 17, true),
                createBodyCell("Mechanical spring trip latch; economical for small tractor owners without hydraulic kits.", 40),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("4", 8, true),
                createBodyCell("GSW Hi Tech Highlighted Reversible Plough", 35, false, true),
                createBodyCell("45 - 55 HP", 17, true),
                createBodyCell("Highlighted reinforced chassis for extreme stony/rocky soils and contract farming.", 40),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("5", 8, true),
                createBodyCell("GSW Hi Tech Kubota Special Plough", 35, false, true),
                createBodyCell("20 - 35 HP", 17, true),
                createBodyCell("Ultra-compact 3-point geometry for 4WD mini tractors in pomegranate/grape orchards.", 40),
              ]
            })
          ]
        }),

        createSectionHeading("3. Literature Review & Gap Identification"),
        createBodyParagraph("Academic literature confirms that rural digital marketing adoption in India is heavily driven by video demonstration content and direct messaging channels:"),
        createBulletItem("Sharma & Singh (IEEE Access, 2023):", "Proved that Generative AI models reduce small business marketing overhead by 65%, but flagged a gap in rural Indian language contexts."),
        createBulletItem("Deshmukh & Patil (IJAM, 2022):", "Established that Indian farmers show 3.8x higher purchase intent when reached via regional video demonstrations (YouTube/Reels) and WhatsApp."),
        createBulletItem("Joshi et al. (Springer ICON, 2023):", "Validated that modern LLMs (Google Gemini) achieve high linguistic accuracy for Marathi and Hindi technical copy."),
        createBulletItem("Kumar & Verma (ACM Computing Surveys, 2024):", "Explored webhook messaging pipelines connecting social ads directly to instant messaging channels."),

        createSectionHeading("4. Strategic Dual-Layer Execution Framework"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell("Layer 1: Digital Marketing Funnel (Strategy)", 50),
                createHeaderCell("Layer 2: GSW Marketing Copilot (IT Platform)", 50),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("• Stage 1 (TOFU: Awareness): High-energy Instagram Reels & YouTube Shorts showing 14-inch deep soil turning in black cotton soil; Bail Pola greetings.\n• Stage 2 (MOFU: Interest): Educational posts on Boron steel wear resistance & Tractor HP matching (35-50 HP).\n• Stage 3 (BOFU: Consideration): MahaDBT 50% government subsidy bill guidance and farmer video reviews.\n• Stage 4 (Action: Conversion): 1-Click WhatsApp direct quotation links and localized Buldhana dealer locator.", 50),
                createBodyCell("• AI Content Studio: Powered by Google Gemini 1.5 Flash for sub-second Marathi/Hindi ad copy & reel scripts.\n• Automated Scheduler: node-cron background daemon running every 60s to dispatch scheduled posts to webhooks.\n• SQLite Leads CRM: Classifies farmer leads by tractor HP, district, and generates pre-filled WhatsApp quotes.\n• Social Insights Hub: Interactive charts tracking reach, engagement, and NLP feedback sentiment.", 50),
              ]
            })
          ]
        }),

        createSectionHeading("5. Full-Stack IT Platform Architecture"),
        createBulletItem("Frontend Presentation Layer:", "Built with React 19, Vite, and Tailwind CSS v4. Features live mobile mockups for Instagram, Facebook, and WhatsApp broadcasts with Recharts visual analytics."),
        createBulletItem("Backend Application Layer:", "Node.js and Express.js REST server managing endpoints (`/api/ai/generate`, `/api/posts`, `/api/posts/:id/publish-now`, `/api/leads`, `/api/settings`)."),
        createBulletItem("Persistence Layer:", "Embedded SQLite 3 database (`gsw_marketing.db`) storing scheduled campaigns, qualified farmer leads, and system configuration."),
        createBulletItem("Artificial Intelligence Layer:", "Google Gemini 1.5 Flash API integrating custom regional prompts in Marathi, Hindi, and English with agricultural domain expertise."),
        createBulletItem("Automation Engine:", "Background `node-cron` daemon continuously scanning SQLite every 60 seconds to auto-publish due posts to social webhooks without manual intervention."),

        createSectionHeading("6. 4-Week Project Implementation Timeline"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell("Sprint", 15),
                createHeaderCell("Key Tasks & Activities", 50),
                createHeaderCell("Deliverables & Status", 35),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("Week 1", 15, true, true),
                createBodyCell("GSW machinery catalog modeling; photography of 5 real ploughs; SQLite schema design & Express REST server setup.", 50),
                createBodyCell("✅ Completed: Database schema, backend server, and asset repository.", 35),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("Week 2", 15, true, true),
                createBodyCell("Google Gemini 1.5 Flash live API integration; Marathi/Hindi prompt engineering; live mobile post mockups.", 50),
                createBodyCell("✅ Completed: AI Content Studio with video reel script generator.", 35),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("Week 3", 15, true, true),
                createBodyCell("node-cron background publisher worker; WhatsApp direct quote generator; SQLite Leads CRM pipeline.", 50),
                createBodyCell("✅ Completed: Content Calendar, automated publishing & CRM.", 35),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("Week 4", 15, true, true),
                createBodyCell("Social insights analytics charts; standalone ad landing page builder; system integration testing & final viva prep.", 50),
                createBodyCell("🔄 In Progress: Analytics Hub, Landing Page Hub & Project Report.", 35),
              ]
            })
          ]
        }),

        createSectionHeading("7. Expected Business Outcomes & Target KPIs"),
        createBulletItem("Digital Reach:", "> 80,000+ targeted impressions across Maharashtra, MP, and Gujarat within the campaign lifecycle."),
        createBulletItem("Content Creation Efficiency:", "Reduction in creative drafting time from 3–4 hours per post to < 5 seconds via Gemini AI."),
        createBulletItem("Lead Velocity:", "Reduction in quotation dispatch time from > 24 hours to under 60 seconds via 1-click WhatsApp direct links."),
        createBulletItem("Dealership Inquiries:", "10+ new B2B regional dealership applications captured via LinkedIn and landing pages."),

        createSectionHeading("8. Academic References (IEEE Format)"),
        createBodyParagraph("1. P. Sharma and R. K. Singh, 'Automating Social Media Content Generation and Scheduling for Small Enterprises using Transformer Models,' IEEE Access, vol. 11, pp. 45210–45222, 2023.\n" +
          "2. A. Deshmukh and S. Patil, 'Digital Marketing Channels and Farmer Purchase Intentions in Agricultural Implements: A Case Study of Maharashtra,' Int. Journal of Agricultural Management and Development, vol. 12, no. 3, pp. 215–228, 2022.\n" +
          "3. M. Joshi, N. Kulkarni, and V. Date, 'Evaluation of Generative AI Large Language Models on Low-Resource Indic Vernaculars (Marathi & Hindi),' in Proc. of Springer ICON, 2023, pp. 112–126.\n" +
          "4. V. Kumar and A. Verma, 'Social Customer Relationship Management (CRM) through Automated Messaging Webhooks: Architecture and Performance,' ACM Computing Surveys, vol. 56, no. 4, pp. 1–28, 2024.\n" +
          "5. Meta Platforms Inc., 'Graph API Reference: Page Insights and Media Publishing Protocols,' Meta for Developers Documentation, 2024.\n" +
          "6. 'Digital Marketing in Agricultural Sector,' Community-service study on digital marketing adoption among MSME actors in agriculture, Academia.edu, 2022.\n" +
          "7. 'Adoption of Digital Marketing in Agribusiness: A Conceptual Study,' Journal of Academy of Business and Economics, 2023.\n" +
          "8. 'Digital Marketing Practices Adopted by Agricultural Service Companies in India,' IJRP, 3(9), 1338-1343, 2022.\n" +
          "9. 'Digital Transformation in Agricultural Marketing: Advancing India's Agri-Trade Ecosystem,' IBMRD's Journal of Management & Research, 2025.\n" +
          "10. 'Social Media Marketing's Emerging Role in Agricultural Development and Rural Economic Transformation,' Journal of Marketing Analytics, Springer Nature, 2026."),

        createSectionHeading("9. Guide Review & Formal Sign-Off"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  borders: borderSubtle,
                  margins: { top: 140, bottom: 140, left: 160, right: 160 },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Review Remarks by Project Guide:\n\n\n\n", size: 18, font: "Arial", color: "6B7280" }),
                        new TextRun({ text: "Recommendation: [ Approved / Approved with Minor Modifications / Needs Resubmission ]\n\n", bold: true, size: 18, font: "Arial", color: "111827" }),
                        new TextRun({ text: "Project Guide Name: Dr. Vinayak Malavade\n", bold: true, size: 18, font: "Arial" }),
                        new TextRun({ text: "Designation: Associate Professor, Department of Information Technology\n", size: 18, font: "Arial" }),
                        new TextRun({ text: "Institution: Pimpri Chinchwad College of Engineering (PCCOE), Pune\n\n", size: 18, font: "Arial" }),
                        new TextRun({ text: "Signature: ___________________________               Date: ________________________", bold: true, size: 18, font: "Arial" })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    }
  ]
});

Packer.toBuffer(doc).then((buffer) => {
  const outputPath = path.resolve('c:/Users/Asus/Projects/gsw/GSW_Capstone_Project_Synopsis.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('Complete Comprehensive Microsoft Word (.docx) generated at:', outputPath);
});
