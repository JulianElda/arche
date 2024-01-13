export type ButtonTypes = "button" | "submit";

export type ButtonStyles = "primary" | "secondary";

export type ButtonProps = {
  type: ButtonTypes;
  style: ButtonStyles;
  id: string;
  text: string;
  onClick: () => void;
};
