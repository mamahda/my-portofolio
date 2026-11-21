import { createContext, useContext } from "react";

/* Holds the function that opens the site-wide CV dialog (see CvDialogProvider). */
export const CvDialogContext = createContext(() => {});

export const useCvDialog = () => useContext(CvDialogContext);
