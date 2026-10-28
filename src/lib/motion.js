export const spring = { type: "spring", stiffness: 100, damping: 20 };
export const snappy = { type: "spring", stiffness: 420, damping: 34 };

export const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  // No negative margin: a section peeking in at the bottom of the screen must reveal right away,
  // otherwise it sits invisible until the visitor scrolls.
  viewport: { once: true, amount: "some" },
  transition: spring,
};

/* For sections right under the profile header: animate on mount instead of waiting to be scrolled into view. */
export const enter = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { ...spring, delay: 0.15 },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

export const rise = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: spring },
};
