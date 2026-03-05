export type ProjectContent = {
  slug: string;
  name: string;
  headline: string;
  location: string;
  srd: string;
  formId: string;
  campaignName: string;
  subSource: string;
  source: string;
  launchPrice: string;
  postLaunchPrice: string;
  savings: string;
  tagline: string;
  chips: string[];
  pixelId: string;
};

export const projects: Record<string, ProjectContent> = {
  secura: {
    slug: "secura",
    name: "DRA Secura",
    headline: "Plots with LOTS!",
    location: "Near Poonamallee – Bang on Outer Ring Road",
    srd: "69a5388ee114870948f05f6a",
    formId: "69a53914a3d855d7289e0722",
    campaignName: "DRA Secura - WALK-St NRI Google",
    subSource: "DRA Secura - WALK-St NRI Google",
    source: "Website",
    launchPrice: "₹4,799/sq.ft",
    postLaunchPrice: "₹4,999/sq.ft",
    savings: "Save up to ₹5 Lakhs*",
    tagline: "Lots of Prosperity, Potential & Pride",
    chips: [
      "5 Km from Poonamallee Metro",
      "Bang on ORR",
      "1143 - 2372 Sq.ft",
      "Grand Entrance Arch",
    ],
    pixelId: "1852333405356715",
  },
  inara: {
    slug: "inara",
    name: "DRA Inara",
    headline: "COME HOME TO QUIET LUXURY!",
    location: "",
    srd: "69a538e1e11487ea6d58b653",
    formId: "69a53946940368a66ae44b27",
    campaignName: "DRA INARA - WALK-St NRI Google",
    subSource: "DRA INARA - WALK-St NRI Google",
    source: "Website",
    launchPrice: "2701Sq.ft to 3103Sq.ft",
    postLaunchPrice: "(All Incl) + Govt. Levies*",
    savings: "Occupy",
    tagline: "",
    chips: [],
    pixelId: "1852333405356715",
  },
  securari: {
    slug: "securari",
    name: "DRA Secura",
    headline: "Plots with LOTS!",
    location: "Near Poonamallee – Bang on Outer Ring Road",
    srd: "69a68e43735daf82ae347e85",
    formId: "69a53914a3d855d7289e0722",
    campaignName: "DRA Secura - Red Circles RI Meta",
    subSource: "DRA Secura - Red Circles RI Meta",
    source: "Website",
    launchPrice: "₹4,799/sq.ft",
    postLaunchPrice: "₹4,999/sq.ft",
    savings: "Save up to ₹5 Lakhs*",
    tagline: "Lots of Prosperity, Potential & Pride",
    chips: [
      "5 Km from Poonamallee Metro",
      "Bang on ORR",
      "1143 - 2372 Sq.ft",
      "Grand Entrance Arch",
    ],
    pixelId: "25670356619305148",
  },
};

export function getProjectBySlug(slug: string) {
  return projects[slug];
}
