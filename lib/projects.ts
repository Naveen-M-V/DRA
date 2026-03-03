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
  },
  inara: {
    slug: "inara",
    name: "DRA Inara",
    headline: "COME HOME TO QUIET LUXURY!",
    location: "Luxury 5 BHK Villas | 2701-3103 Sq.ft",
    srd: "69a538e1e11487ea6d58b653",
    formId: "69a53946940368a66ae44b27",
    campaignName: "DRA INARA - WALK-St NRI Google",
    subSource: "DRA INARA - WALK-St NRI Google",
    source: "Website",
    launchPrice: "₹2.90 Cr",
    postLaunchPrice: "₹3.10 Cr",
    savings: "All Incl + Govt. Levies*",
    tagline: "Ready to Occupy | Premium Gated Community",
    chips: [
      "Luxury 5 BHK Villas",
      "Ready to Occupy",
      "All Incl + Govt. Levies",
      "Premium Gated Community",
    ],
  },
};

export function getProjectBySlug(slug: string) {
  return projects[slug];
}
