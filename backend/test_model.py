import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'houseprice_backend.settings')
django.setup()

from predictor.services import PredictionService

data = {
    "gr_liv_area": 1500,
    "lot_area": 10000,
    "bedroom_abv_gr": 3,
    "full_bath": 2,
    "garage_cars": 2,
    "garage_area": 500,
    "total_bsmt_sf": 800,
    "fireplaces": 1,
    "year_built": 2005,
    "overall_qual": 7,
    "overall_cond": 5,
    "neighborhood": "CollgCr",
    "central_air": "Y"
}

try:
    prediction = PredictionService.create_prediction(data)
    print(f"\n--- SUCCESS! ---")
    print(f"Predicted Price: ${prediction.predicted_price:,.2f}")
    print(f"----------------\n")
except Exception as e:
    print(f"Error occurred: {e}")
