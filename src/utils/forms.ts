import {
  DeepPartial,
  FieldValues,
  ValidateForm,
  ValidationMode,
  createForm as cf,
  getValues,
} from "@modular-forms/solid";
import { createMemo } from "solid-js";
import { P, isMatching } from "ts-pattern";

type FormOptions<TFieldValues extends FieldValues> = Partial<{
  initialValues: DeepPartial<TFieldValues>;
  validateOn: ValidationMode;
  revalidateOn: ValidationMode;
  validate: ValidateForm<TFieldValues>;
}>;

export const createForm = <T extends FieldValues>(
  pattern: P.Pattern<T>,
  options?: FormOptions<T>
) => {
  const form = cf<T>(options);
  const values = createMemo(() => getValues(form));

  return {
    form,
    values,
    isValid: () => isMatching(pattern, values()),
  };
};
