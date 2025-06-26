import type { ButtonProperties } from "./button.types";

export const buttonPropertiesPrimary: ButtonProperties = {
  id: "primary-button",
  onClick: () => {
    console.log("");
  },
  style: "primary",
  text: "Primary button",
  type: "button",
};

export const buttonPropertiesSecondary: ButtonProperties = {
  id: "secondary-button",
  onClick: () => {
    console.log("");
  },
  style: "secondary",
  text: "Secondary button",
  type: "button",
};
