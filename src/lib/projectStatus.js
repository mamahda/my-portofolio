/* Single source of truth for project status badges - add a key here instead of
   matching magic strings wherever a status is displayed. */
export const PROJECT_STATUS = {
  live: { label: "Live", dot: "bg-accent" },
  "in-progress": { label: "In Progress", dot: "bg-amber-300" },
  "not-deployed": { label: "Not Deployed", dot: "bg-zinc-500" },
};

export const projectStatus = (project) => PROJECT_STATUS[project.status] ?? PROJECT_STATUS["not-deployed"];
