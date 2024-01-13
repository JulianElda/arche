type ButtonProps = {
  type: "button" | "submit";
  style: "primary" | "secondary";
  id: string;
  text: string;
  onClick: () => void;
};

export function Button(props: ButtonProps) {
  let buttonStyle = `
    rounded-md
    p-2 text-lg
    font-semibold
    shadow-sm
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-sky-300
  `;

  switch (props.style) {
    case "primary":
    default:
      buttonStyle += "bg-sky-700 text-white hover:bg-sky-500";
      break;
    case "secondary":
      buttonStyle += `
        border border-gray-300 bg-white
        text-gray-900 hover:bg-sky-500
        hover:text-white hover:border-sky-500 dark:bg-slate-700
        dark:text-gray-50 dark:hover:bg-sky-500
      `;
      break;
  }

  return (
    <button
      type="button"
      id={props.id}
      data-testid={props.id}
      aria-label={props.text}
      onClick={() => props.onClick()}
      className={buttonStyle}>
      {props.text}
    </button>
  );
}
