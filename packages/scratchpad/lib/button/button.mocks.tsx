import type { ButtonProps } from "./button.types";

export const buttonPropsPrimary: ButtonProps = {
  id: "primary-button",
  onClick: () => {
    console.log("");
  },
  style: "primary",
  text: "Primary button",
  type: "button",
};

export const buttonPropsSecondary: ButtonProps = {
  id: "secondary-button",
  onClick: () => {
    console.log("");
  },
  style: "secondary",
  text: "Secondary button",
  type: "button",
};
