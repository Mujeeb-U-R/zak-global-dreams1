export const SPECIAL_OFFERS_IMAGES = [
  "/news/Special1.jpeg",
  "/news/Special2.jpeg",
  "/news/Special3.jpeg",
  "/news/Special4.jpeg",
  "/news/Special5.jpeg",
];

export const GROUP_TOURS_IMAGES = [
  "/news/Group1.jpeg",
  "/news/Group2.jpeg",
  "/news/Group3.jpeg",
  "/news/Group4.jpeg",
  "/news/Group5.jpeg",
];

export const WORK_PERMIT_IMAGES = [
  "/news/WorkPermit1.jpeg",
];

export const STUDY_VISA_IMAGES = [
  "/news/Study1.jpeg",
  "/news/Study2.jpeg",
  "/news/Study3.jpeg",
];

// Combine them if your homepage slideshow wants to cycle through all of them
export const ALL_NEWS_IMAGES = [
  ...SPECIAL_OFFERS_IMAGES,
  ...GROUP_TOURS_IMAGES,
  ...WORK_PERMIT_IMAGES,
  ...STUDY_VISA_IMAGES
];