export type ButtonProps = {
  type: "button" | "submit";
  style: "primary" | "secondary";
  id: string;
  text: string;
  onClick: () => void;
};
