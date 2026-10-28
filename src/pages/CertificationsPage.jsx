import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "../components/layout/PageShell";
import { AsideBlock, FacetList, StatGrid } from "../components/layout/SidebarCards";
import SubPageHeader from "../components/layout/SubPageHeader";
import CertificationItem from "../components/profile/CertificationItem";
import { bleed } from "../components/ui/Section";
import { certifications } from "../data/certifications";
import { snappy } from "../lib/motion";

const countBy = (values) => {
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return [...counts].map(([value, count]) => ({ value, label: value, count }));
};

const issuers = countBy(certifications.map((item) => item.issuer));
const fields = countBy(certifications.map((item) => item.field));
const years = certifications.map((item) => Number(item.year)).filter(Boolean);

const stats = [
  { label: "Credentials", value: certifications.length },
  { label: "Issuers", value: issuers.length },
  { label: "Verifiable", value: certifications.filter((item) => item.verifyUrl).length },
  { label: "Latest", value: years.length ? Math.max(...years) : "-" },
];

const CertificationsPage = () => {
  const [issuer, setIssuer] = useState(null);
  const [field, setField] = useState(null);

  const list = useMemo(
    () => certifications.filter((item) => (!issuer || item.issuer === issuer) && (!field || item.field === field)),
    [issuer, field],
  );

  return (
    <PageShell
      aside={
        <>
          <AsideBlock title="Overview" first>
            <StatGrid stats={stats} />
          </AsideBlock>
          <AsideBlock title="Issuer">
            <FacetList items={issuers} active={issuer} onSelect={setIssuer} allLabel="All issuers" />
          </AsideBlock>
          <AsideBlock title="Field">
            <FacetList items={fields} active={field} onSelect={setField} allLabel="All fields" />
          </AsideBlock>
        </>
      }
    >
      <div className={bleed}>
        <SubPageHeader eyebrow={`${certifications.length} credentials`} title="Certifications" />

        {certifications.length === 0 ? (
          <div className="border-t border-line py-14 text-center">
            <p className="font-medium">No certifications yet</p>
            <p className="mt-1 text-sm text-zinc-500">
              Add an entry to <span className="font-mono">src/data/certifications.js</span> and it will show up here.
            </p>
          </div>
        ) : (
          <>
            <motion.ul layout className="border-t border-line">
              <AnimatePresence initial={false} mode="popLayout">
                {list.map((certification, index) => (
                  <motion.li
                    layout
                    key={certification.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0, transition: { ...snappy, delay: index * 0.05 } }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    className="border-b border-line py-7"
                  >
                    <CertificationItem certification={certification} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
            {list.length === 0 && (
              <p className="py-14 text-center text-sm text-zinc-500">No credential matches this issuer and field.</p>
            )}
          </>
        )}
      </div>
    </PageShell>
  );
};

export default CertificationsPage;
