import {useState} from 'react';

export interface FormValues {
  [key: string]: string;
}

export function useForm<T extends FormValues>(inputValues: T) {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };

  return {values, setValues, handleChange};
}