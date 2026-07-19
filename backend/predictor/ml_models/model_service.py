import os
import joblib
from django.conf import settings

class ModelService:
    def __init__(self):
        # We assume models are placed in the same directory as this service
        self.models_dir = os.path.dirname(os.path.abspath(__file__))
        self.model = None

    def load_model(self, model_filename='model.joblib'):
        """Load a trained model from disk."""
        model_path = os.path.join(self.models_dir, model_filename)
        if os.path.exists(model_path):
            self.model = joblib.load(model_path)
        else:
            print(f"Warning: Model file {model_path} not found.")

    def predict(self, features):
        """Predict house prices based on input features."""
        if self.model is None:
            raise ValueError("Model not loaded.")
        # Logic to predict using the loaded model
        # features should be a structured format like a pandas DataFrame or numpy array
        return self.model.predict(features)

# Instantiate a global service to be used by views
model_service = ModelService()
