export function Hyperlink({ link, text }: { link: string; text: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="text-sky-950 decoration-dotted hover:text-sky-800 hover:underline dark:text-sky-100">
      {text}*
    </a>
  );
}
