import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  FormErrors,
  Maybe,
  PartialValues,
  ValidationMode,
  createFormStore as cf,
  getError as ge,
  getValues,
  setValue as sv,
  validate,
} from "@modular-forms/solid";
import { createMemo } from "solid-js";
import { P, isMatching } from "ts-pattern";

export type FormValuesPattern<T extends object> = {
  [key in keyof T]: Array<{
    pattern: P.Pattern<unknown>;
    message?: string;
  }>;
};

export type FormValues<T extends FormValuesPattern<any>> = Record<
  keyof T,
  P.infer<T[keyof T][number]["pattern"]>
>;

type FormOptions = Partial<{
  validateOn: ValidationMode;
  revalidateOn: ValidationMode;
}>;

const validateForm =
  <T extends FieldValues>(pattern: FormValuesPattern<T>) =>
  (values: Maybe<PartialValues<T>>) => {
    const errors = Object.entries(pattern).reduce((acc, [key, value]) => {
      const field = values?.[key as keyof PartialValues<T>];
      const error = value.find((v) => !isMatching(v.pattern, field));
      return error ? { ...acc, [key]: error.message || "" } : acc;
    }, {} as FormErrors<T>);

    return errors;
  };

export const createForm = <T extends FormValuesPattern<any>>(
  pattern: T,
  initialValues: FormValues<T>,
  partialOptions?: FormOptions
) => {
  const options = {
    ...partialOptions,
    initialValues: initialValues as PartialValues<FormValues<T>>,
    validate: validateForm(pattern),
  };

  const form = cf<FormValues<T>>(options);
  const values = createMemo(() => getValues(form));

  return {
    form,
    values,
    isValid: () => validate(form),
    validateField: (name: FieldPath<FormValues<T>>) => validate(form, name),
    getError: (name: FieldPath<FormValues<T>>) => ge(form, name),
    // getError: (name: FieldPath<FormValues<T>>) => createMemo(() => ge(form, name)),
    setValue: (
      name: FieldPath<FormValues<T>>,
      value: FieldPathValue<FormValues<T>, FieldPath<FormValues<T>>>
    ) => sv(form, name, value as any),
  };
};
