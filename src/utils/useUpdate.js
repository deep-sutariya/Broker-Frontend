"use client"
import { useState } from 'react';

const useUpdate = (initialState) => {
  const [values, setValues] = useState(initialState)

  const handleChange = (eventOrFields) => {
    setValues((prevValues) => {
      const updatedValues = { ...prevValues };

      if (Array.isArray(eventOrFields)) {
        eventOrFields.forEach((field) => {
          updatedValues[field.name] = field.value;
        });
      } else {
        const { name, value } = eventOrFields.target;
        updatedValues[name] = value;
      }

      return updatedValues;
    });
  };

  return { values, handleChange };
};

export default useUpdate;