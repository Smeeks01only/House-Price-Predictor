import logging

logger = logging.getLogger(__name__)

def log_prediction(request_data, predicted_price):
    """
    Helper function to log prediction requests and results.
    """
    logger.info(f"Prediction made: {predicted_price} for input: {request_data}")
