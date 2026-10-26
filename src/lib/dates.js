const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const parse = (value) => {
  if (!value) {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }
  const [year, month] = value.split("-").map(Number);
  return { year, month: month - 1 };
};

export const formatMonth = (value) => {
  if (!value) return "Present";
  const { year, month } = parse(value);
  return `${MONTHS[month]} ${year}`;
};

export const formatRange = (start, end) => `${formatMonth(start)} - ${formatMonth(end)}`;

/* Counts both the start and end month, matching how LinkedIn reports tenure. */
export const monthsBetween = (start, end) => {
  const from = parse(start);
  const to = parse(end);
  return Math.max(1, (to.year - from.year) * 12 + (to.month - from.month) + 1);
};

export const formatDuration = (months) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ");
};

export const tenure = (start, end) => formatDuration(monthsBetween(start, end));

export const groupTenure = (roles) => {
  const starts = roles.map((role) => role.start).sort();
  const current = roles.some((role) => !role.end);
  const ends = roles.map((role) => role.end).filter(Boolean).sort();
  return tenure(starts[0], current ? null : ends[ends.length - 1]);
};
