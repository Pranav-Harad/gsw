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

const borderNone = {
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
};

const borderSubtle = {
  top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
};

function createHeaderCell(text, widthPercent) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { fill: "1E3A8A", type: ShadingType.CLEAR },
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
        children: [new TextRun({ text, bold: isBold, size: 19, font: "Arial", color: "111827" })]
      })
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
        // Title Header Box
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
          children: [
            new TextRun({ text: "Pimpri Chinchwad Education Trust's", size: 20, font: "Arial", color: "4B5563" })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
          children: [
            new TextRun({ text: "PIMPRI CHINCHWAD COLLEGE OF ENGINEERING (PCCOE)", bold: true, size: 24, font: "Arial", color: "1E3A8A" })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
          children: [
            new TextRun({ text: "(An Autonomous Institute | Affiliated to Savitribai Phule Pune University)", italics: true, size: 18, font: "Arial", color: "4B5563" })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: "MDM - DIGITAL MARKETING & IT CAPSTONE PROJECT SYNOPSIS [BCE27MD06]", bold: true, size: 20, font: "Arial", color: "047857" })
          ]
        }),

        // Department & Meta Info Table
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

        new Paragraph({ text: "", spacing: { after: 200 } }),

        // Team Table
        new Paragraph({
          children: [new TextRun({ text: "Team Members Details:", bold: true, size: 22, font: "Arial", color: "1E3A8A" })],
          spacing: { after: 120 }
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell("PRN No.", 20),
                createHeaderCell("Name of Student", 25),
                createHeaderCell("Department", 20),
                createHeaderCell("Official Email", 25),
                createHeaderCell("Contact No.", 10),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("123B1F028", 20, true),
                createBodyCell("Pranav Harad", 25, false, true),
                createBodyCell("Information Technology", 20),
                createBodyCell("pranav.harad23@pccoepune.org", 25),
                createBodyCell("7499713778", 10, true),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("123B1F032", 20, true),
                createBodyCell("Avishkar Jadhav", 25, false, true),
                createBodyCell("Information Technology", 20),
                createBodyCell("avishkar.jadhav23@pccoepune.org", 25),
                createBodyCell("9309452502", 10, true),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("123B1F033", 20, true),
                createBodyCell("Jay Jadhav", 25, false, true),
                createBodyCell("Information Technology", 20),
                createBodyCell("jay.jadhav23@pccoepune.org", 25),
                createBodyCell("9322231537", 10, true),
              ]
            })
          ]
        }),

        new Paragraph({ text: "", spacing: { after: 250 } }),

        // Problem Statement
        new Paragraph({
          children: [new TextRun({ text: "Project Title:", bold: true, size: 22, font: "Arial", color: "1E3A8A" })],
          spacing: { after: 80 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "A Dual-Layer Digital Marketing Strategy and AI-Driven Social Media Intelligence Platform ('GSW Marketing Copilot') for Gurumauli Steel Works (Lonar, Buldhana)",
              bold: true,
              size: 20,
              font: "Arial",
              color: "111827"
            })
          ],
          spacing: { after: 180 }
        }),

        new Paragraph({
          children: [new TextRun({ text: "Problem Statement:", bold: true, size: 22, font: "Arial", color: "1E3A8A" })],
          spacing: { after: 80 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Design and execution of an omnichannel digital marketing campaign (across Instagram, Facebook, LinkedIn, YouTube, and WhatsApp) backed by a custom Full-Stack AI-Powered Marketing Automation Platform for Gurumauli Steel Works (GSW). This system eliminates the regional language barrier through automated Marathi/Hindi AI copywriting, handles scheduled social distribution via background cron schedulers, and accelerates qualifiable farmer lead conversions through integrated WhatsApp CRM workflows at zero operating cost.",
              size: 19,
              font: "Arial",
              color: "374151"
            })
          ],
          spacing: { after: 200 }
        }),

        // SDG Alignment Table
        new Paragraph({
          children: [new TextRun({ text: "Sustainable Development Goals (SDG) Alignment:", bold: true, size: 22, font: "Arial", color: "1E3A8A" })],
          spacing: { after: 120 }
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell("SDG Goal", 20),
                createHeaderCell("Goal Title", 30),
                createHeaderCell("Project Impact & Contribution", 50),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("SDG 2", 20, true, true),
                createBodyCell("Zero Hunger", 30, false, true),
                createBodyCell("Accelerates rural adoption of modern reversible ploughs, enhancing soil aeration, moisture retention, and crop productivity in black cotton soils.", 50),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("SDG 8", 20, true, true),
                createBodyCell("Decent Work & Economic Growth", 30, false, true),
                createBodyCell("Strengthens a rural manufacturing MSME, expanding its dealership footprint across Maharashtra, MP, and Gujarat while supporting local engineering jobs.", 50),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("SDG 9", 20, true, true),
                createBodyCell("Industry, Innovation & Infrastructure", 30, false, true),
                createBodyCell("Democratizes enterprise-grade AI LLMs (Google Gemini), cloud auto-scheduling, and digital CRM workflows for small-scale rural manufacturers at zero expense.", 50),
              ]
            })
          ]
        }),

        new Paragraph({ text: "", spacing: { after: 300 } }),

        // Section 1: Business Background & GSW Products
        new Paragraph({
          children: [new TextRun({ text: "1. Business Background & GSW Product Portfolio", bold: true, size: 24, font: "Arial", color: "1E3A8A" })],
          spacing: { after: 120 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Gurumauli Steel Works (GSW) is an ISO 9001:2015 certified manufacturer of agricultural implements located in Lonar, Buldhana District, Maharashtra (PIN: 443302). GSW specializes in high-durability Reversible Ploughs compatible with 20 to 55 HP tractors. The 5 proprietary models engineered by GSW include:",
              size: 19,
              font: "Arial"
            })
          ],
          spacing: { after: 140 }
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell("#", 8),
                createHeaderCell("GSW Implement Name", 35),
                createHeaderCell("Tractor HP", 17),
                createHeaderCell("Key Engineering Feature", 40),
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

        new Paragraph({ text: "", spacing: { after: 300 } }),

        // Section 2: Dual Layer Architecture & Marketing Funnel
        new Paragraph({
          children: [new TextRun({ text: "2. Strategic Dual-Layer Execution Framework", bold: true, size: 24, font: "Arial", color: "1E3A8A" })],
          spacing: { after: 120 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "The project bridges applied digital marketing and IT engineering through two synchronized layers:",
              size: 19,
              font: "Arial"
            })
          ],
          spacing: { after: 140 }
        }),

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
                createBodyCell("• Stage 1 (TOFU): High-energy Instagram Reels & YouTube Shorts showing 14-inch deep soil turning in black cotton soil.\n• Stage 2 (MOFU): Educational carousel posts on Boron steel wear resistance & Tractor HP matching (35-50 HP).\n• Stage 3 (BOFU): MahaDBT 50% government subsidy bill guidance and farmer video reviews.\n• Stage 4 (Action): Instant WhatsApp quote links and localized Buldhana/Vidarbha dealer locator.", 50),
                createBodyCell("• AI Content Studio: Powered by Google Gemini 1.5 Flash for sub-second Marathi/Hindi ad copy & reel scripts.\n• Automated Scheduler: node-cron background daemon running every 60s to dispatch scheduled posts to webhooks.\n• SQLite Leads CRM: Classifies farmer leads by tractor HP, district, and generates pre-filled WhatsApp quotes.\n• Social Insights Hub: Interactive charts tracking reach, engagement, and NLP feedback sentiment.", 50),
              ]
            })
          ]
        }),

        new Paragraph({ text: "", spacing: { after: 300 } }),

        // Section 3: Technical Specifications
        new Paragraph({
          children: [new TextRun({ text: "3. Full-Stack Software Engineering Specifications", bold: true, size: 24, font: "Arial", color: "1E3A8A" })],
          spacing: { after: 120 }
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell("Component", 25),
                createHeaderCell("Technology Stack", 30),
                createHeaderCell("Engineering Role", 45),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("Frontend Dashboard", 25, false, true),
                createBodyCell("React 19 + Vite + Tailwind CSS v4", 30),
                createBodyCell("Responsive client interface with live Instagram/WhatsApp mobile mockups and Recharts visual analytics.", 45),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("Backend REST API", 25, false, true),
                createBodyCell("Node.js + Express.js", 30),
                createBodyCell("Handles REST endpoints (/api/ai, /api/posts, /api/leads) and executes automated webhook broadcasts.", 45),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("Database Store", 25, false, true),
                createBodyCell("SQLite 3 (Embedded DB)", 30),
                createBodyCell("Persistent relational store for scheduled posts, qualified farmer leads, and system configuration.", 45),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("Generative AI Engine", 25, false, true),
                createBodyCell("Google Gemini 1.5 Flash API", 30),
                createBodyCell("Regional Indic prompt engineering (Marathi/Hindi/English) with agricultural domain context.", 45),
              ]
            }),
            new TableRow({
              children: [
                createBodyCell("Background Scheduler", 25, false, true),
                createBodyCell("node-cron Worker Engine", 30),
                createBodyCell("Active daemon checking SQLite every 60s for due posts and publishing to Meta/Webhooks automatically.", 45),
              ]
            })
          ]
        }),

        new Paragraph({ text: "", spacing: { after: 300 } }),

        // Section 4: 4-Week Sprint Plan
        new Paragraph({
          children: [new TextRun({ text: "4. Project Implementation Timeline & Milestones", bold: true, size: 24, font: "Arial", color: "1E3A8A" })],
          spacing: { after: 120 }
        }),
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

        new Paragraph({ text: "", spacing: { after: 300 } }),

        // Section 5: References
        new Paragraph({
          children: [new TextRun({ text: "5. Academic References (IEEE Format)", bold: true, size: 24, font: "Arial", color: "1E3A8A" })],
          spacing: { after: 120 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "1. P. Sharma and R. K. Singh, 'Automating Social Media Content Generation and Scheduling for Small Enterprises using Transformer Models,' IEEE Access, vol. 11, pp. 45210–45222, 2023.\n" +
                    "2. A. Deshmukh and S. Patil, 'Digital Marketing Channels and Farmer Purchase Intentions in Agricultural Implements: A Case Study of Maharashtra,' Int. Journal of Agricultural Management and Development, vol. 12, no. 3, pp. 215–228, 2022.\n" +
                    "3. M. Joshi, N. Kulkarni, and V. Date, 'Evaluation of Generative AI Large Language Models on Low-Resource Indic Vernaculars (Marathi & Hindi),' in Proc. of Springer ICON, 2023, pp. 112–126.\n" +
                    "4. V. Kumar and A. Verma, 'Social Customer Relationship Management (CRM) through Automated Messaging Webhooks: Architecture and Performance,' ACM Computing Surveys, vol. 56, no. 4, pp. 1–28, 2024.\n" +
                    "5. Meta Platforms Inc., 'Graph API Reference: Page Insights and Media Publishing Protocols,' Meta for Developers Documentation, 2024.\n" +
                    "6. 'Digital Marketing in Agricultural Sector,' Community-service study on digital marketing adoption among MSME actors in agriculture, Academia.edu, 2022.\n" +
                    "7. 'Adoption of Digital Marketing in Agribusiness: A Conceptual Study,' Journal of Academy of Business and Economics, 2023.\n" +
                    "8. 'Digital Marketing Practices Adopted by Agricultural Service Companies in India,' IJRP, 3(9), 1338-1343, 2022.\n" +
                    "9. 'Digital Transformation in Agricultural Marketing: Advancing India's Agri-Trade Ecosystem,' IBMRD's Journal of Management & Research, 2025.\n" +
                    "10. 'Social Media Marketing's Emerging Role in Agricultural Development and Rural Economic Transformation,' Journal of Marketing Analytics, Springer Nature, 2026.",
              size: 18,
              font: "Arial",
              color: "374151"
            })
          ],
          spacing: { after: 300 }
        }),

        // Guide Review & Sign-Off Section
        new Paragraph({
          children: [new TextRun({ text: "6. Guide Review & Formal Sign-Off", bold: true, size: 24, font: "Arial", color: "1E3A8A" })],
          spacing: { after: 120 }
        }),
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
  console.log('Official Microsoft Word (.docx) document generated successfully at:', outputPath);
});
