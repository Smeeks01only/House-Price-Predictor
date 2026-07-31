import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    // Step 1
    overallQuality: 7,
    yearBuilt: 2005,
    overallCondition: 5,
    houseStyle: '1Story',
    // Step 2
    livingArea: 2268,
    lotArea: 7405,
    bedrooms: 3,
    bathrooms: 2,
    // Step 3
    garageType: 'Attchd',
    garageArea: 400,
    fireplaces: 0,
    centralAir: 'Y',
    // Step 4
    neighborhood: 'NAmes',
  });

  const [predictionResult, setPredictionResult] = useState(null);

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, predictionResult, setPredictionResult }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
