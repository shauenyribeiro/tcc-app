import { useCallback, useState } from "react";

export const useForm = <T = Record<string, string>>(
  values: T
): [T, (value: string, key: keyof T) => void] => {
  const [formValues, setFormValues] = useState(values);

  const handleFormValueChange = useCallback((value: string, key: keyof T) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  return [formValues, handleFormValueChange];
};
