const CertificationLogo = ({ certification, className = "" }) => {
  const logo = certification.logo || certification.logoLabel;
  const isImagePath = typeof logo === "string" && (logo.startsWith("/") || /\.(png|jpe?g|svg|webp)$/i.test(logo));

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-center text-[10px] font-bold tracking-wide text-slate-500 shadow-sm ${className}`}
    >
      {isImagePath ? (
        <img src={logo} alt={`${certification.issuer} logo`} className="h-full w-full object-contain p-2" />
      ) : (
        <span>{logo}</span>
      )}
    </div>
  );
};

export default CertificationLogo;
