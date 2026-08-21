import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { certifications } from "../data/certifications";
import CertificationLogo from "./CertificationLogo";

const Certification = () => {
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(true);

  const handleListScroll = (event) => {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;
    setShowTopFade(scrollTop > 0);
    setShowBottomFade(scrollTop + clientHeight < scrollHeight - 1);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-white px-4 pb-4 pt-24 sm:px-6 lg:px-12 lg:pt-24">
      <div className="container mx-auto flex h-full min-h-0 flex-col">
        {/* <header className="shrink-0 text-center">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Certification</h1>  
          <div className="mt-8 h-px w-full bg-slate-200" />
        </header> */}

        <div className="relative mx-auto min-h-0 w-full max-w-4xl flex-1">
          <div
            onScroll={handleListScroll}
            className="h-full overflow-y-auto pr-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb:hover]:bg-slate-300"
            style={{ scrollbarColor: "#cbd5e1 transparent" }}
          >
            <div className="space-y-3 pb-3">
              {certifications.map((certification) => (
                <article
                  key={certification.id}
                  className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md sm:p-4"
                >
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:flex sm:flex-row sm:items-center">
                    <CertificationLogo certification={certification} className="h-14 w-14 sm:h-16 sm:w-16" />

                    <div className="min-w-0 flex-1">
                      <h2 className="text-base font-bold leading-tight text-slate-900 sm:text-lg">
                        {certification.title}
                      </h2>
                      <p className="mt-1 flex items-start gap-2 text-xs font-medium text-slate-500 sm:text-sm">
                        <span>{certification.issuer}</span>
                      </p>
                    </div>

                    <div className="col-span-2 flex w-full shrink-0 sm:ml-auto sm:w-auto">
                      <Link
                        to={`/certification/${certification.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-600 px-3 py-2 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white sm:w-auto sm:px-4 sm:text-sm"
                      >
                        Details
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {showTopFade && (
            <div className="pointer-events-none absolute left-0 right-4 top-0 h-12 bg-gradient-to-b from-white via-white/90 to-transparent" />
          )}
          {showBottomFade && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-4 h-12 bg-gradient-to-t from-white via-white/90 to-transparent" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Certification;
