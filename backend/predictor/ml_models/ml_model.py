import os
import joblib
import logging
import xgboost as xgb
import pandas as pd

logger = logging.getLogger(__name__)

class ModelManager:
    """
    Infrastructure Layer: External ML integrations
    Responsibility: Safely loads and manages the ML model in memory.
    Requirements:
    - Load only once at startup
    - Handle missing model gracefully
    - Reusable manager class
    """
    def __init__(self):
        self.preprocessor = None
        self.xgb_model = None
        self._is_loaded = False
        
        # Resolve path robustly relative to this file
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.preprocessor_path = os.path.join(base_dir, 'preprocessor_pipeline.pkl')
        self.xgb_model_path = os.path.join(base_dir, 'xgboost_model.json')

    def load_model(self):
        if self._is_loaded:
            return

        try:
            logger.info(f"Loading preprocessor from {self.preprocessor_path}")
            self.preprocessor = joblib.load(self.preprocessor_path)
            
            logger.info(f"Loading XGBoost model from {self.xgb_model_path}")
            self.xgb_model = xgb.XGBRegressor()
            self.xgb_model.load_model(self.xgb_model_path)
            
            self._is_loaded = True
            logger.info("Machine Learning models successfully loaded into memory.")
        except FileNotFoundError as e:
            logger.error(f"Failed to load ML model. File not found: {e}")
            # We don't crash Django here; we handle it gracefully during prediction
        except Exception as e:
            logger.error(f"An unexpected error occurred while loading the ML model: {e}")

    def predict(self, features_df: pd.DataFrame) -> float:
        """
        Executes a prediction using the loaded model.
        features_df must be a pandas DataFrame.
        """
        if not self._is_loaded:
            raise RuntimeError("The model is not loaded. Cannot make predictions.")

        # Transform using the preprocessor pipeline
        transformed_features = self.preprocessor.transform(features_df)
        
        # Predict using XGBoost
        prediction = self.xgb_model.predict(transformed_features)
        
        # prediction is usually an array, e.g., [250000.5]
        return float(prediction[0])

# Singleton instance to be used across the app
model_manager = ModelManager()
