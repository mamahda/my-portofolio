import { CheckIcon, CopyIcon, EnvelopeSimpleIcon, FileTextIcon, GlobeIcon } from "@phosphor-icons/react";
import useCopy from "../../hooks/useCopy";
import { profile } from "../../data/profile";
import { hostOf, iconButton } from "../../lib/ui";
import Modal from "../ui/Modal";

const Row = ({ icon: Icon, label, value, href, copyValue, copied, onCopy }) => (
  <li className="flex items-center gap-4 px-5 py-3">
    <Icon size={20} className="shrink-0 text-zinc-500" />
    <div className="min-w-0 flex-1">
      <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">{label}</p>
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="block truncate text-sm text-zinc-100 transition-colors hover:text-accent"
      >
        {value}
      </a>
    </div>
    {copyValue && (
      <button type="button" onClick={() => onCopy(copyValue, label)} aria-label={`Copy ${label}`} className={iconButton}>
        {copied === label ? <CheckIcon size={16} className="text-accent" /> : <CopyIcon size={16} />}
      </button>
    )}
  </li>
);

const ContactInfoModal = ({ open, onClose }) => {
  const [copied, copy] = useCopy();

  return (
    <Modal open={open} onClose={onClose} title="Contact info">
      <ul className="py-2">
        <Row
          icon={GlobeIcon}
          label="Portfolio"
          value={hostOf(profile.site)}
          href={profile.site}
          copyValue={profile.site}
          copied={copied}
          onCopy={copy}
        />
        <Row
          icon={EnvelopeSimpleIcon}
          label="Email"
          value={profile.email}
          href={`mailto:${profile.email}`}
          copyValue={profile.email}
          copied={copied}
          onCopy={copy}
        />
        <Row icon={FileTextIcon} label="Curriculum Vitae" value={hostOf(profile.cv)} href={profile.cv} />
        {profile.socials.map((social) => (
          <Row key={social.name} icon={social.icon} label={social.name} value={social.handle} href={social.url} />
        ))}
      </ul>
    </Modal>
  );
};

export default ContactInfoModal;
