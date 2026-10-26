export const Tag = ({ children }) => (
  <li className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[11.5px] text-zinc-400 ring-1 ring-inset ring-white/[0.07]">
    {children}
  </li>
);

const TagList = ({ items, className = "" }) => (
  <ul className={`flex flex-wrap gap-1.5 ${className}`}>
    {items.map((item) => (
      <Tag key={item}>{item}</Tag>
    ))}
  </ul>
);

export default TagList;
