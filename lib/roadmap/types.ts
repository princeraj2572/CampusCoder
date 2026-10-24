export interface RoadmapLink {
  label: string;
  href: string;
  /** What to use it for. */
  note?: string;
}

export interface RoadmapSection {
  heading: string;
  paragraphs?: string[];
  steps?: string[];
  bullets?: string[];
  links?: RoadmapLink[];
  table?: { head: string[]; rows: string[][] };
  qa?: { q: string; a: string }[];
}

export interface RoadmapPage {
  /** URL segment under /roadmap. The start page has an empty slug. */
  slug: string;
  /** Short label for the page switcher. */
  label: string;
  title: string;
  intro: string;
  sections: RoadmapSection[];
}
