from django.db import models

class PredictionRequest(models.Model):
    """
    Domain Layer: Enterprise Business Rules / Entities
    Represents a house price prediction request.
    """
    gr_liv_area = models.IntegerField()
    lot_area = models.IntegerField()
    bedroom_abv_gr = models.IntegerField()
    full_bath = models.IntegerField()
    garage_cars = models.FloatField()
    garage_area = models.FloatField()
    total_bsmt_sf = models.FloatField()
    fireplaces = models.IntegerField()
    year_built = models.IntegerField()
    overall_qual = models.IntegerField()
    overall_cond = models.IntegerField()
    neighborhood = models.CharField(max_length=100)
    central_air = models.CharField(max_length=10)

    predicted_price = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"PredictionRequest {self.id} - ${self.predicted_price}"
