import { FormState } from "@modular-forms/solid";
import { JSX } from "solid-js";

export type SelectProps = {
  ref: (element: HTMLSelectElement) => void;
  name: string;
  value: string | string[] | undefined;
  onInput: JSX.EventHandler<HTMLSelectElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLSelectElement, Event>;
  onBlur: JSX.EventHandler<HTMLSelectElement, FocusEvent>;
  options: {
    title: {
      lang: boolean;
      langId: string;
    };
    value: string;
  }[];
  multiple?: boolean;
  size?: string | number;
  placeholder?: string;
  required?: boolean;
  class?: string;
  label?: string;
  error?: string;
};

export type CheckboxProps = {
  ref?: (element: HTMLInputElement) => void;
  form: FormState<any>;
  name: string;
  value?: string | boolean;
  checked?: boolean;
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange?: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>;
  required?: boolean;
  class?: string;
  label?: string;
  error?: string;
  padding?: "none";
};
