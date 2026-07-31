import { useState } from 'react';
import { predictionService } from '../services/predictionService';

export function usePrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const executePrediction = async (formData) => {
    setIsLoading(true);
    setError(null);

    // Map frontend state to Django serializers' expected fields
    const payload = {
      gr_liv_area: parseInt(formData.livingArea) || 0,
      lot_area: parseInt(formData.lotArea) || 0,
      bedroom_abv_gr: parseInt(formData.bedrooms) || 0,
      full_bath: parseInt(formData.bathrooms) || 0,
      
      // Defaults for fields not currently captured in the UI
      total_bsmt_sf: 0, 
      garage_cars: Math.round((parseInt(formData.garageArea) || 0) / 250),
      
      garage_area: parseInt(formData.garageArea) || 0,
      fireplaces: parseInt(formData.fireplaces) || 0,
      year_built: parseInt(formData.yearBuilt) || 2000,
      overall_qual: parseInt(formData.overallQuality) || 5,
      overall_cond: parseInt(formData.overallCondition) || 5, // Mapping string "3", "5" to int
      neighborhood: formData.neighborhood || 'NAmes',
      central_air: formData.centralAir || 'N'
    };

    try {
      const response = await predictionService.predictHousePrice(payload);
      setIsLoading(false);
      return response; // Contains { id, predicted_price, ... }
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err.response?.data?.error 
        || err.response?.data?.detail 
        || "Failed to connect to the prediction server. Please try again.";
      setError(errorMessage);
      throw err;
    }
  };

  return { isLoading, error, executePrediction };
}
