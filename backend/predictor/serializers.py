from rest_framework import serializers
from .models import PredictionRequest

class PredictionRequestSerializer(serializers.ModelSerializer):
    """
    Interface Adapters Layer:
    Handles data validation and conversion between JSON and our Domain models.
    """
    class Meta:
        model = PredictionRequest
        fields = '__all__'
        read_only_fields = ('predicted_price', 'created_at')
