import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import {
  ArrowClockwiseIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleNotchIcon,
  CopyIcon,
  MapPinIcon,
  PaperPlaneTiltIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import PageShell from "../components/layout/PageShell";
import { AsideBlock } from "../components/layout/SidebarCards";
import SubPageHeader from "../components/layout/SubPageHeader";
import { pageCard } from "../components/ui/Section";
import { profile } from "../data/profile";
import useCopy from "../hooks/useCopy";
import { spring } from "../lib/motion";
import { button } from "../lib/ui";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (values) => {
  const errors = {};
  if (!values.from_name.trim()) errors.from_name = "Tell me who you are.";
  if (!values.from_email.trim()) errors.from_email = "An email is needed so I can reply.";
  else if (!EMAIL_PATTERN.test(values.from_email.trim())) errors.from_email = "That email address looks incomplete.";
  if (values.message.trim().length < 10) errors.message = "Write at least 10 characters.";
  return errors;
};

const resourceRow =
  "group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-zinc-200 transition-colors hover:bg-white/[0.04] hover:text-zinc-50";

const empty = { from_name: "", from_email: "", subject: "", message: "" };

/* Each form row puts its label in a narrow left column, like a CV, and stacks on mobile. */
const row = "grid gap-2 border-b border-line-strong py-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-start sm:gap-6";
const rowLabel = "text-base text-zinc-400 sm:pt-2.5";

const Field = ({ label, name, error, as = "input", ...props }) => {
  const Tag = as;
  const id = `field-${name}`;
  return (
    <div className={row}>
      <label htmlFor={id} className={rowLabel}>
        {label}
      </label>
      <div className="min-w-0">
        <Tag
          id={id}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-lg bg-white/[0.03] px-3.5 py-2.5 text-base text-zinc-100 ring-1 ring-inset transition-shadow placeholder:text-zinc-500 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus-visible:ring-offset-0 ${
            error ? "ring-red-400/70 focus:ring-red-400" : "ring-white/10 focus:ring-accent/70"
          } ${as === "textarea" ? "min-h-32 resize-y" : ""}`}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="mt-2 flex items-center gap-1 text-xs text-red-300">
            <WarningCircleIcon size={14} weight="fill" /> {error}
          </p>
        )}
      </div>
    </div>
  );
};

const DirectContact = () => {
  const [copied, copy] = useCopy();
  const emailCopied = copied === "email";

  return (
    <div>
      <p className="text-base text-zinc-500">The fastest way to reach me</p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="break-all font-serif text-2xl font-bold text-zinc-50 transition-colors hover:text-accent sm:text-3xl"
        >
          {profile.email}
        </a>
        <button
          type="button"
          onClick={() => copy(profile.email, "email")}
          className={button("outline", "px-3 py-1 text-xs")}
        >
          {emailCopied ? <CheckIcon size={13} className="text-accent" /> : <CopyIcon size={13} />}
          {emailCopied ? "Copied" : "Copy"}
        </button>
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {profile.socials.map(({ icon: Icon, ...social }) => (
          <li key={social.name}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-base text-zinc-300 transition-colors hover:text-accent"
            >
              <Icon size={16} /> {social.name}
              <ArrowUpRightIcon size={12} className="text-zinc-500 transition-colors group-hover:text-accent" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ContactPage = () => {
  const formRef = useRef(null);
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [sentTo, setSentTo] = useState("");

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    if (status === "error" || status === "sent") setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = ["from_name", "from_email", "message"].find((name) => nextErrors[name]);
    if (firstInvalid) {
      formRef.current.elements[firstInvalid].focus();
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSentTo(values.from_email.trim());
      setValues(empty);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <PageShell
      aside={
        <>
          <div className="py-5 md:pt-8">
            <Link to="/about" className="group flex flex-col items-start">
              <img
                src={profile.photo}
                alt={profile.name}
                className="size-28 shrink-0 rounded-full object-cover ring-1 ring-inset ring-white/10"
              />
              <p className="mt-4 font-serif text-lg font-bold leading-tight text-zinc-50 transition-colors group-hover:text-accent">
                {profile.name}
              </p>
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-400">{profile.headline}</p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-zinc-500">
                <MapPinIcon size={13} /> {profile.location}
              </p>
            </Link>
            <Link to="/about" className={button("outline", "mt-4 w-full justify-center py-2 text-sm")}>
              About me <ArrowRightIcon size={13} />
            </Link>
          </div>
          <AsideBlock title="Check my work first">
            <ul className="-mx-2">
              <li>
                <a href={profile.cv} target="_blank" rel="noopener noreferrer" className={resourceRow}>
                  <span className="flex-1">Curriculum vitae</span>
                  <ArrowUpRightIcon size={13} className="text-zinc-500 group-hover:text-accent" />
                </a>
              </li>
              <li>
                <Link to="/projects" className={resourceRow}>
                  <span className="flex-1">Projects</span>
                  <ArrowRightIcon size={13} className="text-zinc-500 group-hover:text-accent" />
                </Link>
              </li>
              <li>
                <Link to="/certification" className={resourceRow}>
                  <span className="flex-1">Certifications</span>
                  <ArrowRightIcon size={13} className="text-zinc-500 group-hover:text-accent" />
                </Link>
              </li>
            </ul>
          </AsideBlock>
        </>
      }
    >
      <div className={pageCard}>
      <SubPageHeader title="Get in touch" />

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
        <DirectContact />

        <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-12">
          <h2 className="font-serif text-xl font-bold text-zinc-50">Or send a message here</h2>
          <div className="mt-5">
            <Field
              label="Name"
              name="from_name"
              value={values.from_name}
              onChange={update}
              error={errors.from_name}
              autoComplete="name"
              placeholder="Rania Prameswari"
            />
            <Field
              label="Email"
              name="from_email"
              type="email"
              value={values.from_email}
              onChange={update}
              error={errors.from_email}
              autoComplete="email"
              placeholder="rania@kopikode.id"
            />
            <Field
              label={
                <>
                  Subject <span className="text-xs text-zinc-500">(optional)</span>
                </>
              }
              name="subject"
              value={values.subject}
              onChange={update}
              placeholder="Backend internship, spring 2027"
            />
            <Field
              as="textarea"
              label="Message"
              name="message"
              rows={5}
              value={values.message}
              onChange={update}
              error={errors.message}
              placeholder="Write a message..."
            />
          </div>

          <AnimatePresence>
            {(status === "error" || status === "sent") && (
              <motion.div
                key={status}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                {status === "error" ? (
                  <p
                    role="alert"
                    className="mt-5 flex items-start gap-2 rounded-lg bg-red-500/[0.08] p-3 text-sm text-red-200 ring-1 ring-inset ring-red-400/20"
                  >
                    <WarningCircleIcon size={18} weight="fill" className="mt-px shrink-0 text-red-300" />
                    <span>
                      The message could not be sent. Check your connection and try again, or email{" "}
                      <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                        {profile.email}
                      </a>{" "}
                      directly.
                    </span>
                  </p>
                ) : (
                  <p
                    role="status"
                    className="mt-5 flex items-start gap-2 rounded-lg bg-accent/[0.08] p-3 text-sm text-zinc-200 ring-1 ring-inset ring-accent/20"
                  >
                    <CheckCircleIcon size={18} weight="fill" className="mt-px shrink-0 text-accent" />
                    <span>
                      Message sent. I will reply to <span className="text-zinc-50">{sentTo}</span>, usually within a day.
                    </span>
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs tabular-nums text-zinc-500">{values.message.length} chars</p>
            <button type="submit" disabled={sending} className={button("primary", "min-w-[148px] py-2")}>
              {sending ? (
                <>
                  <CircleNotchIcon size={15} weight="bold" className="animate-spin" /> Sending
                </>
              ) : status === "error" ? (
                <>
                  <ArrowClockwiseIcon size={15} weight="bold" /> Retry
                </>
              ) : (
                <>
                  Send message <PaperPlaneTiltIcon size={15} weight="fill" />
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
      </div>
    </PageShell>
  );
};

export default ContactPage;
