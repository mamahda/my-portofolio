import { GraduationCap, MapPin } from "lucide-react";
import { interests } from "../data/interests";

const About = () => {
  return (
    <section className="min-h-screen bg-white px-4 py-24 sm:px-8 lg:h-screen lg:overflow-hidden lg:px-16 lg:py-32">
      <div className="mx-auto flex min-h-full max-w-7xl flex-col">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:items-stretch lg:min-h-0 lg:flex-1">
          <article className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <div>
              <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:items-center sm:text-left">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-full bg-blue-200 blur-xl" />
                  <img
                    src="/images/myphoto.jpeg"
                    alt="Gilbran Mahda"
                    className="relative h-36 w-36 rounded-full border-4 border-white object-cover shadow-lg sm:h-40 sm:w-40"
                  />
                </div>
                <div className="flex h-full flex-col justify-center">
                  <h2 className="text-2xl font-bold text-slate-900">Gilbran Mahda</h2>
                  <p className="mt-1 font-medium text-blue-600">Informatics Engineering Student</p>
                  <p className="mt-2 flex items-center justify-center gap-1 text-sm text-slate-500 sm:justify-start">
                    <MapPin size={15} /> Surabaya, Indonesia
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4 text-base leading-relaxed text-slate-600">
                <p>
                  I am an Informatics Engineering student at Institut Teknologi Sepuluh Nopember
                  (ITS) with a strong interest in Backend Engineering, DevOps, Networking, and
                  Cybersecurity. I enjoy building reliable systems, automating workflows, and
                  exploring secure infrastructure technologies.
                </p>
                <p>
                  My workflow revolves around <strong>CachyOS</strong> and <strong>Neovim</strong>,
                  allowing me to build robust Backend systems and secure networks efficiently.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <GraduationCap size={25} />
                </div>
                <div>
                  {/* <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Education</p> */}
                  <h3 className="mt-0 text-lg font-bold leading-snug text-slate-900">
                    Institut Teknologi Sepuluh Nopember (ITS)
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">Informatics Engineering · 2024 - present</p>
                </div>
              </div>
            </div>
          </article>

          <section className="flex h-full min-h-0 flex-col">
            <h2 className="mb-6 text-center text-3xl font-bold text-slate-900">Interest Field</h2>
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 sm:grid-rows-2">
              {interests.map((interest) => (
                <article
                  key={interest.title}
                  className="flex h-full flex-row items-center rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:flex-col sm:items-center sm:p-8 sm:text-center"
                >
                  <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:mb-6 sm:mr-0 sm:h-14 sm:w-14">
                    {interest.icon}
                  </div>
                  <div className="sm:contents">
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">{interest.title}</h3>
                    <p className="hidden sm:mt-3 sm:block sm:w-full sm:text-left sm:text-sm sm:leading-relaxed sm:text-slate-500">
                      {interest.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default About;
