from django.db import transaction
from .models import PredictionRequest
from .ml_models.ml_model import model_manager
from .utils import log_prediction
import pandas as pd

class PredictionService:
    """
    Application Layer: Business logic & Use cases
    Responsibility: Orchestrates data saving, model prediction, and logging.
    """
    @staticmethod
    @transaction.atomic
    def create_prediction(validated_data: dict) -> PredictionRequest:
        # Create domain entity
        prediction_request = PredictionRequest(**validated_data)
        
        # Format the data for the model exactly as the training data looked
        features_df = pd.DataFrame([{
            'Gr Liv Area': prediction_request.gr_liv_area,
            'Lot Area': prediction_request.lot_area,
            'Bedroom AbvGr': prediction_request.bedroom_abv_gr,
            'Full Bath': prediction_request.full_bath,
            'Garage Cars': prediction_request.garage_cars,
            'Garage Area': prediction_request.garage_area,
            'Total Bsmt SF': prediction_request.total_bsmt_sf,
            'Fireplaces': prediction_request.fireplaces,
            'Year Built': prediction_request.year_built,
            'Overall Qual': prediction_request.overall_qual,
            'Overall Cond': prediction_request.overall_cond,
            'Neighborhood': prediction_request.neighborhood,
            'Central Air': prediction_request.central_air
        }])
        
        # Call the Infrastructure Layer (ML Model)
        predicted_price = model_manager.predict(features_df)
        
        prediction_request.predicted_price = predicted_price
        prediction_request.save()
        
        # Call helper util for side effects
        log_prediction(validated_data, predicted_price)
        
        return prediction_request
