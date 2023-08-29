"use client"
import { useRef } from 'react';

const useForm = (initialState) => {
  const formRef = useRef(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    formRef.current[name] = value;
  };

  return { values: formRef.current, handleChange };
};

export default useForm;