type HyperlinkProps = {
  href: string;
  title: string;
  asterisk?: boolean;
};

export function Hyperlink(props: HyperlinkProps) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className="text-sky-950 decoration-dotted
        hover:text-sky-800 hover:underline
        dark:text-sky-100 hover:dark:text-sky-400">
      {props.title}
      {props.asterisk === false ? "" : "*"}
    </a>
  );
}
