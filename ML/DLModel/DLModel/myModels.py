import sts
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
        self.loadCSV(csv)
        self.model_list = [myModel.myModel() for count in range(50)]

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
        dataset.drop('day_of_month', axis=1, inplace=True)
        dataset.drop('minute', axis=1, inplace=True)
        dataset.drop('dlr_open', axis=1, inplace=True)
        dataset.drop('dca_open', axis=1, inplace=True)
        dataset.drop('dlr_close', axis=1, inplace=True)
        dataset.drop('dca_close', axis=1, inplace=True)
        dataset.drop('weather_daily_temperatureHigh', axis=1, inplace=True)
        dataset.drop('weather_daily_temperatureLow', axis=1, inplace=True)
        dataset.drop('weather_daily_precipProbability', axis=1, inplace=True)
        dataset.columns = ['Week day', 'hour', 'Temp', 'Precip', 'Wait Ride 0', 'Open Ride 0', 'Wait Ride 1', 'Open Ride 1', 'Wait Ride 2', 'Open Ride 2', 'Wait Ride 3', 'Open Ride 3', 'Wait Ride 4', 'Open Ride 4', 'Wait Ride 5', 'Open Ride 5', 'Wait Ride 6', 'Open Ride 6', 'Wait Ride 7', 'Open Ride 7', 'Wait Ride 8', 'Open Ride 8']
        dataset.index.name = 'date'

        self.values = dataset.values
        # convert data to float
        self.values = self.values.astype('float32')
        # normalize data between 0 and 1
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        self.values = self.scaler.fit_transform(self.values)
        self.min = self.scaler.data_min_
        self.max = self.scaler.data_max_

    def addRow(self, week_day, hour, temp, precip, wait0, open0, wait1, open1,  wait2, open2, wait3, open3, wait4, open4, wait5, open5, wait6, open6, wait7, open7, wait8, open8):
        row = [week_day, hour, temp, precip, wait0, open0, wait1, open1,  wait2, open2, wait3, open3, wait4, open4, wait5, open5, wait6, open6, wait7, open7, wait8, open8]
        row = self.scaler.fit_transform(self.values)
        np.append(self.values, row, axis=0)

    def setupModel(self, model_num, model_json, model_weights, numFeatures, ride):
        self.model_list[model_num].setup(model_json, model_weights, numFeatures, ride)

    def predict(self, model_num, num_past_points):
        return self.model_list[model_num].predict(self.values, num_past_points, self.min, self.max)




