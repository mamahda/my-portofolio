import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  ArrowClockwiseIcon,
  CheckCircleIcon,
  BriefcaseIcon,
  ChatsCircleIcon,
  CircleNotchIcon,
  CodeIcon,
  PaperPlaneTiltIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import PageShell from "../components/layout/PageShell";
import { AsideBlock, QuickActions, SocialList } from "../components/layout/SidebarCards";
import SubPageHeader from "../components/layout/SubPageHeader";
import { profile } from "../data/profile";
import { snappy, spring } from "../lib/motion";
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

const topics = [
  { subject: "Internship opportunity", hint: "Backend, DevOps or security roles", icon: BriefcaseIcon },
  { subject: "Project collaboration", hint: "Build something together", icon: CodeIcon },
  { subject: "Just saying hi", hint: "Linux, networking, Neovim talk", icon: ChatsCircleIcon },
];

const empty = { from_name: "", from_email: "", subject: "", message: "" };

const timeNow = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const Field = ({ label, name, error, helper, as = "input", ...props }) => {
  const Tag = as;
  const id = `field-${name}`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between text-sm text-zinc-300">
        {label}
        {helper && (
          <span id={`${id}-helper`} className="text-xs text-zinc-500">
            {helper}
          </span>
        )}
      </label>
      <Tag
        id={id}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
        className={`w-full rounded-lg bg-white/[0.03] px-3.5 py-2.5 text-[15px] text-zinc-100 ring-1 ring-inset transition-shadow placeholder:text-zinc-500 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus-visible:ring-offset-0 ${
          error ? "ring-red-400/70 focus:ring-red-400" : "ring-white/10 focus:ring-accent/70"
        } ${as === "textarea" ? "min-h-32 resize-y" : ""}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1 text-xs text-red-300">
          <WarningCircleIcon size={14} weight="fill" /> {error}
        </p>
      )}
    </div>
  );
};

const Bubble = ({ mine, name, time, children }) => (
  <motion.li
    layout
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={snappy}
    className="flex gap-3"
  >
    {mine ? (
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink-800 font-mono text-xs uppercase text-zinc-300 ring-1 ring-inset ring-white/[0.08]">
        {name.slice(0, 2)}
      </span>
    ) : (
      <img src={profile.photo} alt="" className="size-9 shrink-0 rounded-full object-cover" />
    )}
    <div className="min-w-0 flex-1">
      <p className="text-sm">
        <span className="font-medium text-zinc-100">{name}</span>
        <span className="ml-2 font-mono text-[11px] text-zinc-500">{time}</span>
      </p>
      <div className="mt-1 max-w-[60ch] space-y-1.5 whitespace-pre-line text-[15px] leading-relaxed text-zinc-300">
        {children}
      </div>
    </div>
  </motion.li>
);

const ContactPage = () => {
  const formRef = useRef(null);
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [sent, setSent] = useState([]);
  const [openedAt] = useState(timeNow);

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSent((current) => [...current, { ...values, time: timeNow() }]);
      setValues(empty);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  const pickTopic = (topic) => {
    setValues((current) => ({ ...current, subject: topic.subject }));
    document.getElementById("field-message")?.focus({ preventScroll: true });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageShell
      aside={
        <>
          <AsideBlock title="Start with a topic" first className="hidden md:block">
            <ul className="-mx-2">
              {topics.map((topic) => (
                <li key={topic.subject}>
                  <button
                    type="button"
                    onClick={() => pickTopic(topic)}
                    className={`group flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/[0.04] ${
                      values.subject === topic.subject ? "bg-white/[0.06]" : ""
                    }`}
                  >
                    <topic.icon size={18} className="mt-0.5 shrink-0 text-zinc-400 group-hover:text-accent" />
                    <span className="min-w-0">
                      <span className="block text-sm text-zinc-100">{topic.subject}</span>
                      <span className="block text-xs text-zinc-500">{topic.hint}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </AsideBlock>
          <QuickActions title="Other ways to reach me" hideMessage className="max-md:border-t-0" />
          <SocialList />
        </>
      }
    >
      <SubPageHeader eyebrow="Messaging" title="Let's talk" />

      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
        <div className="flex items-center gap-3 border-y border-line py-3">
          <div className="relative">
            <img src={profile.photo} alt="" className="size-10 rounded-full object-cover" />
            <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-accent ring-2 ring-ink-950" />
          </div>
          <div className="min-w-0">
            <p className="font-medium leading-tight text-zinc-100">{profile.name}</p>
            <p className="truncate text-xs text-zinc-500">Usually replies within a day</p>
          </div>
        </div>

        <ul className="space-y-6 py-8">
          <li className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            <span className="h-px flex-1 bg-line" /> Today <span className="h-px flex-1 bg-line" />
          </li>
          <Bubble name={profile.name} time={openedAt}>
            <p>Hi there, thanks for stopping by.</p>
            <p>
              Interested in Cyber Security, Computer Network, or Linux discussions? Internship openings, project
              ideas, or a question about something on this profile all work. Drop a message below and it lands
              straight in my inbox.
            </p>
          </Bubble>
          <AnimatePresence initial={false}>
            {sent.map((message) => (
              <Bubble key={message.time + message.message} mine name={message.from_name} time={message.time}>
                {message.subject && <p className="font-medium text-zinc-100">{message.subject}</p>}
                <p>{message.message}</p>
                <p className="flex items-center gap-1 pt-1 text-xs text-accent">
                  <CheckCircleIcon size={14} weight="fill" /> Delivered to {profile.email}
                </p>
              </Bubble>
            ))}
          </AnimatePresence>
        </ul>

        <form ref={formRef} onSubmit={handleSubmit} noValidate className="border-t border-line pt-8">
          {/* The sidebar topic picker sits below the form on small screens, so offer it inline here. */}
          <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 md:hidden">
            {topics.map((topic) => (
              <button
                key={topic.subject}
                type="button"
                onClick={() => pickTopic(topic)}
                aria-pressed={values.subject === topic.subject}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ring-1 ring-inset transition-colors active:scale-[0.98] ${
                  values.subject === topic.subject
                    ? "bg-white/[0.08] text-zinc-50 ring-white/25"
                    : "text-zinc-400 ring-white/10 hover:text-zinc-100"
                }`}
              >
                <topic.icon size={15} />
                {topic.subject}
              </button>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Full name"
              name="from_name"
              value={values.from_name}
              onChange={update}
              error={errors.from_name}
              autoComplete="name"
              placeholder="Rania Prameswari"
            />
            <Field
              label="Email address"
              name="from_email"
              type="email"
              value={values.from_email}
              onChange={update}
              error={errors.from_email}
              autoComplete="email"
              placeholder="rania@kopikode.id"
            />
          </div>
          <div className="mt-5 flex flex-col gap-5">
            <Field
              label="Subject"
              name="subject"
              value={values.subject}
              onChange={update}
              helper="Optional"
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
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
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
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11.5px] text-zinc-500" aria-live="polite">
              {status === "sent" ? "Sent. You can write another one any time." : `${values.message.length} chars`}
            </p>
            <button type="submit" disabled={sending} className={button("primary", "min-w-[112px] py-2")}>
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
                  Send <PaperPlaneTiltIcon size={15} weight="fill" />
                </>
              )}
            </button>
          </div>
        </form>
      </motion.section>
    </PageShell>
  );
};

export default ContactPage;
