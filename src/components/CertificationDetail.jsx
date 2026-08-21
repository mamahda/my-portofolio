import { ArrowLeft, Award } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { certifications } from "../data/certifications";
import CertificationLogo from "./CertificationLogo";

const CertificationDetail = () => {
  const { certificationId } = useParams();
  const certification = certifications.find((item) => item.id === certificationId);

  if (!certification) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">Certification not found</h1>
          <Link to="/certification" className="mt-6 inline-flex text-blue-600 hover:underline">
            Back to Certification
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 pb-8 pt-12 sm:px-6 lg:px-12 lg:pt-24">
      <div className="container mx-auto max-w-6xl">
        <Link
          to="/certification"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to Certification
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex min-h-[20rem] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center sm:min-h-[30rem]">
              {certification.scan ? (
                <img src={certification.scan} alt={`${certification.title} scan`} className="max-h-full max-w-full object-contain" />
              ) : (
                <div className="text-slate-400">
                  <Award size={48} className="mx-auto mb-3 text-blue-300" />
                  <p className="font-semibold">Certificate scan placeholder</p>
                  <p className="mt-1 text-sm">Add the scanned certificate path in the certification data.</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <CertificationLogo certification={certification} className="h-24 w-24 rounded-2xl text-sm" />
            <h1 className="mt-6 text-3xl font-bold leading-tight text-slate-900">{certification.title}</h1>
            <p className="mt-3 flex items-start gap-2 font-medium text-slate-500">
              {/* <Award size={20} className="mt-0.5 shrink-0 text-blue-600" /> */}
              {certification.issuer}
            </p>
            <p className="mt-6 leading-relaxed text-slate-600">{certification.description}</p>

            <dl className="mt-8 space-y-4 border-t border-slate-200 pt-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Field</dt>
                <dd className="text-right font-semibold text-blue-600">{certification.field}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Issued</dt>
                <dd className="font-semibold text-slate-800">{certification.year}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Credential code</dt>
                <dd className="font-mono font-semibold text-slate-800">{certification.code}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationDetail;
