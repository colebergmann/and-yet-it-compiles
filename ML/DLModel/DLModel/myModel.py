import tensorflow as tf
import numpy as np
import os
from math import sqrt
from numpy import concatenate
from pandas import read_csv
from pandas import DataFrame
from pandas import concat

class myModel(object):
    def setup(self, model_json, model_weights, ride):
        self.n_features = 24
        self.n_past_steps = 1
        self.f_predictor = 4 + 2 * ride;
        self.loadModel(model_json, model_weights)

    def loadModel(self, model_json, model_weights):
        json_file = open(model_json, 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        self.model = tf.keras.models.model_from_json(loaded_model_json)
        self.model.load_weights(model_weights)

    def predict(self, values, num_past_points, min, max):
        self.processed = sts.series_to_supervised(values, self.n_past_steps, 0, 0)
        self.processed = self.processed.values
        n_obs = self.n_past_steps * self.n_features
        self.processed = self.processed[:, :n_obs]

        self.r_values = self.processed.reshape((self.processed.shape[0], self.n_past_steps, self.n_features))
        pred = self.model.predict(self.r_values).flatten()
        pred = pred + self.processed[:,-self.n_features + self.f_predictor]
        pred = pred * (max[self.f_predictor] - min[self.f_predictor]) + min[self.f_predictor]
        return pred[-num_past_points:]



