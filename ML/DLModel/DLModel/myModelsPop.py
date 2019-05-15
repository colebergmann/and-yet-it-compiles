from myModelPop import myModel
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
        self.loadCSV(csv)
        self.model = myModel()

    def parse(self, x):
        return datetime.strptime(x, '%Y %m')

    def loadCSV(self, csv_file):
        dataset = read_csv(csv_file,  parse_dates = [['year','month']], index_col=0, date_parser=self.parse)
        dataset.drop('dlr_open', axis=1, inplace=True)
        dataset.drop('dca_open', axis=1, inplace=True)
        dataset.drop('dlr_close', axis=1, inplace=True)
        dataset.drop('dca_close', axis=1, inplace=True)

        dataset.columns = ['date', 'weather_daily_tempHigh', 'weather_daily_tempLow', 'weather_daily_precip', 'park_population']
        dataset.index.name = ['date']

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
        print(model_json)
        print(model_weights)
        self.model.setup(model_json, model_weights)

    def predict(self, num_past_points):   
        return self.model.predict(self.values, num_past_points, self.min, self.max)




