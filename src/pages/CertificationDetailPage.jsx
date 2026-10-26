import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowsOutIcon, ArrowUpRightIcon, CertificateIcon, CheckIcon, CopyIcon } from "@phosphor-icons/react";
import CertificationLogo from "../components/CertificationLogo";
import PageShell from "../components/layout/PageShell";
import { AsideBlock } from "../components/layout/SidebarCards";
import SubPageHeader from "../components/layout/SubPageHeader";
import Img from "../components/ui/Img";
import Modal from "../components/ui/Modal";
import TagList from "../components/ui/Tag";
import { certifications } from "../data/certifications";
import useCopy from "../hooks/useCopy";
import { spring } from "../lib/motion";
import { button, iconButton } from "../lib/ui";

const NotFound = () => (
  <section className="border-t border-line py-14 text-center">
    <CertificateIcon size={36} className="mx-auto text-zinc-600" />
    <p className="mt-3 text-lg font-medium">This credential does not exist</p>
    <p className="mt-1 text-sm text-zinc-500">The link may be outdated, or the certificate was removed.</p>
    <Link to="/certification" className={button("outline", "mt-5")}>
      See all certifications
    </Link>
  </section>
);

const Fact = ({ label, children }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-0">
    <dt className="shrink-0 text-xs text-zinc-500">{label}</dt>
    <dd className="min-w-0 text-right text-sm text-zinc-100">{children}</dd>
  </div>
);

const CredentialAside = ({ certification, onZoom }) => {
  const [copied, copy] = useCopy();
  const others = certifications.filter((item) => item.id !== certification.id);

  return (
    <>
      <AsideBlock title="Credential" first>
        <dl>
          <Fact label="Issuer">{certification.issuer}</Fact>
          <Fact label="Field">{certification.field}</Fact>
          <Fact label="Issued">
            <span className="font-mono">{certification.year}</span>
          </Fact>
          <Fact label="Expires">Never</Fact>
        </dl>
        <div className="mt-3 rounded-lg bg-white/[0.03] p-3 ring-1 ring-inset ring-white/[0.06]">
          <p className="text-xs text-zinc-500">Credential ID</p>
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="min-w-0 break-all font-mono text-[12.5px] text-zinc-100">{certification.code}</span>
            <button
              type="button"
              onClick={() => copy(certification.code, "code")}
              aria-label="Copy credential ID"
              className={`${iconButton} size-7`}
            >
              {copied === "code" ? <CheckIcon size={14} className="text-accent" /> : <CopyIcon size={14} />}
            </button>
          </div>
        </div>
        <div className="mt-4 grid gap-2">
          {certification.verifyUrl && (
            <a href={certification.verifyUrl} target="_blank" rel="noopener noreferrer" className={button("primary", "py-2")}>
              Verify on {certification.verifyPlatform ?? certification.issuer}
              <ArrowUpRightIcon size={15} weight="bold" />
            </a>
          )}
          <button type="button" onClick={onZoom} className={button("outline", "py-2")}>
            <ArrowsOutIcon size={15} /> View full size
          </button>
        </div>
      </AsideBlock>

      {others.length > 0 && (
        <AsideBlock title="Other credentials">
          <ul className="space-y-3">
            {others.map((item) => (
              <li key={item.id}>
                <Link to={`/certification/${item.id}`} className="group flex items-center gap-3">
                  <CertificationLogo certification={item} className="size-9" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-zinc-100 transition-colors group-hover:text-accent">
                      {item.title}
                    </span>
                    <span className="block text-xs text-zinc-500">
                      {item.issuer} · {item.year}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </AsideBlock>
      )}
    </>
  );
};

const CertificationDetailPage = () => {
  const { certificationId } = useParams();
  const certification = certifications.find((item) => item.id === certificationId);
  const [zoom, setZoom] = useState(false);

  return (
    <PageShell
      aside={
        certification ? (
          <CredentialAside certification={certification} onZoom={() => setZoom(true)} />
        ) : (
          <AsideBlock title="Browse" first>
            <Link to="/certification" className="text-sm text-zinc-300 transition-colors hover:text-accent">
              All certifications
            </Link>
          </AsideBlock>
        )
      }
    >
      <SubPageHeader
        eyebrow={certification ? `${certification.issuer} credential` : "Credential"}
        title={certification ? certification.title : "Not found"}
        back="/certification"
        backLabel="All certifications"
      />

      {!certification ? (
        <NotFound />
      ) : (
        <motion.article key={certification.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
          <button
            type="button"
            onClick={() => setZoom(true)}
            className="group relative block w-full overflow-hidden rounded-2xl bg-ink-900 p-4 ring-1 ring-inset ring-white/[0.06] sm:p-6"
            aria-label="Enlarge certificate"
          >
            <div className="bg-dot-grid absolute inset-0 opacity-40" />
            <Img
              src={certification.scan}
              alt={`${certification.title} scan`}
              fit="contain"
              className="relative mx-auto aspect-[4/3] w-full rounded-lg bg-transparent"
              imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
            />
            <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-ink-950/80 px-3 py-1.5 text-xs text-zinc-200 opacity-0 ring-1 ring-white/10 backdrop-blur transition-opacity group-hover:opacity-100">
              <ArrowsOutIcon size={13} weight="bold" /> Enlarge
            </span>
          </button>

          <div className="mt-8 flex gap-4">
            <CertificationLogo certification={certification} className="size-12" />
            <div className="min-w-0">
              <p className="text-base font-medium text-zinc-100">{certification.issuer}</p>
              <p className="text-sm text-zinc-500">Issued {certification.year} · No expiration date</p>
            </div>
          </div>

          <p className="mt-5 max-w-[65ch] text-[15px] leading-relaxed text-zinc-300">{certification.description}</p>

          {certification.skills?.length > 0 && <TagList items={certification.skills} className="mt-4" />}

          <Modal open={zoom} onClose={() => setZoom(false)} title={certification.title} className="max-w-5xl">
            <div className="p-3 sm:p-5">
              <img src={certification.scan} alt={`${certification.title} scan`} className="mx-auto w-full rounded-md" />
            </div>
          </Modal>
        </motion.article>
      )}
    </PageShell>
  );
};

export default CertificationDetailPage;
