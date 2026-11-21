import { useCallback, useState } from "react";
import { DownloadSimpleIcon, FileTextIcon } from "@phosphor-icons/react";
import { cvs } from "../../data/cv";
import { CvDialogContext } from "../../hooks/useCvDialog";
import { button } from "../../lib/ui";
import Modal from "../ui/Modal";

/* One CV dialog for the whole site. Every "View CV" control calls useCvDialog() to open it,
   so menus can close themselves without unmounting the dialog. */
const CvDialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  return (
    <CvDialogContext.Provider value={show}>
      {children}
      <Modal open={open} onClose={hide} title="Curriculum vitae" className="max-w-lg">
        <ul className="divide-y divide-line-strong">
          {cvs.map((cv) => (
            <li key={cv.id} className="flex items-center gap-4 px-5 py-3.5">
              <FileTextIcon size={20} className="shrink-0 text-zinc-500" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-100">{cv.label}</p>
                <p className="truncate text-xs text-zinc-500">{cv.note}</p>
              </div>
              <a href={cv.file} target="_blank" rel="noopener noreferrer" className={button("outline", "px-3 py-1.5")}>
                View
              </a>
              <a
                href={cv.file}
                download
                aria-label={`Download the ${cv.label} CV`}
                className={button("primary", "px-3 py-1.5")}
              >
                <DownloadSimpleIcon size={15} weight="bold" />
                <span className="hidden sm:inline">Download</span>
              </a>
            </li>
          ))}
        </ul>
      </Modal>
    </CvDialogContext.Provider>
  );
};

export default CvDialogProvider;
