/* One entry per CV version. The PDFs and their page previews (rendered at 150 dpi) live in
   public/cv; the TeX sources are in /cv at the repo root. */
export const cvs = [
  {
    id: "general",
    label: "General",
    note: "Complete version, 2 pages",
    file: "/cv/Gilbran-Mahda-CV-General.pdf",
    pages: ["/cv/preview/general-1.webp", "/cv/preview/general-2.webp"],
  },
  {
    id: "backend",
    label: "Backend",
    note: "Backend and software roles",
    file: "/cv/Gilbran-Mahda-CV-Backend.pdf",
    pages: ["/cv/preview/backend-1.webp"],
  },
  {
    id: "infra",
    label: "Infrastructure",
    note: "Infrastructure and DevOps roles",
    file: "/cv/Gilbran-Mahda-CV-Infrastructure.pdf",
    pages: ["/cv/preview/infra-1.webp"],
  },
  {
    id: "l1",
    label: "SOC L1",
    note: "Security operations (SOC) L1 roles",
    file: "/cv/Gilbran-Mahda-CV-SOC-L1.pdf",
    pages: ["/cv/preview/l1-1.webp"],
  },
];
