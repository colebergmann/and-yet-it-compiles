import tensorflow as tf
import numpy as np
import os
import sts
from math import sqrt
from numpy import concatenate
from pandas import read_csv
from pandas import DataFrame
from pandas import concat

class myModel(object):
    def setup(self, model_json, model_weights):
        self.loadModel(model_json, model_weights)

    def loadModel(self, model_json, model_weights):
        json_file = open(model_json, 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        self.model = tf.keras.models.model_from_json(loaded_model_json)
        self.model.load_weights(model_weights)

    def predict(self, values, ride, num_past_points, min, max):
        f_predictor = 4 + 2 * ride;

        processed = sts.series_to_supervised(values, 1, 0, 0)
        processed = processed.values
        processed = processed[:, :24]

        r_values = processed.reshape((processed.shape[0], 1, 24))
        pred = self.model.predict(r_values).flatten()
        pred = pred + processed[:,-24 + self.f_predictor]
        pred = pred * (max[f_predictor] - min[f_predictor]) + min[f_predictor]
        return pred[-num_past_points:]



