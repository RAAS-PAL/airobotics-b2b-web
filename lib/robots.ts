export type Spec = {
  label: string;
  metric: string;
  imperial?: string;
};

export type SpecGroup = {
  title: string;
  specs: Spec[];
};

export type Feature = {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  /** key into the robot's images.features map */
  imageKey?: string;
};

export type HeroStat = {
  value: string;
  unit: string;
  label: string;
};

export type Robot = {
  slug: string;
  model: string;
  kind: string;
  tagline: string;
  /** one-sentence positioning used on metadata and the contact page */
  pitch: string;
  /** short benefit phrases for the lineup cards — scannable, not prose */
  highlights: string[];
  /** the situation this machine is the answer to — used as a selector label */
  bestFor: string;
  /** why a visitor would land on this machine rather than another */
  pickIf: string;
  intro: string;
  heroStats: HeroStat[];
  features: Feature[];
  specGroups: SpecGroup[];
  environments: string[];
  /** which sibling models to suggest, in order */
  compare: string[];
  /** Withheld from the site without being deleted: the entry stays here with
   *  its copy and specs intact, but no listing, route or sitemap entry is
   *  generated for it. Use this rather than commenting a machine out. */
  hidden?: boolean;
};

export const robots: Robot[] = [
  {
    slug: "l3",
    model: "L3",
    kind: "Autonomous floor scrubber",
    tagline: "Fits where the others can't.",
    pitch:
      "Compact AI floor scrubber that passes through 700 mm gaps — built for hospitals, schools and tight retail floors.",
    highlights: [
      "Passes through 700 mm gaps",
      "Hands-free voice control",
      "Spots cables and loose mats",
    ],
    bestFor: "Tight spaces",
    pickIf:
      "Your floors have narrow corridors, standard doorways or crowded aisles where a larger machine simply cannot fit — hospital wings, classrooms, small-format retail.",
    intro:
      "The L3 carries a 100 TOPS NVIDIA AI platform and a 96-beam 3D LiDAR in a body narrow enough for a hospital corridor at visiting hours. It plans its own routes, avoids what people leave in them, and answers to plain voice commands.",
    heroStats: [
      { value: "700", unit: "mm", label: "passage width" },
      { value: "2,016", unit: "m²/h", label: "max productivity" },
      { value: "100", unit: "TOPS", label: "NVIDIA AI compute" },
      { value: "96", unit: "beams", label: "3D LiDAR" },
    ],
    features: [
      {
        eyebrow: "Intelligence",
        title: "A supercomputer pushing a scrubber",
        body: "NVIDIA silicon rated at 100 TOPS reads a 96-beam 3D LiDAR point cloud in real time. The L3 doesn't follow a painted line — it builds a live map, plans its own routes, and re-plans the moment a pallet, bed or person appears where the map says floor.",
        bullets: [
          "Autonomous path planning with live re-routing",
          "Obstacle avoidance tuned for occupied buildings",
          "Maps update themselves when your layout changes",
        ],
      },
      {
        eyebrow: "Perception & safety",
        title: "Sees the hazards people trip on",
        body: "Ground-level perception detects the things that stop other robots and hurt staff — temporary carpets, loose cables, mats at a wet entrance. The L3 classifies them and cleans around them instead of eating them.",
        imageKey: "perception",
        bullets: [
          "Temporary carpet and cable detection",
          "Safe behaviour around doors and entrances",
          "Designed for daytime operation among people",
        ],
      },
      {
        eyebrow: "Voice control",
        title: "Tell it. Don't touch it.",
        body: "Simple voice commands start, pause and redirect the robot — no gloves off, no screen taps. For clinical environments where hands stay clean, that's not a gimmick; it's infection control.",
        imageKey: "app",
        bullets: [
          "Hands-free start, pause and dispatch",
          "Full mobile app for routes, alerts and reports",
          "Live location and completed-task notifications",
        ],
      },
      {
        eyebrow: "Serviceability",
        title: "Maintenance measured in seconds",
        body: "A large-access recovery tank, magnetic quick-swap brushes and a quick-release squeegee mean the daily service routine doesn't need a technician — or a coffee break.",
        imageKey: "maintenance",
        bullets: [
          "Magnetic brushes drop in and out by hand",
          "Quick-release squeegee, no tools",
          "Wide-mouth recovery tank for fast rinse-out",
        ],
      },
      {
        eyebrow: "Extended operations",
        title: "No plumbing? No problem.",
        body: "Pair the L3 with the WS3 workstation and WT3 mobile water tank (60 L fresh / 50 L recovery) and it runs extended cleaning cycles in buildings with no fixed water connection at all.",
        imageKey: "workstation",
        bullets: [
          "WS3 workstation for autonomous charging",
          "WT3 mobile tank: 60 L fresh, 50 L recovery",
          "Off-hours cycles without a water hookup",
        ],
      },
    ],
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Max productivity", metric: "2,016 m²/h" },
          { label: "Cleaning width", metric: "400 mm", imperial: "15.7 in" },
          { label: "Brush pressure", metric: "18 kg", imperial: "39.7 lbs" },
          { label: "Solution tank", metric: "25 L", imperial: "6.6 gal" },
        ],
      },
      {
        title: "Intelligence",
        specs: [
          { label: "AI compute", metric: "100 TOPS (NVIDIA)" },
          { label: "LiDAR", metric: "96-beam 3D" },
          { label: "Voice control", metric: "Onboard commands" },
          { label: "Map updates", metric: "Automatic" },
        ],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Passage width", metric: "700 mm", imperial: "27.6 in" },
          { label: "Length", metric: "763 mm", imperial: "30 in" },
          { label: "Width", metric: "572 mm", imperial: "22.5 in" },
          { label: "Height", metric: "1,000 mm", imperial: "39.4 in" },
          { label: "Weight", metric: "132 kg", imperial: "291 lbs" },
        ],
      },
      {
        title: "WT3 mobile tank (optional)",
        specs: [
          { label: "Fresh water", metric: "60 L", imperial: "16 gal" },
          { label: "Recovery", metric: "50 L", imperial: "13.2 gal" },
        ],
      },
    ],
    environments: ["Hospitals", "Schools", "Retail", "Offices", "Clinics"],
    compare: ["l4", "l50"],
  },
  {
    slug: "l4",
    model: "L4",
    kind: "Edge-cleaning floor scrubber",
    tagline: "Balanced size. High productivity.",
    pitch:
      "The volume workhorse for retail and hospitality — fits a standard doorway and scrubs to within 3 cm of the wall.",
    highlights: [
      "Clears a standard doorway",
      "Scrubs to 3 cm from the wall",
      "Runs 24/7 with its workstation",
    ],
    bestFor: "Retail & hotels",
    pickIf:
      "You clean occupied retail floors or hotel public areas during trading hours, and need the edges and skirting done properly, not just the middle.",
    intro:
      "At 810 mm passage width the L4 goes through a standard door frame, then cleans to within 3 cm of the skirting board. Stain-perception AI adjusts water, pressure and speed to what it actually sees on the floor.",
    heroStats: [
      { value: "810", unit: "mm", label: "passage width" },
      { value: "1,944", unit: "m²/h", label: "max productivity" },
      { value: "<3", unit: "cm", label: "edge distance" },
      { value: "150", unit: "m", label: "LiDAR range" },
    ],
    features: [
      {
        eyebrow: "Stain perception",
        title: "Cleans harder where it's dirtier",
        body: "Vision AI classifies stains in its path and adjusts brush pressure, water flow and speed on the spot — full effort on the spill, light touch on the clean run.",
        bullets: [
          "Real-time stain classification",
          "Automatic pressure, flow and speed adjustment",
          "Solution flow tracks cleaning speed to cut waste",
        ],
      },
      {
        eyebrow: "Edge cleaning",
        title: "Through the doorway, along the edge",
        body: "Most rivals in this class can't pass a standard door frame. The L4 does — then hugs walls and shelving to under 3 cm, where the dirt actually collects.",
        bullets: [
          "810 mm passage width clears standard doorways",
          "Edge distance under 3 cm along walls and racking",
          "1,100 mm turning width for tight aisle ends",
        ],
      },
      {
        eyebrow: "Perception",
        title: "A 150-metre head start",
        body: "A 32-beam 3D LiDAR with 150 m of range, backed by 3D depth cameras and bumper sensors, maps the building and everything moving through it — so the L4 plans clean lines and gives people and pallet trucks a wide berth.",
        imageKey: "lidar",
        bullets: [
          "32-beam 3D LiDAR, 150 m detection range",
          "3D depth cameras and bumper sensors",
          "Re-plans live when the aisle changes",
        ],
      },
      {
        eyebrow: "Mobile app",
        title: "The whole night, reported",
        body: "Every run ends with a report: route map, coverage percentage, area cleaned, water and detergent used, minutes worked. Plan routes, get completion alerts, and prove the clean happened — without walking the floor.",
        imageKey: "app",
        bullets: [
          "Route planning and live location",
          "Coverage and consumption reports per run",
          "Completion and fault alerts to your phone",
        ],
      },
      {
        eyebrow: "24/7 operation",
        title: "The 4-in-1 workstation",
        body: "Docked at its workstation the L4 empties, refills, charges and returns to work without a human in the loop. Squeegee replacement takes 30 seconds when it's finally due.",
        imageKey: "workstation",
        bullets: [
          "Autonomous empty, refill and charge cycles",
          "Overnight cleaning with nobody on site",
          "30-second squeegee replacement",
        ],
      },
    ],
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Max productivity", metric: "1,944 m²/h" },
          { label: "Cleaning width", metric: "450 mm", imperial: "17.7 in" },
          { label: "Brush pressure", metric: "20 kg", imperial: "44 lbs" },
          { label: "Solution tank", metric: "38 L", imperial: "10 gal" },
          { label: "Edge cleaning", metric: "<3 cm", imperial: "<1.2 in" },
        ],
      },
      {
        title: "Intelligence",
        specs: [
          { label: "AI compute", metric: "32 TOPS (NVIDIA)" },
          { label: "LiDAR", metric: "32-beam 3D, 150 m range" },
          { label: "Touchscreen", metric: "10.1 in" },
          { label: "Stain perception", metric: "Vision AI" },
        ],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Passage width", metric: "810 mm", imperial: "31.9 in" },
          { label: "Turning width", metric: "1,100 mm", imperial: "43.3 in" },
          { label: "Length", metric: "810 mm", imperial: "31.9 in" },
          { label: "Width", metric: "615 mm", imperial: "24.2 in" },
          { label: "Height", metric: "1,075 mm", imperial: "42.3 in" },
          { label: "Weight", metric: "150 kg", imperial: "331 lbs" },
        ],
      },
    ],
    environments: ["Retail", "Hospitality", "Hospitals", "Education"],
    compare: ["l3", "l50"],
  },
  {
    slug: "l50",
    model: "L50",
    kind: "High-capacity industrial scrubber",
    tagline: "5,600 square metres. One charge.",
    pitch:
      "The warehouse workhorse — 55 L tank, 6-hour runtime, and 3,700–5,600 m² covered without a refill.",
    highlights: [
      "3,700–5,600 m² on one charge",
      "Six-hour runtime",
      "Sees 150 m down the aisle",
    ],
    bestFor: "Warehouses",
    pickIf:
      "You have large open floors where the machine spends more time going back for water than cleaning — distribution centres, big-box retail, industrial units.",
    intro:
      "Built for warehouses, logistics hubs and big-box floors: a 55-litre solution tank, 25 kg of brush pressure for epoxy floors, and a battery that runs a full shift. It covers 3,700–5,600 square metres on a single charge without asking for anything.",
    heroStats: [
      { value: "2,203", unit: "m²/h", label: "hourly coverage" },
      { value: "55", unit: "L", label: "solution tank" },
      { value: "6", unit: "h", label: "max runtime" },
      { value: "25", unit: "kg", label: "brush pressure" },
    ],
    features: [
      {
        eyebrow: "Capacity",
        title: "A full shift without a refill",
        body: "The 120 Ah battery and 55-litre tank are sized so one dispatch covers 3,700–5,600 square metres — a full night's floor in most facilities — before it needs water or power.",
        bullets: [
          "Up to 6 hours on one charge",
          "55 L solution tank, 25 kg brush pressure",
          "Built for epoxy and sealed concrete floors",
        ],
      },
      {
        eyebrow: "Detection",
        title: "Sees 150 metres down the aisle",
        body: "Long-range LiDAR plus protruding-object and glass detection keep it safe among racking, forklifts and floor-to-ceiling storefronts — the hazards that blind lesser machines.",
        imageKey: "safety",
      },
      {
        eyebrow: "Onboard console",
        title: "Mission control, on the machine",
        body: "The onboard touchscreen shows task progress, schedules and alarms, with one-touch pause, stop and dispatch. Anyone on the night crew can drive the whole operation without training.",
        imageKey: "console",
      },
      {
        eyebrow: "Fleet app",
        title: "Not a speck missed",
        body: "Plan routes, watch live location, and get completion reports with coverage and consumption per run. Over-the-air updates add capability while the robot sleeps.",
        imageKey: "app",
      },
      {
        eyebrow: "Autonomous refill",
        title: "Docks. Drains. Refills. Returns.",
        body: "The CWS workstation lets the L50 swap its own water — discharging the recovery tank and refilling solution against docking fiducials, then heading straight back to the floor.",
        imageKey: "workstation",
      },
    ],
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Hourly coverage", metric: "2,203 m²/h" },
          { label: "Cleaning width", metric: "510 mm", imperial: "20 in" },
          { label: "Brush pressure", metric: "25 kg", imperial: "55.1 lbs" },
          { label: "Solution tank", metric: "55 L", imperial: "14.5 gal" },
          { label: "Max speed", metric: "1.2 m/s", imperial: "2.7 mph" },
          { label: "Battery", metric: "120 Ah · up to 6 h" },
          { label: "Edge cleaning", metric: "<5 cm", imperial: "<2 in" },
        ],
      },
      {
        title: "Detection",
        specs: [
          { label: "Detection range", metric: "150 m", imperial: "492 ft" },
          { label: "Protruding objects", metric: "Detected" },
          { label: "Glass", metric: "Detected" },
        ],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Passage width", metric: "920 mm", imperial: "36.2 in" },
          { label: "Length", metric: "1,030 mm", imperial: "40.6 in" },
          { label: "Width", metric: "580 mm", imperial: "22.8 in" },
          { label: "Height", metric: "1,045 mm", imperial: "41.1 in" },
          { label: "Squeegee width", metric: "740 mm", imperial: "29 in" },
          { label: "Weight", metric: "220 kg", imperial: "485 lbs" },
        ],
      },
    ],
    environments: ["Warehouses", "Logistics", "Manufacturing", "Big-box retail"],
    compare: ["sp50", "s5"],
  },
  {
    slug: "sp50",
    model: "SP50",
    kind: "AI spot-cleaning robot",
    tagline: "Finds the mess. Skips the rest.",
    pitch:
      "Patrols for spills and litter instead of scrubbing everything — covering up to 15,550 m²/h because it only stops where there is something to clean.",
    highlights: [
      "Cleans only where the mess is",
      "99% recognition accuracy",
      "Up to 13 hours on one charge",
    ],
    bestFor: "Spot cleaning",
    pickIf:
      "Your floors are broadly clean but constantly picking up scattered mess — dropped food, spills, litter — across an area far too large to keep scrubbing end to end.",
    intro:
      "Full-coverage cleaning spends most of its effort on floor that was already clean. The SP50 patrols instead: a 10-billion-parameter model recognises debris with 99% accuracy, and 25 kPa of suction goes exactly where it is needed. The result is up to 15,550 square metres an hour — roughly eight times what the same machine manages scrubbing every inch.",
    heroStats: [
      { value: "15,550", unit: "m²/h", label: "spot-clean patrol" },
      { value: "99", unit: "%", label: "recognition accuracy" },
      { value: "25", unit: "kPa", label: "suction" },
      { value: "13", unit: "h", label: "max runtime" },
    ],
    features: [
      {
        eyebrow: "Spot intelligence",
        title: "Eight times the ground, same shift",
        body: "Because it cleans only where its AI sees dirt, the SP50 patrols roughly eight times the area of a full-coverage machine — the right shape for food courts, terminals and lobbies where mess is constant but scattered.",
        bullets: [
          "15,550 m²/h patrolling versus 1,987 m²/h full coverage",
          "Cleans on detection, not on a fixed route",
          "Automatic map updates when the floor plan changes",
        ],
      },
      {
        eyebrow: "Recognition",
        title: "A ten-billion-parameter eye for mess",
        body: "The onboard model identifies waste types with 99% accuracy — dropped fries, spilt drinks, shredded paper — and picks the approach each one needs rather than treating every mark the same.",
        bullets: [
          "10-billion-parameter recognition model",
          "99% accuracy on waste identification",
          "25 kPa suction applied where it counts",
        ],
      },
      {
        eyebrow: "Onboard console",
        title: "Run it from the machine",
        body: "The onboard touchscreen shows task progress, schedules and alarms, with one-touch continue, stop and return-to-dock. Anyone on shift can drive it without training.",
        imageKey: "console",
      },
      {
        eyebrow: "Perception & safety",
        title: "Built to work among people",
        body: "150 metres of detection range, plus protruding-object and glass detection, keep the SP50 safe in crowds and against the floor-to-ceiling glass that defeats lesser machines. Edge cleaning reaches within 5 cm of the wall.",
        bullets: [
          "150 m detection range",
          "Protruding-object and glass detection",
          "Edge cleaning to within 5 cm",
        ],
      },
      {
        eyebrow: "Workstation",
        title: "Empties and charges itself",
        body: "The CCS-02 workstation takes the machine back between patrols — charging it and handling the debris so the 18-litre filter bag and 5-litre tray last far longer than a shift.",
        imageKey: "workstation",
        bullets: [
          "CCS-02 docking and charging station",
          "18 L dust filter bag, 5 L trash tray",
          "Docking fiducials for unattended return",
        ],
      },
      {
        eyebrow: "On site",
        title: "A floor that is still in use",
        body: "A live retail concourse — glass frontage, seating, foot traffic that never quite stops. This is the floor the SP50 is built for: it patrols for what has actually been dropped, rather than working a fixed route across every square metre of it.",
        imageKey: "insitu",
      },
    ],
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Spot-clean patrol", metric: "15,550 m²/h" },
          { label: "Full coverage", metric: "1,987 m²/h" },
          { label: "Suction", metric: "25 kPa" },
          { label: "Runtime, spot cleaning", metric: "13 h" },
          { label: "Runtime, full coverage", metric: "8 h" },
          { label: "Sweeping width", metric: "720 mm", imperial: "28.3 in" },
          { label: "Roller brush", metric: "460 mm", imperial: "18.1 in" },
        ],
      },
      {
        title: "Intelligence & safety",
        specs: [
          { label: "Model parameters", metric: "10B" },
          { label: "Recognition accuracy", metric: "99%" },
          { label: "Detection range", metric: "150 m", imperial: "492 ft" },
          { label: "Protruding objects", metric: "Detected" },
          { label: "Glass", metric: "Detected" },
          { label: "Edge cleaning", metric: "<5 cm", imperial: "<2 in" },
          { label: "Map updates", metric: "Automatic" },
        ],
      },
      {
        title: "Capacity",
        specs: [
          { label: "Dust filter bag", metric: "18 L", imperial: "4.8 gal" },
          { label: "Trash tray", metric: "5 L", imperial: "1.3 gal" },
        ],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Passage width", metric: "800 mm", imperial: "31.5 in" },
          { label: "Length", metric: "855 mm", imperial: "33.7 in" },
          { label: "Width", metric: "600 mm", imperial: "23.6 in" },
          { label: "Height", metric: "1,050 mm", imperial: "41.3 in" },
          { label: "Gross vehicle weight", metric: "132 kg", imperial: "291 lbs" },
        ],
      },
    ],
    environments: ["Hotels", "Hospitals", "Retail", "Education"],
    compare: ["l50", "s5"],
  },
  {
    slug: "c5",
    hidden: true, // not currently sold — kept for reference, see Robot.hidden
    model: "C5",
    kind: "3-in-1 cleaning machine",
    tagline: "Three jobs. One pass.",
    pitch:
      "Sweeps, scrubs and dust mops in a single pass — with a 90-litre tank and a workstation that refills and cleans itself.",
    highlights: [
      "Sweeps, scrubs and mops in one pass",
      "90 L tank — largest in the fleet",
      "Self-cleans its tank in 4 min",
    ],
    bestFor: "All-in-one",
    pickIf:
      "Your floors need sweeping, scrubbing and mopping, and running three separate machines over the same ground is not practical.",
    intro:
      "Most floors need three machines and three passes. The C5 needs one. It sweeps debris, scrubs the floor and dust mops behind itself in a single run, carries 90 litres of water to do it, and returns to a workstation that refills, drains and flushes its own sewage tank in four minutes.",
    heroStats: [
      { value: "1,980", unit: "m²/h", label: "max cleaning rate" },
      { value: "90", unit: "L", label: "water tank" },
      { value: "550", unit: "mm", label: "cleaning width" },
      { value: "95", unit: "%", label: "debris removal" },
    ],
    features: [
      {
        eyebrow: "Professional cleaning",
        title: "Sweep, scrub and mop — in one run",
        body: "Dual side brushes pull debris in from the edges, the roller brush and 25 kg of scrubbing pressure take the floor down to clean, and the dust mop finishes behind. Heavily soiled floors come back in a single pass instead of three.",
        bullets: [
          "Sweeping, scrubbing and dust mopping combined",
          "Over 95% debris removal",
          "Zero-distance side-brush edge cleaning",
        ],
      },
      {
        eyebrow: "Positioning",
        title: "Laser and vision, fused",
        body: "Laser-vision fusion positioning keeps the C5 located when either sensor alone would drift — through glass atriums, past mirrored shopfronts, across the wide open floors that defeat pure-LiDAR machines.",
        bullets: [
          "Laser-vision fusion positioning",
          "Visual and point-cloud fusion perception",
          "Over 90% self-diagnostic coverage",
        ],
      },
      {
        eyebrow: "Self-maintenance",
        title: "It cleans its own tank",
        body: "The dirtiest job on any scrubber is the sewage tank, and it is the one people skip. The C5 flushes its own in four minutes at the workstation — then refills, charges and goes back out.",
        bullets: [
          "Four-minute sewage tank self-clean",
          "Automatic charging and water management",
          "Closed-loop cleaning re-covers any missed area",
        ],
      },
      {
        eyebrow: "Control",
        title: "On the machine, on your phone, in the cloud",
        body: "Start a job from the robot's own screen, dispatch it from your phone, or schedule the whole week from the cloud console — with job reports waiting for you either way.",
        bullets: [
          "Triple-platform control: robot, mobile and cloud",
          "Autonomous boundary recognition and map updates",
          "Automatic scheduling and job reporting",
        ],
      },
      {
        eyebrow: "Workstation",
        title: "The dock does the dirty work",
        body: "A compact station that fills at up to 10 litres a minute, drains at up to 15, and runs the tank self-clean cycle. Where there is no plumbing, a mobile tank configuration does the same job.",
        imageKey: "workstation",
        bullets: [
          "Automatic fill, drain and sewage self-clean",
          "8 L onboard tank, 1,800 W peak draw",
          "Mobile tank option for sites without plumbing",
        ],
      },
    ],
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Max cleaning rate", metric: "1,980 m²/h" },
          { label: "Cleaning width", metric: "550 mm", imperial: "21.7 in" },
          { label: "Scrubbing pressure", metric: "25 kg", imperial: "55.1 lbs" },
          { label: "Water tank", metric: "90 L", imperial: "23.8 gal" },
          { label: "Debris removal", metric: ">95%" },
          { label: "Scrubbing endurance", metric: "3 h" },
        ],
      },
      {
        title: "Intelligence & safety",
        specs: [
          { label: "Positioning", metric: "Laser-vision fusion" },
          { label: "Perception", metric: "Visual + point cloud" },
          { label: "Self-diagnostic coverage", metric: ">90%" },
          { label: "Boundary recognition", metric: "Autonomous" },
        ],
      },
      {
        title: "Durability & upkeep",
        specs: [
          { label: "Sewage tank self-clean", metric: "4 min" },
          { label: "Fan lifespan", metric: "10,000 h" },
          { label: "Cleaning modes", metric: "Sweep · scrub · dust mop" },
        ],
      },
      {
        title: "Workstation",
        specs: [
          { label: "Dimensions (L×W×H)", metric: "520 × 310 × 1,038 mm", imperial: "20.5 × 12.2 × 40.9 in" },
          { label: "Water tank", metric: "8 L", imperial: "2.1 gal" },
          { label: "Fill rate", metric: "7–10 L/min", imperial: "1.8–2.6 gal/min" },
          { label: "Drainage rate", metric: "10–15 L/min", imperial: "2.6–4.0 gal/min" },
          { label: "Max power", metric: "1,800 W" },
        ],
      },
    ],
    environments: [
      "Shopping malls",
      "Airports",
      "Transport hubs",
      "Factories",
      "Hospitals",
      "Supermarkets",
      "Office buildings",
      "Hotels",
    ],
    compare: ["l50", "s5"],
  },
  {
    slug: "s5",
    model: "S5",
    kind: "Industrial robotic sweeper",
    tagline: "Dry debris. Wholesale.",
    pitch:
      "AI-driven industrial sweeper for dry debris — 2,500 m²/h, and it works in coordinated fleets.",
    highlights: [
      "Handles dust to dropped bolts",
      "Works in coordinated fleets",
      "Yields to forklifts and AGVs",
    ],
    bestFor: "Dry debris",
    pickIf:
      "Your mess is dry — dust, packaging film, offcuts, bottle caps — on floors where you do not want water at all.",
    intro:
      "From fine dust to wood chips, packaging film, bottles and screws — the S5 sweeps the dry side of industrial floors at 2,500 m²/h. TeamClean lets several units carve up a warehouse together, and vehicle recognition keeps them clear of your forklifts.",
    heroStats: [
      { value: "2,500", unit: "m²/h", label: "sweep rate" },
      { value: "50", unit: "L", label: "debris hopper" },
      { value: "2", unit: "h", label: "full charge" },
      { value: "100", unit: "TOPS", label: "NVIDIA AI compute" },
    ],
    features: [
      {
        eyebrow: "TeamClean",
        title: "One floor, many sweepers",
        body: "S5 units coordinate as a fleet, dividing the floor between them and adapting when one is charging. Big facilities clean in a fraction of the time.",
        imageKey: "teamclean",
      },
      {
        eyebrow: "Vehicle recognition",
        title: "Knows a forklift when it sees one",
        body: "Purpose-trained recognition for forklifts, AGVs and site vehicles means the S5 yields early and keeps working around live traffic, not just after hours.",
        imageKey: "vehicle",
      },
      {
        eyebrow: "Debris handling",
        title: "From dust to dropped bolts",
        body: "Advanced dust control plus a 50-litre hopper handles fine powder and coarse industrial waste in the same pass — film, cardboard, screws, bottle caps.",
        imageKey: "dust",
      },
      {
        eyebrow: "Serviceability",
        title: "Empty it and go",
        body: "The hopper lifts out without tools, filters shake clean in seconds, and every wear part is reachable from the outside — service fits inside a coffee break, not a maintenance window.",
        imageKey: "maintenance",
      },
      {
        eyebrow: "Continuous operation",
        title: "Charges in two hours, works around the clock",
        body: "A 2-hour fast charge and its own docking station keep the S5 in rotation — it tops up between shifts and returns to its route without being asked.",
        imageKey: "station",
      },
    ],
    specGroups: [
      {
        title: "Performance",
        specs: [
          { label: "Sweep rate", metric: "2,500 m²/h" },
          { label: "Sweeping width", metric: "820 mm", imperial: "32.3 in" },
          { label: "Debris hopper", metric: "50 L", imperial: "13.2 gal" },
          { label: "Charging time", metric: "2–2.5 h" },
        ],
      },
      {
        title: "Intelligence",
        specs: [
          { label: "AI compute", metric: "100 TOPS (NVIDIA)" },
          { label: "LiDAR", metric: "32-beam 3D, 150 m range" },
          { label: "Fleet mode", metric: "TeamClean" },
          { label: "Vehicle recognition", metric: "Forklifts, AGVs" },
        ],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Passage width", metric: "810 mm", imperial: "31.9 in" },
          { label: "Length", metric: "1,030 mm", imperial: "40.6 in" },
          { label: "Width", metric: "720 mm", imperial: "28.3 in" },
          { label: "Height", metric: "990 mm", imperial: "39 in" },
          { label: "Weight", metric: "130 kg", imperial: "287 lbs" },
        ],
      },
    ],
    environments: ["Warehouses", "Manufacturing", "Parking garages", "Logistics"],
    compare: ["l50", "sp50"],
  },
  /* Figures from the AI Robotics V3 spec sheet (Oct 2026). Productivity is
     the sheet's maximum; nothing here is derived or estimated. */
  {
    slug: "v3",
    model: "V3",
    kind: "Robotic vacuum sweeper",
    tagline: "Sweeps it. Vacuums it. Carpet too.",
    pitch:
      "AI vacuum sweeper that sweeps and vacuums hard floors and carpet in one machine — up to 1,000 m²/h, with H13 HEPA filtration.",
    highlights: [
      "Sweeps and vacuums in one pass",
      "Hard floors and carpet",
      "H13 HEPA filtration",
    ],
    bestFor: "Carpet & lobbies",
    pickIf:
      "Your floors mix carpet and hard surfaces — hotel lobbies, offices, corridors — and the mess is dry: dust, paper, tissues, spilled coffee beans.",
    intro:
      "The V3 sweeps and vacuums in a single machine, on hard floors and carpet alike. A 100 TOPS NVIDIA platform and a 96-beam 3D LiDAR guide it along walls and under handrails, it finds litter and cleans just those patches, and an H13 HEPA filter keeps the dust it lifts out of the air.",
    heroStats: [
      { value: "1,000", unit: "m²/h", label: "max productivity" },
      { value: "25", unit: "kPa", label: "max suction" },
      { value: "680", unit: "mm", label: "passage width" },
      { value: "4–5", unit: "h", label: "runtime" },
    ],
    features: [
      {
        eyebrow: "Navigation",
        title: "Along the wall, under the rail",
        body: "NVIDIA compute rated at 100 TOPS reads a 96-beam 3D LiDAR to map the floor and plan its own routes. It cleans tight to the wall and reaches in under handrails along walkways, where manual sweeping usually stops short.",
      },
      {
        eyebrow: "Spot cleaning",
        title: "Finds the mess, skips the rest",
        body: "The V3 detects litter on its own and cleans those patches, passing over floor that is already clean instead of covering the whole area every run.",
      },
      {
        eyebrow: "Filtration",
        title: "H13 HEPA on the exhaust",
        body: "What the V3 vacuums up stays in the machine. Its H13 HEPA filter captures 99.95% of particles at 0.3 microns, so fine dust ends up in the bag rather than back in the room.",
      },
      {
        eyebrow: "Sweep + vacuum",
        title: "Two jobs, one machine",
        body: "Side brushes and a 700 rpm roller sweep debris in while 25 kPa of suction lifts it — fine dust, paper, tissues, coffee beans and general litter, on hard floors and carpet alike.",
        imageKey: "pickup",
        bullets: [
          "Sweeping and vacuuming in the same pass",
          "Carpet vacuuming as well as hard floors",
          "Dust mopping with the optional Dust Mop Module",
        ],
      },
      {
        eyebrow: "Docking",
        title: "Back to the dock on its own",
        body: "The V3 returns to its charging dock on its own. A 60 Ah LFP battery runs it for 4–5 hours and recharges in 1.5–2.",
        imageKey: "dock",
        bullets: [
          "Automatic return to the charging dock",
          "4–5 h runtime, 1.5–2 h charge",
          "Supports the optional Dust Mop Module",
        ],
      },
    ],
    specGroups: [
      {
        title: "Cleaning",
        specs: [
          { label: "Max productivity", metric: "1,000 m²/h" },
          { label: "Sweeping width", metric: "730 mm", imperial: "28.7 in" },
          { label: "Max suction", metric: "25 kPa" },
          { label: "Airflow", metric: "187 m³/h", imperial: "110 CFM" },
          { label: "Roller brush speed", metric: "700 rpm" },
          { label: "Debris tray", metric: "5 L", imperial: "1.3 gal" },
          { label: "Dust bag", metric: "18 L", imperial: "4.8 gal" },
          { label: "Filtration", metric: "H13 HEPA, 99.95% @ 0.3 µm" },
        ],
      },
      {
        title: "Electrical & intelligence",
        specs: [
          { label: "Battery", metric: "LFP, 60 Ah, 25.6 V DC" },
          { label: "Charging time", metric: "1.5–2 h" },
          { label: "Runtime", metric: "4–5 h" },
          { label: "AI compute", metric: "100 TOPS (NVIDIA)" },
          { label: "LiDAR", metric: "96-beam 3D" },
        ],
      },
      {
        title: "Dimensions & movement",
        specs: [
          { label: "Max speed", metric: "1.2 m/s", imperial: "3.9 ft/s" },
          { label: "Passage width", metric: "680 mm", imperial: "26.8 in" },
          { label: "Length", metric: "703 mm", imperial: "27.7 in" },
          { label: "Width", metric: "583 mm", imperial: "23 in" },
          { label: "Height", metric: "965 mm", imperial: "38 in" },
          { label: "Weight", metric: "113 kg", imperial: "249 lbs" },
        ],
      },
    ],
    environments: ["Hotels", "Office buildings", "Shopping malls", "Airports"],
    compare: ["s5", "sp50"],
  },
];

/** Everything the site should show. Listings, routes, the sitemap and the
 *  comparison table all read from this, never from `robots` directly. */
export const visibleRobots: Robot[] = robots.filter((r) => !r.hidden);

export function getRobot(slug: string): Robot | undefined {
  return visibleRobots.find((r) => r.slug === slug);
}
