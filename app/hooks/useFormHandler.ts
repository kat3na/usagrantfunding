import { useState } from 'react';

type FormFields = {
  [key: string]: string;
};

export default function useFormHandler() {
  const [form, setForm] = useState<FormFields>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev: FormFields) => {
      const updated = { ...prev, [name]: value };
      console.log("Form data updated:", updated);
      return updated;
    });
  };

  return { form, handleChange };
}
