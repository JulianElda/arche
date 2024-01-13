import { ButtonProps, ButtonTypes, ButtonStyles } from "./button.types";

export const buttonPropsPrimary: ButtonProps = {
  type: "button",
  style: "primary",
  id: "primary-button",
  text: "Primary button",
  onClick: () => undefined,
};

export const buttonPropsSecondary: ButtonProps = {
  type: "button" as ButtonTypes,
  style: "secondary" as ButtonStyles,
  id: "secondary-button",
  text: "Secondary button",
  onClick: () => undefined,
};
