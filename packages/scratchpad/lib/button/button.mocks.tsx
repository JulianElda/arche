import { ButtonProps } from "./button.types";

export const buttonPropsPrimary: ButtonProps = {
  type: "button",
  style: "primary",
  id: "primary-button",
  text: "Primary button",
  onClick: () => undefined,
};

export const buttonPropsSecondary: ButtonProps = {
  type: "button",
  style: "secondary",
  id: "secondary-button",
  text: "Secondary button",
  onClick: () => undefined,
};
