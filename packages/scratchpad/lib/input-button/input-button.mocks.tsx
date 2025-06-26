import type { InputButtonProperties } from "lib/input-button/input-button.types";

import {
  inputProperties1,
  inputProperties2,
  inputProperties3,
} from "lib/input/input.mocks";

const copySvg = (
  <svg
    aria-hidden="true"
    className="-ml-0.5 h-5 w-5"
    fill="currentColor"
    viewBox="0 0 384 512">
    <path d="M280 64l40 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l40 0 9.6 0C121 27.5 153.3 0 192 0s71 27.5 78.4 64l9.6 0zM64 112c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16l-16 0 0 24c0 13.3-10.7 24-24 24l-88 0-88 0c-13.3 0-24-10.7-24-24l0-24-16 0zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
  </svg>
);

const searchSvg = (
  <svg
    aria-hidden="true"
    className="-ml-0.5 h-5 w-5"
    fill="currentColor"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
  </svg>
);

const copyLabel = <span>copy</span>;

export const inputButtonProperties1: InputButtonProperties = {
  ...inputProperties1,
  buttonAriaLabel: "copy",
  icon: copySvg,
  onButtonClick: () => {
    console.log();
  },
};

export const inputButtonProperties2: InputButtonProperties = {
  ...inputProperties1,
  buttonAriaLabel: "copy",
  icon: copyLabel,
  onButtonClick: () => {
    console.log();
  },
};

export const inputButtonProperties3: InputButtonProperties = {
  ...inputProperties2,
  buttonAriaLabel: "copy",
  icon: copySvg,
  onButtonClick: () => {
    console.log();
  },
};

export const inputButtonProperties4: InputButtonProperties = {
  ...inputProperties3,
  buttonAriaLabel: "search",
  icon: searchSvg,
  onButtonClick: () => {
    console.log();
  },
};
