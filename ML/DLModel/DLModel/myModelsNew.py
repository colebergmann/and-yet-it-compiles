import myModel
from datetime import datetime
import tensorflow as tf
import numpy as np
import os
from math import sqrt
from numpy import concatenate
from pandas import read_csv
from pandas import DataFrame
from pandas import concat
from sklearn.preprocessing import MinMaxScaler

class myModels(object):
    def __init__(self, csv):
        self.csv=csv
        self.model = myModel.myModel()
        self.ride_pred = np.zeros((10,90))
        self.files = [None] * 100
    def parse(self, x):
        return datetime.strptime(x, '%Y %m')

    def loadCSV(self, csv_file):
        dataset = read_csv(csv_file,  parse_dates = [['year','month']], index_col=0, date_parser=self.parse)
        dataset.drop('ride-0', axis=1, inplace=True)
        dataset.drop('ride-1', axis=1, inplace=True)
        dataset.drop('ride-2', axis=1, inplace=True)
        dataset.drop('ride-3', axis=1, inplace=True)
        dataset.drop('ride-4', axis=1, inplace=True)
        dataset.drop('ride-5', axis=1, inplace=True)
        dataset.drop('ride-6', axis=1, inplace=True)
        dataset.drop('ride-7', axis=1, inplace=True)
        dataset.drop('ride-8', axis=1, inplace=True)
        dataset.drop('ride-9', axis=1, inplace=True)
        dataset.drop('day_of_month', axis=1, inplace=True)
        dataset.drop('minute', axis=1, inplace=True)
        dataset.drop('dlr_open', axis=1, inplace=True)
        dataset.drop('dca_open', axis=1, inplace=True)
        dataset.drop('dlr_close', axis=1, inplace=True)
        dataset.drop('dca_close', axis=1, inplace=True)
        dataset.drop('weather_daily_temperatureHigh', axis=1, inplace=True)
        dataset.drop('weather_daily_temperatureLow', axis=1, inplace=True)
        dataset.drop('weather_daily_precipProbability', axis=1, inplace=True)
        dataset.columns = ['Week day', 'hour', 'Temp', 'Precip', 'Wait Ride 0', 'Open Ride 0', 'Wait Ride 1', 'Open Ride 1', 'Wait Ride 2', 'Open Ride 2', 'Wait Ride 3', 'Open Ride 3', 'Wait Ride 4', 'Open Ride 4', 'Wait Ride 5', 'Open Ride 5', 'Wait Ride 6', 'Open Ride 6', 'Wait Ride 7', 'Open Ride 7', 'Wait Ride 8', 'Open Ride 8', 'Wait Ride 9', 'Open Ride 9']
        dataset.index.name = 'date'

        self.values = dataset.values
        # convert data to float
        self.values = self.values.astype('float32')
        # normalize data between 0 and 1
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        self.values = self.scaler.fit_transform(self.values)
        self.min = self.scaler.data_min_
        self.max = self.scaler.data_max_
        self.num_lines = self.values.size
    def getDataLength(self):
        return self.num_lines
    def setupModel(self, model_json, model_weights):
        tf.keras.backend.clear_session()
        self.model.setup(model_json, model_weights)
    def predict(self, ride, num_past_points):   
        return self.model.predict(self.values, ride, num_past_points, self.min, self.max)
    def load_files(self, files):
        for i in range (0, 100):
            self.files[i] = files[i]
    def update(self):
        self.loadCSV(self.csv)
        self.ride_pred = np.roll(self.ride_pred,-1,axis=1)
        for i in range (0, 10):
            print(i)
            self.setupModel(self.files[10 * i],self.files[10 * i + 1])
            self.ride_pred[i,2] = self.predict(i,1)
            self.setupModel(self.files[10 * i + 2],self.files[10 * i + 3])
            self.ride_pred[i,5] = self.predict(i,1)
            self.setupModel(self.files[10 * i + 4],self.files[10 * i + 5])
            self.ride_pred[i,11] = self.predict(i,1)
            self.setupModel(self.files[10 * i + 6],self.files[10 * i + 7])
            self.ride_pred[i,23] = self.predict(i,1)
            self.setupModel(self.files[10 * i + 8],self.files[10 * i + 9])
            self.ride_pred[i,89] = self.predict(i,1)
    def fill(self):
        self.loadCSV(self.csv)
        for i in range (0, 10):
            print(i)
            self.setupModel(self.files[10 * i],self.files[10 * i + 1])
            a = self.predict(i,3)
            for s in range (0,3):
                self.ride_pred[i,s] = a[s]
            self.setupModel(self.files[10 * i + 2],self.files[10 * i + 3])
            a = self.predict(i,3)
            for s in range (3,6):
                self.ride_pred[i,s] = a[s-3]
            self.setupModel(self.files[10 * i + 4],self.files[10 * i + 5])
            a = self.predict(i,6)
            for s in range (6,12):
                self.ride_pred[i,s] = a[s-6]
            self.setupModel(self.files[10 * i + 6],self.files[10 * i + 7])
            a = self.predict(i,12)
            for s in range (12,24):
                self.ride_pred[i,s] = a[s-12]
            self.setupModel(self.files[10 * i + 8],self.files[10 * i + 9])
            a = self.predict(i,66)
            for s in range (24,90):
                self.ride_pred[i,s] = a[s-24]
    def getRidePrediction(self, ride):
        return self.ride_pred[ride]



