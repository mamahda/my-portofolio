import { useCallback, useRef, useState } from "react";
import { ArrowUpRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { cvs } from "../../data/cv";
import { CvDialogContext } from "../../hooks/useCvDialog";
import { button, tabPanelProps } from "../../lib/ui";
import { Tabs } from "../profile/SkillsSection";
import Modal from "../ui/Modal";

const labels = cvs.map((cv) => cv.label);

/* One CV dialog for the whole site. Every "View CV" control calls useCvDialog() to open it,
   so menus can close themselves without unmounting the dialog. Pages are shown as images
   because mobile browsers don't render PDFs inside an iframe. */
const CvDialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(labels[0]);
  const panelRef = useRef(null);
  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);
  const cv = cvs.find((item) => item.label === active);

  const select = (label) => {
    setActive(label);
    panelRef.current?.parentElement?.scrollTo({ top: 0 });
  };

  return (
    <CvDialogContext.Provider value={show}>
      {children}
      <Modal open={open} onClose={hide} title="Curriculum vitae" className="max-w-3xl">
        <div className="sticky top-0 z-10 border-b border-line-strong bg-ink-900 px-5 pb-3 pt-3.5 light:bg-white">
          <Tabs id="cv" label="CV version" tabs={labels} value={active} onChange={select} layoutId="cv-tab" controlsPanel />
          <div className="mt-3 flex items-center gap-2">
            <p className="min-w-0 flex-1 truncate text-xs text-zinc-500">{cv.note}</p>
            <a href={cv.file} target="_blank" rel="noopener noreferrer" className={button("outline", "px-3 py-1.5")}>
              Open <ArrowUpRightIcon size={13} weight="bold" />
            </a>
            <a href={cv.file} download className={button("primary", "px-3 py-1.5")}>
              <DownloadSimpleIcon size={15} weight="bold" /> Download
            </a>
          </div>
        </div>
        <div ref={panelRef} {...tabPanelProps("cv", labels, active)} className="space-y-4 p-4 sm:p-5">
          {cv.pages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`${cv.label} CV, page ${index + 1} of ${cv.pages.length}`}
              width={1275}
              height={1650}
              className="h-auto w-full rounded-md bg-white ring-1 ring-tint/10"
            />
          ))}
        </div>
      </Modal>
    </CvDialogContext.Provider>
  );
};

export default CvDialogProvider;
