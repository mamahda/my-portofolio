/* Each entry is one organisation with one or more roles, shown newest first.
   - end:    "YYYY-MM", or null while the role is current
   - type:   optional, e.g. "Internship"
   - points: optional bullet list of what the role involved
   - skills: optional tags shown under the role */
export const experience = [
  {
    org: "Networking Technology & Intelligent Cybersecurity Laboratory",
    roles: [
      {
        title: "Laboratory Administrator",
        start: "2026-06",
        end: null,
      },
    ],
  },
  {
    org: "Institut Teknologi Sepuluh Nopember (ITS)",
    roles: [
      {
        title: "Teaching Assistant – Operating Systems & Computer Networks",
        start: "2026-01",
        end: null,
      },
    ],
  },
  {
    org: "IRIS ITS Robotics Team",
    location: "Surabaya, East Java, Indonesia",
    roles: [
      {
        title: "Programmer Intern",
        type: "Internship",
        start: "2024-10",
        end: "2024-11",
      },
    ],
  },
];
