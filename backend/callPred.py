#callPred.py
import json


def read(ride_id):
    with open("api.json", "r") as f:
        predDictionary = json.load(f)
        return predDictionary[ride_id]
