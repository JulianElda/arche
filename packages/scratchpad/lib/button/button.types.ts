export interface ButtonProperties {
  id: string;
  onClick: () => void;
  style: "primary" | "secondary";
  text: string;
  type: "button" | "submit";
}
