const CertificationLogo = ({ certification, className = "size-12" }) => {
  const logo = certification.logo || certification.logoLabel;
  const isImagePath = typeof logo === "string" && (logo.startsWith("/") || /\.(png|jpe?g|svg|webp)$/i.test(logo));

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-ink-800 text-center text-[10px] font-medium tracking-wide text-zinc-400 ring-1 ring-inset ring-white/[0.08] ${className}`}
    >
      {isImagePath ? (
        <img src={logo} alt={`${certification.issuer} logo`} className="h-full w-full object-contain p-1" />
      ) : (
        <span>{logo}</span>
      )}
    </div>
  );
};

export default CertificationLogo;
