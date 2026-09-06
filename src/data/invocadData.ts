export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  bullets: string[];
  image: string;
  tools: string[];
}

export interface ProductItem {
  id: number;
  title: string;
  category: string;
  tagline: string;
  descriptionHtml: string;
  image: string;
  specs: { label: string; value: string }[];
  industries: string[];
  status: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  flexibilityNote: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const COMPANY_INFO = {
  name: "INVOCAD",
  legal: "Invocad Engineering Studio",
  tagline: "Precision Product Design & Engineering Studio",
  positioning: "Where bold ideas meet precision engineering. We craft seamless, production-ready solutions that perform flawlessly in the real world.",
  email: "contactinvocad@gmail.com",
  phone: "+91 7812883741",
  whatsappUrl: "https://wa.me/917812883741?text=Hello%20Invocad%20Team%2C%20I%20would%20like%20to%20discuss%20an%20engineering%20project.",
  hours: "Mon - Sat: 9:00 AM - 7:00 PM IST",
  turnaround: "Initial project scoping response within 24 hours",
  copyright: "© 2025 INVOCAD. All rights reserved.",
  supportedTools: [
    "SolidWorks",
    "Autodesk AutoCAD",
    "CATIA",
    "PTC Creo",
    "ANSYS CAE",
    "Sheet Metal DFM",
    "CAM Interface"
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "product-design",
    number: "01",
    title: "Product Design",
    category: "Concept & Ergonomics",
    shortDesc: "From early concepts to production-ready engineering with ergonomics, form, and functionality.",
    fullDesc: "Product design is the art of turning ideas into functional, user-focused creations that blend form and purpose. It shapes innovation through thoughtful aesthetics, smart engineering, and real-world impact.",
    bullets: [
      "Product design focuses on creativity, innovation, and practical utility.",
      "Ensures the product is functional, user-friendly, and structurally sound.",
      "Improves industrial appearance and elevates user experience.",
      "Integrates mechanical constraints early in the ideation phase."
    ],
    image: "/assets/serviceImageOne-BnS0ZQwf.png",
    tools: ["SolidWorks", "Concept Sketching", "Ergonomics Study", "Surface Modeling"]
  },
  {
    id: "manufacturing-design",
    number: "02",
    title: "Manufacturing Design (DFM/DFA)",
    category: "Fabrication & Assembly",
    shortDesc: "Optimizing geometry, wall thicknesses, tolerances, and assembly sequences for cost-effective production.",
    fullDesc: "Manufacturing design bridges concept and production, optimizing products for efficient, scalable, and cost-effective fabrication. It ensures every design detail aligns with real-world materials, machines, and manufacturing processes.",
    bullets: [
      "Focuses on efficient, repeatable, and scalable production methods.",
      "Aims to reduce manufacturing cost, tooling complexity, and material scrap.",
      "Ensures the product is easy to assemble (DFA) and service in the field.",
      "Adheres strictly to CNC machining, casting, injection molding, and sheet metal limits."
    ],
    image: "/assets/serviceImageTwo-D2jH97DN.png",
    tools: ["DFM Analysis", "DFA Matrix", "Machining Tolerances", "Cost Optimization"]
  },
  {
    id: "drafting",
    number: "03",
    title: "Drafting & 2D Technical Layouts",
    category: "Blueprints & GD&T",
    shortDesc: "ASME and ISO compliant 2D engineering drawings, fabrication blueprints, section layouts, and BOMs.",
    fullDesc: "CAD 2D Drawing delivers precise, detailed technical layouts essential for engineering, architecture, and manufacturing. It simplifies complex designs into accurate plans, sections, and elevations for flawless shop-floor fabrication.",
    bullets: [
      "Detailed manufacturing drawings with complete GD&T callouts and tolerances.",
      "Communicates design intent clearly to machinists, welders, and QC teams.",
      "Serves as the legally binding guide for manufacturing, QA, and inspection.",
      "Comprehensive Bill of Materials (BOM) with part numbering and hardware specs."
    ],
    image: "/assets/draftingImage-BaxF8jRZ.jpg",
    tools: ["AutoCAD", "SolidWorks Drawings", "GD&T (ASME Y14.5)", "BOM Generation"]
  },
  {
    id: "reverse-engineering",
    number: "04",
    title: "Reverse Engineering",
    category: "Scan-to-CAD & Reconstruction",
    shortDesc: "Reconstructing high-precision parametric 3D models from physical parts, scans, and legacy components.",
    fullDesc: "CAD Reverse Engineering transforms physical objects into precise digital models through advanced scanning and reconstruction. It enables redesign, analysis, or reproduction of legacy parts without original drawings.",
    bullets: [
      "Analyzes existing parts to capture exact geometry, fit, and mechanical function.",
      "Rebuilds parametric, editable feature trees rather than dead mesh blobs.",
      "Ideal for legacy machinery upgrades, obsolete component replacement, and product benchmarking.",
      "Material and wear analysis to improve upon the original component lifecycle."
    ],
    image: "/assets/reverseEngineering-CO2ft1xD.png",
    tools: ["3D Scan Data", "Surface Reconstruction", "Parametric Solid Modeling", "Deviation Inspection"]
  },
  {
    id: "2d-migration",
    number: "05",
    title: "2D to 3D CAD Migration",
    category: "Legacy Modernization",
    shortDesc: "Modernizing legacy blueprints and 2D drawing archives into intelligent 3D parametric CAD models.",
    fullDesc: "Migrating your legacy 2D CAD files to modern platforms can significantly improve your design accuracy, efficiency, and cross-team compatibility across modern engineering software suites.",
    bullets: [
      "Converts old manual drawings and static DWG/DXF files into intelligent 3D parametric models.",
      "Eliminates drawing ambiguities, interference errors, and revision confusion.",
      "Enables immediate FEA simulation, automated drawing generation, and CAM toolpathing.",
      "Standardizes legacy part libraries for modern PLM/PDM workflows."
    ],
    image: "/assets/2dMigration-C_jY1EV7.png",
    tools: ["DWG / DXF Ingestion", "Feature Tree Modeling", "Standardization", "Assembly Mating"]
  },
  {
    id: "mechanism",
    number: "06",
    title: "Mechanism & Kinematics",
    category: "Dynamics & Motion",
    shortDesc: "Simulating mechanical linkages, assembly movements, gear trains, and dynamic clearances.",
    fullDesc: "CAD Animation and kinematics turn design concepts into engaging, functional engineering studies that reveal how components interact under motion. It eliminates mechanical collision and validates mechanical leverage.",
    bullets: [
      "Analyzes linkage geometry to transmit motion and force with required mechanical advantage.",
      "Dynamic collision detection throughout the entire mechanical travel stroke.",
      "Generates technical assembly sequence visuals for shop floor guidance and training.",
      "Validates motor torque, gear ratios, and cycle speed requirements."
    ],
    image: "/assets/serviceImage-CoHIfGk1.png",
    tools: ["Motion Simulation", "Collision Verification", "Linkage Synthesis", "Assembly Sequencing"]
  },
  {
    id: "simulation",
    number: "07",
    title: "Simulation & CAE (FEA / Thermal)",
    category: "Finite Element Analysis",
    shortDesc: "Validating structural integrity, stress concentrations, heat dissipation, and fluid performance digitally.",
    fullDesc: "CAD Simulation brings virtual prototypes to life by testing real-world performance within a digital environment. It analyzes stress, motion, heat, and flow to optimize designs prior to expensive physical tooling.",
    bullets: [
      "Predicts structural behavior under static, dynamic, and impact load conditions.",
      "Identifies stress concentrations (Von Mises) and optimizes safety factor margins.",
      "Thermal analysis to ensure proper heat sink sizing and airflow dissipation.",
      "Saves massive prototype trial iterations by finding failure points before machining."
    ],
    image: "/assets/simulation-iMGdvlmw.png",
    tools: ["FEA Stress Analysis", "Thermal Simulation", "Deformation Mapping", "Factor of Safety"]
  },
  {
    id: "rendering",
    number: "08",
    title: "Photorealistic CAD Rendering",
    category: "Visualization & Marketing",
    shortDesc: "Transforming CAD geometry into stunning, photorealistic visuals with realistic lighting and materials.",
    fullDesc: "CAD Rendering converts technical 3D models into lifelike visuals with realistic lighting, textures, and materials. It helps visualize products and machinery before manufacturing or construction begins.",
    bullets: [
      "Physically accurate material textures: brushed aluminum, powder-coated steel, optics, and polymers.",
      "Studio lighting setups with ray-traced reflections and depth of field.",
      "Crucial for client presentations, investor pitching, marketing collateral, and design approval.",
      "Exploded view animations revealing internal mechanisms with crisp technical clarity."
    ],
    image: "/assets/rendering-DggMth2J.png",
    tools: ["Ray-traced Rendering", "Exploded CAD Views", "Material Mapping", "Studio Lighting"]
  },
  {
    id: "autocad-nesting",
    number: "09",
    title: "Laser Cutting & Sheet Metal Nesting",
    category: "Sheet Metal & CNC",
    shortDesc: "High-precision sheet metal unfolding, bend deduction, and automated CNC nesting for maximum yield.",
    fullDesc: "We specialize in high-precision laser cutting layout paired with advanced sheet metal nesting solutions to maximize raw material efficiency and minimize sheet scrap during production runs.",
    bullets: [
      "Arranges multi-part geometric layouts tightly onto standard industrial raw sheet sizes.",
      "Dramatically reduces material scrap rates and lowers per-part fabrication expenses.",
      "Calculates exact K-factor bend allowances for press brake accuracy.",
      "Exports clean DXF cut contours optimized for CNC laser, plasma, and waterjet machines."
    ],
    image: "/assets/autoCADNesting-D8cea7AI.jpg",
    tools: ["Sheet Metal Unfolding", "Laser Nesting", "K-Factor Calculation", "DXF Cutting Paths"]
  },
  {
    id: "concept-design",
    number: "10",
    title: "Concept Design & Ideation",
    category: "Form & Feasibility",
    shortDesc: "Translating abstract product requirements into tangible, innovative, and manufacturable 3D concepts.",
    fullDesc: "Concept design is the foundation of innovation, where abstract ideas take visual and mechanical form. It explores possibilities, defines directions, and sets the stage for the entire product design journey.",
    bullets: [
      "Translates raw ideas and napkin sketches into clear visual and mechanical directions.",
      "Explores multiple design variations before committing capital to tooling.",
      "Sets the standard for industrial styling, ergonomics, and brand identity.",
      "Delivers feasibility reports outlining potential manufacturing routes."
    ],
    image: "/assets/bannerImage-Cwp5u9Ba.jpg",
    tools: ["Conceptual Architecture", "Rapid Ideation", "Morphological Analysis", "Visual Proof of Concept"]
  }
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 1,
    title: "Color Sorting Output Conveyor",
    category: "Specialized Food & Spice Machinery",
    tagline: "Horizontal high-throughput material transfer system optimized for sensitive cardamom and bulk spices.",
    descriptionHtml: "A heavy-duty industrial conveyor system engineered for gentle, continuous horizontal material transfer. Specifically calibrated for handling sensitive agricultural commodities like cardamom, making it ideal for food processing plants requiring hygienic, reliable bulk movement.",
    image: "/assets/COLOR%20SORTING%20OUTPUT%20CONVEYOR-DnJizWwv.png",
    specs: [
      { label: "Drive Motor", value: "1.0 HP Industrial" },
      { label: "Gearbox Unit", value: "W63 Reduction" },
      { label: "Chassis Material", value: "Mild Steel / Powder Coated" },
      { label: "Standard Length", value: "1.0 Meter (Customizable)" },
      { label: "Belt Width", value: "2.0 Feet (610 mm)" },
      { label: "Target Application", value: "Cardamom & Bulk Spices" },
      { label: "Rated Capacity", value: "4.5 Metric Tons / Hour" }
    ],
    industries: ["Agricultural Processing", "Spice Processing", "Food & Beverage", "Bulk Packaging"],
    status: "Production Ready"
  },
  {
    id: 2,
    title: "Flat Belt Conveyor",
    category: "Material Transfer & Automation",
    tagline: "Ultra-smooth horizontal transfer conveyor designed for uniform distribution and inspection lines.",
    descriptionHtml: "Designed for horizontal transfer with continuous load stability. Features reinforced mild steel frame construction, vibration damping mounts, and a food-grade continuous belt assembly tailored for high-volume spice handling.",
    image: "/assets/FLAT%20BELT%20CONVEYOR-DcxF9jJL.png",
    specs: [
      { label: "Drive Motor", value: "1.0 HP High Torque" },
      { label: "Gearbox Unit", value: "W63 Precision Drive" },
      { label: "Structural Frame", value: "Mild Steel Structural Channel" },
      { label: "Effective Length", value: "1.0 Meter (Scalable)" },
      { label: "Effective Width", value: "2.0 Feet (610 mm)" },
      { label: "Handling Material", value: "Cardamom & Dry Granules" },
      { label: "Continuous Output", value: "4.5 Metric Tons / Hour" }
    ],
    industries: ["Food Packaging", "Spice Sorting", "Packaging Integration", "Warehousing"],
    status: "Production Ready"
  },
  {
    id: 3,
    title: "Modular Conveyor System",
    category: "Heavy-Duty Transfer",
    tagline: "Robust modular interlocking conveyor engineered for elevated transfer and high-load payloads.",
    descriptionHtml: "A modular interlocking conveyor system designed for efficient vertical elevation and horizontal transfer. The rigid structural design accommodates heavy continuous loads while allowing rapid module replacement and hygienic cleaning.",
    image: "/assets/MODULER%20CONVEYOR-CTllZ1Dz.png",
    specs: [
      { label: "Drive Motor", value: "1.0 HP Industrial Duty" },
      { label: "Gearbox Unit", value: "W63 Industrial" },
      { label: "Chassis Frame", value: "Mild Steel Welded Substructure" },
      { label: "Elevated Height", value: "10.0 Feet Structural Tower" },
      { label: "Conveyor Width", value: "1.5 Feet (450 mm)" },
      { label: "Rated Payload", value: "150 kg per linear foot" },
      { label: "Primary Use", value: "Cardamom, Grain & Packaged Cartons" }
    ],
    industries: ["Bulk Material Handling", "Elevated Intake Lines", "Packaging Plants", "Agriculture"],
    status: "Production Ready"
  },
  {
    id: 4,
    title: "Makhana Open Grader",
    category: "Precision Sizing Machinery",
    tagline: "Four-deck vibro-grading machine for high-precision size classification of fox nuts (makhana).",
    descriptionHtml: "Engineered for precise, size-based multi-stage separation of makhana (fox nuts). Utilizing dual synchronized vibro-motors and multi-layer perforated sorting decks, this machine ensures uniform quality grading with zero kernel breakage.",
    image: "/assets/MAKHANA%20OPEN%20GRADER-D8dcmUMh.png",
    specs: [
      { label: "Vibration Drive", value: "Dual Vibro Motor (1 HP × 2)" },
      { label: "Infeed Hopper", value: "20 kg Capacity with Gate Control" },
      { label: "Machine Dimensions", value: "8.0 ft Length × 3.0 ft Width" },
      { label: "Sorting Decks", value: "4 Separation Decks" },
      { label: "Construction", value: "Reinforced Mild Steel" },
      { label: "Processed Crop", value: "Fox Nuts (Makhana)" },
      { label: "Output Capacity", value: "300 kg / Hour Continuous" }
    ],
    industries: ["Makhana Processing", "Dry Fruit Packaging", "Seed Grading", "Agri-Business"],
    status: "Field Proven"
  },
  {
    id: 5,
    title: "Makhana Closed Grader",
    category: "Sanitary Enclosed Processing",
    tagline: "Fully enclosed sanitary grading system designed for dust containment and sterile processing.",
    descriptionHtml: "An advanced, fully enclosed version of the makhana grading system. Provides comprehensive dust containment and sanitary protection during high-volume grading operations, meeting stringent food facility health standards.",
    image: "/assets/MAKHANA%20CLOSED%20GRADER-BdwgJGpU.png",
    specs: [
      { label: "Vibration Drive", value: "Dual Vibro Motor (1 HP × 2)" },
      { label: "Enclosure Type", value: "Sanitary Dust-Tight Enclosure" },
      { label: "Overall Footprint", value: "8.0 ft Length × 3.0 ft Width" },
      { label: "Grading Tiers", value: "4-Tier Sizing Screen System" },
      { label: "Material Contact", value: "Food-Grade MS / SS Options" },
      { label: "Output Rating", value: "300 kg / Hour High Efficiency" },
      { label: "Customization", value: "Deck apertures customized to seed grade" }
    ],
    industries: ["Commercial Food Packaging", "Export-Grade Processing", "Cleanroom Agri-Plants"],
    status: "Field Proven"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover & Scope",
    tagline: "Requirement alignment & mechanical feasibility assessment.",
    description: "We begin by learning about your idea, problem, or product goal. Whether you are starting from a napkin sketch, updating a legacy design, or solving a manufacturing failure, we listen carefully and define precise engineering boundaries.",
    deliverables: [
      "Technical Requirement Document (TRD)",
      "Design Constraint Analysis",
      "Material & Fabrication Feasibility Review",
      "Project Roadmap & Deliverable Timetable"
    ],
    flexibilityNote: "You can engage us solely for early-stage discovery and feasibility if desired."
  },
  {
    step: "02",
    title: "Concept Ideation",
    tagline: "Exploring architectural forms, linkages, and mechanical layouts.",
    description: "We explore possibilities through sketches, references, and initial 3D conceptual volumes to shape your vision into a clear, viable mechanical direction before committing heavy engineering hours.",
    deliverables: [
      "3D Conceptual Volumes & Layouts",
      "Mechanism Topology Exploration",
      "Ergonomic & Structural Study",
      "Concept Selection Matrix"
    ],
    flexibilityNote: "Approach us even if you only need help shaping early-stage investor pitch geometry."
  },
  {
    step: "03",
    title: "3D CAD Modeling",
    tagline: "Precision parametric solid & surface engineering in native tools.",
    description: "Our engineers build precise 3D models using SolidWorks, CATIA, Creo, or AutoCAD. The models are parametric, fully constrained, and tailored for real-world product function, fit, and form.",
    deliverables: [
      "Parametric Native 3D CAD Parts & Assemblies",
      "Standardized Neutral Exports (STEP, IGES, Parasolid)",
      "Interference & Clash Detection Audit",
      "Dynamic Mating & Range-of-Motion Validation"
    ],
    flexibilityNote: "We handle standalone 3D CAD modeling, 2D-to-3D migrations, and model revisions."
  },
  {
    step: "04",
    title: "CAE Simulation",
    tagline: "FEA stress testing, thermal dissipation, and structural optimization.",
    description: "If needed, we subject the digital prototype to simulations like FEA stress analysis, vibration resonance, motion studies, or thermal testing to validate and optimize structural safety factors prior to physical tooling.",
    deliverables: [
      "Von Mises Stress & Displacement Plots",
      "Factor of Safety (FoS) Confirmation",
      "Thermal Flow & Heat Distribution Reports",
      "Weight Reduction & Ribbing Optimization"
    ],
    flexibilityNote: "Choose Invocad purely for simulation and performance audit of your existing CAD."
  },
  {
    step: "05",
    title: "DFM & Nesting",
    tagline: "Production refinement, tolerance stackup, and laser cutting layouts.",
    description: "We refine every radius, wall thickness, and draft angle to ensure production readiness. This includes optimization for raw stock sizes, CNC machining feasibility, sheet metal nesting, and cost efficiency.",
    deliverables: [
      "Design for Manufacturing (DFM) Audit",
      "Tolerance Stackup Analysis",
      "Laser Cutting DXF Nesting Layouts",
      "Detailed 2D Shop Floor Drawings with GD&T"
    ],
    flexibilityNote: "Ideal for clients who already have 3D models and need them manufacturing-ready."
  },
  {
    step: "06",
    title: "Production Support",
    tagline: "Vendor coordination, shop-floor alignment, and file revisions.",
    description: "From CNC file preparation to collaborating with machinists and fabricators, we assist during physical manufacturing to ensure digital precision translates 1:1 into the finished physical hardware.",
    deliverables: [
      "Machinist & Fabricator Consultation",
      "Tooling & Vendor File Preparation",
      "First Article Inspection (FAI) Guidance",
      "Post-Delivery Revisions & Archive Handover"
    ],
    flexibilityNote: "Even if your design is already finished, we can provide fabrication supervision."
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    question: "What services does Invocad provide?",
    answer: "We offer end-to-end mechanical product design and engineering services, including:\n• 3D CAD Modelling & Assembly Engineering\n• Technical 2D Drawings & GD&T Documentation\n• CAE Simulation & Structural FEA Analysis\n• Design for Manufacturing (DFM) & Sheet Metal Nesting\n• Product Prototyping & Fabrication Support\n• Reverse Engineering & 2D-to-3D Legacy Migration\nFrom initial concept to shop-floor manufacturing, we ensure your product is engineered to perform reliably."
  },
  {
    id: 2,
    question: "What do you mean by CAM?",
    answer: "CAM (Computer-Aided Manufacturing) at Invocad means we physically help bridge design to manufactured components. While we do not write raw G-code/M-code directly, we collaborate closely with machine operators, CNC fabricators, and workshop facilities to turn your digital design into a real, precision-machined product."
  },
  {
    id: 3,
    question: "What is CAE and how can it help my project?",
    answer: "CAE (Computer-Aided Engineering) helps simulate real-world physical conditions like mechanical load, vibration, heat, and stress inside a virtual environment. We use CAE tools to:\n• Validate product structural strength and safety factors\n• Optimize geometry before cutting steel\n• Reduce material scrap and prevent costly field failures\nThis ensures your design is safe, efficient, and production-ready before spending money on tooling."
  },
  {
    id: 4,
    question: "Do you only work with big companies?",
    answer: "No — we proudly partner with:\n• Individual inventors & solo entrepreneurs\n• Hardware startups\n• MSMEs & industrial machinery manufacturers\n• Large engineering corporations\nWhether you come to us with a rough pencil sketch or an existing enterprise design brief, we adapt to your scale."
  },
  {
    id: 5,
    question: "Can I start with just an idea or rough sketch?",
    answer: "Absolutely! Many of our most successful projects began as a rough hand drawing or functional problem statement. We help you flesh it out through conceptual morphology, define mechanical constraints, and engineer it into a complete, manufacturable design."
  },
  {
    id: 6,
    question: "Do you help with prototyping?",
    answer: "Yes. We support both digital prototyping (kinematic motion studies, photorealistic renderings) and physical prototyping. We help you select optimal materials, coordinate with reliable fabrication vendors, and inspect first articles."
  },
  {
    id: 7,
    question: "What industries do you serve?",
    answer: "Our engineering work spans:\n• Industrial Machinery & Automated Material Transfer\n• Agricultural Processing & Food Packaging\n• Automotive & Tooling Systems\n• Consumer Electronics & Mechanical Enclosures\n• Custom Jigs, Fixtures & Special Purpose Machines (SPM)\nIf it involves mechanical components, tolerances, and physical fabrication — we are your engineering team."
  },
  {
    id: 8,
    question: "How is pricing handled?",
    answer: "We offer transparent, flexible pricing tailored to your workflow:\n• Per-hour CAD & engineering rates for ongoing or exploratory tasks\n• Fixed-price milestones for clearly defined project scopes\n• Manufacturing-based costing for turnkey fabrication support\nWe provide clear, detailed estimates after reviewing your requirements with zero hidden surprises."
  },
  {
    id: 9,
    question: "Do you provide support after design delivery?",
    answer: "Yes. Our relationship does not stop when the files are transferred. We remain on hand for:\n• Minor design modifications and tolerance fine-tuning\n• Shop-floor drawing revisions based on vendor feedback\n• Engineering consultation during assembly and trial runs\n• Long-term design archive maintenance"
  },
  {
    id: 10,
    question: "How do I start a project with Invocad?",
    answer: "It is straightforward:\n1. Click 'Start a Project' or connect with us via email (contactinvocad@gmail.com) or WhatsApp (+91 7812883741).\n2. Share your brief, sketches, or existing CAD files under NDA.\n3. We review the technical scope and return a clear project roadmap with timeline and cost breakdown within 24 hours."
  }
];

export const TECHNICAL_SPECS = [
  {
    category: "CAD Modeling Platforms",
    items: ["Dassault Systèmes SolidWorks", "Autodesk AutoCAD Mechanical", "Dassault Systèmes CATIA", "PTC Creo Parametric"]
  },
  {
    category: "Simulation & CAE",
    items: ["Finite Element Analysis (FEA)", "Von Mises Stress Analysis", "Thermal Heat Dissipation", "Kinematic Multi-Body Motion"]
  },
  {
    category: "Manufacturing Engineering",
    items: ["Design for Manufacturing (DFM)", "Design for Assembly (DFA)", "GD&T (ASME Y14.5 / ISO 1101)", "Sheet Metal K-Factor & Nesting"]
  },
  {
    category: "Neutral Delivery Formats",
    items: ["STEP (.stp / .step AP214/242)", "Parasolid (.x_t / .x_b)", "IGES (.igs)", "DWG / DXF CNC Contours", "High-Res PDF Blueprints"]
  }
];
