from django.apps import AppConfig

class PredictorConfig(AppConfig):
    name = 'predictor'

    def ready(self):
        """
        Runs exactly once when Django boots up.
        Best practice: Eagerly load ML models here so that the first API request
        doesn't suffer from cold start loading times.
        """
        from .ml_models.ml_model import model_manager
        model_manager.load_model()
