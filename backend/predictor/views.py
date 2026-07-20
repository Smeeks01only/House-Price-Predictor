from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PredictionRequestSerializer
from .services import PredictionService
import logging

logger = logging.getLogger(__name__)

class PredictView(APIView):
    """
    Interface Adapters Layer: REST API Controller
    Responsibility: Handles HTTP request/response cycle. Knows nothing about ML algorithms.
    """
    def post(self, request):
        serializer = PredictionRequestSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Delegate to Application Service
                prediction_request = PredictionService.create_prediction(serializer.validated_data)
                
                # Re-serialize the saved entity including the predicted price
                response_serializer = PredictionRequestSerializer(prediction_request)
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
            except RuntimeError as e:
                # Handle gracefully if the model is missing/failed to load
                logger.error(f"Prediction failed: {e}")
                return Response(
                    {"error": "Internal Server Error: Prediction service unavailable."},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE
                )
            except Exception as e:
                logger.error(f"Unexpected error: {e}")
                return Response(
                    {"error": "Failed to process prediction."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
