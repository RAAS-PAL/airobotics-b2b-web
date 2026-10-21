import type { StaticImageData } from "next/image";

import homeHeroWarehouse from "@/public/robots/shared/home-hero-warehouse.webp";

import l3Hero from "@/public/robots/l3/l3-hero-wide.png";
import l3Product from "@/public/robots/l3/l3-product.png";
import l3App from "@/public/robots/l3/l3-app-retail.png";
import l3Perception from "@/public/robots/l3/l3-perception.webp";
import l3Maintenance from "@/public/robots/l3/l3-maintenance.webp";
import l3Workstation from "@/public/robots/l3/l3-workstation-ws3.png";

import l4Hero from "@/public/robots/l4/l4-hero-corridor.png";
import l4HeroRobot from "@/public/robots/l4/l4-hero-robot.png";
import l4Product from "@/public/robots/l4/l4-product.png";
import l4Lidar from "@/public/robots/l4/l4-lidar.jpg";
import l4App from "@/public/robots/l4/l4-app-report.jpg";
import l4WorkstationPair from "@/public/robots/l4/l4-workstation-pair.jpg";

import l50Hero from "@/public/robots/l50/distribution-centre-aisle-night-2560x1440.png";
import l50Product from "@/public/robots/l50/l50-product.png";
import l50Front from "@/public/robots/l50/l50-front.png";
import l50Console from "@/public/robots/l50/l50-console.jpg";
import l50Safety from "@/public/robots/l50/l50-safety.jpg";
import l50App from "@/public/robots/l50/l50-app-report.jpg";
import l50Cws from "@/public/robots/l50/l50-workstation-cws.jpg";
import l50SceneRetail from "@/public/robots/l50/l50-scene-retail.jpg";
import l50SceneHospitals from "@/public/robots/l50/l50-scene-hospitals.jpg";
import l50SceneHotels from "@/public/robots/l50/l50-scene-hotels.jpg";
import l50SceneEducation from "@/public/robots/l50/l50-scene-education.jpg";

import c5Pair from "@/public/robots/C5/c5-hero-pair.png";
import c5Product from "@/public/robots/C5/c5-product.png";
import c5Workstation from "@/public/robots/C5/c5-workstation.png";

import sp50Hero from "@/public/robots/sp50/mall-concourse-night-cinematic-2560x1440-final.png";
import sp50Banner from "@/public/robots/sp50/product-sp50-banner-robot-m.png";
import sp50Product from "@/public/robots/sp50/sp50-product.png";
import sp50InSitu from "@/public/robots/sp50/product-sp50-performance.png";
import sp50Workstation from "@/public/robots/sp50/sp50-workstation.png";
import sp50Console from "@/public/robots/sp50/sp50-console.jpg";

import s5Warehouse from "@/public/robots/s5/s5-hero-warehouse.webp";
import s5HeroRobot from "@/public/robots/s5/s5-hero-robot.png";
import s5TeamClean from "@/public/robots/s5/s5-teamclean.webp";
import s5Vehicle from "@/public/robots/s5/s5-vehicle-recognition.webp";
import s5Dust from "@/public/robots/s5/s5-dust-control.webp";
import s5Maintenance from "@/public/robots/s5/s5-maintenance.webp";
import s5Station from "@/public/robots/s5/s5-station.png";
import v3Hero from "@/public/robots/v3/v3-hero-corridor.png";
import v3Product from "@/public/robots/v3/v3-product.png";
import v3Pickup from "@/public/robots/v3/v3-lobby-debris.png";
import v3Dock from "@/public/robots/v3/v3-dock.png";

export type RobotImages = {
  /** wide banner behind the product-page hero */
  hero?: StaticImageData;
  /** object-position class when the default right-bias crop doesn't suit the shot */
  heroClass?: string;
  /** transparent cutout composited onto the hero (for background-only banners) */
  heroForeground?: { src: StaticImageData; alt: string };
  /** positioning override for the hero cutout; defaults to a bottom-right portrait slot */
  heroForegroundClass?: string;
  /** transparent product cut-out for cards and lineup */
  product?: StaticImageData;
  /** keyed feature-section imagery */
  features: Record<string, { src: StaticImageData; alt: string }>;
  /** in-situ environment gallery for the "where it works" section */
  scenes?: { src: StaticImageData; alt: string; label: string }[];
};

export const robotImages: Record<string, RobotImages> = {
  l3: {
    hero: l3Hero,
    product: l3Product,
    features: {
      perception: {
        src: l3Perception,
        alt: "L3 detecting a temporary entrance carpet with its perception system in a mall lobby",
      },
      app: {
        src: l3App,
        alt: "Facility staff dispatching the L3 from the mobile app in a supermarket aisle",
      },
      maintenance: {
        src: l3Maintenance,
        alt: "Underside of the L3 showing the quick-release squeegee and brush assembly",
      },
      workstation: {
        src: l3Workstation,
        alt: "WS3 workstation for autonomous charging and water exchange",
      },
    },
  },

  l4: {
    hero: l4Hero,
    // Only bites on narrow viewports, where object-cover crops width: keeps
    // the frame off the brightest stretch of wall so the headline holds a
    // dark ground. On desktop the container is wider than 16:9 and the whole
    // frame shows.
    heroClass: "object-[42%_center]",
    // Trimmed from l4-product.png, whose canvas is two-thirds empty — see
    // scripts/build-fleet-cutout.mjs. Trimmed, the slot width is the machine
    // width, so this sizes and sits predictably.
    heroForeground: {
      src: l4HeroRobot,
      alt: "L4 edge-cleaning floor scrubber",
    },
    heroForegroundClass:
      "pointer-events-none absolute bottom-7 right-4 z-0 hidden w-[30%] max-w-[16rem] sm:block lg:right-[max(1.5rem,calc(50%-36rem))] lg:max-w-xs",
    product: l4Product,
    features: {
      lidar: {
        src: l4Lidar,
        alt: "L4 projecting its 3D LiDAR field onto surrounding surfaces while mapping a space",
      },
      app: {
        src: l4App,
        alt: "Completed-run report in the AI Robotics app: route map, 97.8% coverage, water use and cleaning time",
      },
      workstation: {
        src: l4WorkstationPair,
        alt: "L4 docked beside its 4-in-1 workstation for autonomous refill, discharge and charging",
      },
    },
  },

  l50: {
    hero: l50Hero,
    // Only bites on narrow viewports, where object-cover crops width: holds
    // the frame on the dark end of the aisle so the headline keeps a ground,
    // while still showing where the racking begins. On desktop the container
    // is wider than 16:9 and the whole frame shows.
    heroClass: "object-[40%_center]",
    // Front render in the hero; the 3/4 view stays on the cards. Its canvas
    // carries a wide transparent margin — 43px of it below the wheels — so
    // the slot is a size up to land the machine at a comparable width, and
    // the negative bottom offset cancels that margin so it meets the floor.
    heroForeground: {
      src: l50Front,
      alt: "L50 high-capacity industrial scrubber, seen head-on",
    },
    heroForegroundClass:
      "pointer-events-none absolute -bottom-9 right-4 z-0 hidden w-[36%] max-w-sm sm:block lg:right-[max(1.5rem,calc(50%-36rem))] lg:max-w-[26rem]",
    product: l50Product,
    features: {
      console: {
        src: l50Console,
        alt: "L50 onboard console showing a full-clean task at 34% with pause, stop and dispatch controls",
      },
      safety: {
        src: l50Safety,
        alt: "Top-down view of the L50 sensor head: 150 m detection range, protruding-object and glass detection",
      },
      app: {
        src: l50App,
        alt: "Completed-run report in the AI Robotics app: route map, coverage, water use and cleaning time",
      },
      workstation: {
        src: l50Cws,
        alt: "CWS workstation with docking fiducials for autonomous water refill and discharge",
      },
    },
    scenes: [
      { src: l50SceneRetail, alt: "Food-court retail concourse", label: "Retail" },
      { src: l50SceneHospitals, alt: "Hospital corridor", label: "Hospitals" },
      { src: l50SceneHotels, alt: "Hotel lobby", label: "Hotels" },
      { src: l50SceneEducation, alt: "University hallway", label: "Education" },
    ],
  },

  c5: {
    // no wide banner shot — the cutout carries the hero against the graphite ground
    heroForeground: {
      src: c5Pair,
      alt: "C5 3-in-1 cleaning machine beside its self-cleaning workstation",
    },
    heroForegroundClass:
      "pointer-events-none absolute bottom-0 right-0 z-0 hidden w-[58%] max-w-2xl opacity-95 sm:block lg:right-4",
    product: c5Product,
    features: {
      workstation: {
        src: c5Workstation,
        alt: "C5 workstation, which refills, drains and flushes the robot's sewage tank",
      },
    },
  },

  sp50: {
    hero: sp50Hero,
    // Only bites on narrow viewports, where object-cover crops width: pulls
    // the frame off the lit shopfronts so the headline keeps a dark ground.
    // On desktop the container is wider than 16:9 and the whole frame shows.
    heroClass: "object-[38%_center]",
    // The 3/4 render reads better at hero size than the flat front view,
    // which stays on the cards.
    heroForeground: {
      src: sp50Banner,
      alt: "SP50 AI spot-cleaning robot, three-quarter view with its twin side brushes extended",
    },
    // Pinned to the right edge of the 6xl content column rather than the
    // viewport. Every other machine has a photo behind it, so a cutout hard
    // against the window edge reads as part of the scene; the SP50 has none,
    // and out there it just looked stranded in the corner.
    heroForegroundClass:
      // The canvas carries 208px of empty space below the brushes — 78px of
      // it at the lg slot — which read as the machine hovering. The negative
      // offsets cancel most of that, leaving a little floor under the wheels
      // rather than dropping it onto the hazard stripe. Two values because
      // the margin scales with the slot.
      "pointer-events-none absolute -bottom-12 right-4 z-0 hidden w-[38%] max-w-sm sm:block lg:right-[max(1.5rem,calc(50%-36rem))] lg:-bottom-14 lg:max-w-md",
    product: sp50Product,
    features: {
      console: {
        src: sp50Console,
        alt: "SP50 onboard console showing a vacuum-and-mop task at 100% with continue, end and return-to-dock controls",
      },
      workstation: {
        src: sp50Workstation,
        alt: "CCS-02 workstation with docking fiducials, where the SP50 charges and empties",
      },
      insitu: {
        src: sp50InSitu,
        alt: "SP50 sweeping a retail concourse, glass shopfronts and seating behind it",
      },
    },
  },

  s5: {
    hero: s5Warehouse,
    heroClass: "object-center",
    heroForeground: {
      src: s5HeroRobot,
      alt: "S5 industrial sweeper with twin side brushes and amber beacon",
    },
    // Same three-quarter render on the cards: the S5 has no separate product
    // cut-out, and this one reads clearly at card size.
    product: s5HeroRobot,
    features: {
      teamclean: {
        src: s5TeamClean,
        alt: "Several S5 sweepers dividing one warehouse floor as a coordinated fleet",
      },
      vehicle: {
        src: s5Vehicle,
        alt: "S5 recognising and yielding to a forklift crossing its route",
      },
      dust: {
        src: s5Dust,
        alt: "S5 sweeping fine dust and coarse debris with sealed dust control",
      },
      maintenance: {
        src: s5Maintenance,
        alt: "S5 debris hopper removed for emptying without tools",
      },
      station: {
        src: s5Station,
        alt: "S5 charging station with docking fiducials in a white corridor",
      },
    },
  },

  v3: {
    // The corridor shot widened to the left in the ink ground (feathered
    // seam), so the machine sits in the right third like the other heroes
    // and the headline has a dark field. On narrow viewports object-cover
    // crops width, so the frame is held on the machine.
    hero: v3Hero,
    heroClass: "object-[78%_center]",
    product: v3Product,
    features: {
      pickup: {
        src: v3Pickup,
        alt: "V3 sweeping tissues and coffee beans off a hotel lobby floor, at the edge of a rug",
      },
      dock: {
        src: v3Dock,
        alt: "V3 backed into its charging dock against a corridor wall",
      },
    },
  },
};

/** Homepage hero — an empty distribution aisle at night, floor freshly scrubbed.
 *  Deliberately has no machine in it: the clean, empty building is the pitch. */
export { homeHeroWarehouse as homeHero };
