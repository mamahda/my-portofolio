export const Tag = ({ children }) => (
  <li className="text-xs text-zinc-500 after:ml-1.5 after:text-zinc-700 after:content-['·'] last:after:hidden">{children}</li>
);

const TagList = ({ items, className = "" }) => (
  <ul className={`flex flex-wrap ${className}`}>
    {items.map((item) => (
      <Tag key={item}>{item}</Tag>
    ))}
  </ul>
);

export default TagList;
