#callPred.py
import json
import datetime


def read(ride_id):
    with open("api.json", "r") as f:
        predDictionary = json.load(f)
        now = datetime.datetime.now()
        index = now.hour * 6 + int((now.minute/10))- (6*8)
        if (index < 0):
                index = 0
        if (index > 89):
                index = 89
        

        #the object we are going to return
        d = {
                "array":predDictionary[ride_id],
                "predIndex":index
        }
        return d