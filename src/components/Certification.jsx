import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { certifications } from "../data/certifications";
import CertificationLogo from "./CertificationLogo";

const Certification = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-white px-4 pb-8 pt-24 sm:px-6 lg:px-12">
      <div className="container mx-auto flex h-full min-h-0 flex-col">
        <header className="shrink-0 text-center">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Certification</h1>
          <div className="mt-8 h-px w-full bg-slate-200" />
        </header>

        <div className="mx-auto mt-5 min-h-0 w-[60%] max-w-6xl flex-1 overflow-y-auto pr-1 sm:mt-6 sm:pr-2">
          <div className="space-y-3 pb-3">
            {certifications.map((certification) => (
              <article
                key={certification.id}
                className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md sm:p-4"
              >
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <CertificationLogo certification={certification} className="h-14 w-14 sm:h-16 sm:w-16" />

                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-bold leading-tight text-slate-900 sm:text-lg">
                      {certification.title}
                    </h2>
                    <p className="mt-1 flex items-start gap-2 text-xs font-medium text-slate-500 sm:text-sm">
                      <span>{certification.issuer}</span>
                    </p>
                  </div>

                  <div className="flex w-full shrink-0 px-4 items-center justify-between gap-3 sm:w-auto sm:justify-end">
                    <span className="text-sm font-semibold text-slate-400">{certification.year}</span>
                    <Link
                      to={`/certification/${certification.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-600 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white sm:px-4 sm:py-2 sm:text-sm"
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
      </div>
    </section>
  );
};

export default Certification;
