import sys
import backendAPI as be
import sts
from datetime import datetime
from matplotlib import pyplot
import tensorflow as ts
from math import sqrt
from numpy import concatenate
from pandas import read_csv
from pandas import DataFrame
from pandas import concat
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_squared_error
import os

# Load in model from json format

model = be.loadModel("model.json", "model.h5")

####################################

def parse(x):
    return datetime.strptime(x, '%Y %m')

# REPLACE THIS ADRESS WITH THE ADRESS OF YOUR DOWNLOADED CSV FILE
dataset = read_csv('/mnt/c/Users/Rykien/Desktop/express_react_example/5rides-basic.csv',  parse_dates = [['year','month']], index_col=0, date_parser=parse)
dataset.drop('ride-0', axis=1, inplace=True)
dataset.drop('ride-1', axis=1, inplace=True)
dataset.drop('ride-2', axis=1, inplace=True)
dataset.drop('ride-3', axis=1, inplace=True)
dataset.drop('ride-4', axis=1, inplace=True)
dataset.drop('day_of_month', axis=1, inplace=True)
#dataset.drop('day_of_week', axis=1, inplace=True)
#dataset.drop('hour_of_day', axis=1, inplace=True)
dataset.drop('minute', axis=1, inplace=True)
dataset.drop('dlr_open', axis=1, inplace=True)
dataset.drop('dca_open', axis=1, inplace=True)
dataset.drop('dlr_close', axis=1, inplace=True)
dataset.drop('dca_close', axis=1, inplace=True)
dataset.columns = ['Week day', 'hour', 'Wait Ride 0', 'Open Ride 0', 'Wait Ride 1', 'Open Ride 1', 'Wait Ride 2', 'Open Ride 2', 'Wait Ride 3', 'Open Ride 3', 'Wait Ride 4', 'Open Ride 4']
#dataset.columns = ['Month Day', 'Week day', 'Hour', 'Minute', 'DLR Open', 'DCA Open', 'DLR Close', 'DCA Close', 'Wait Ride 0', 'Open Ride 0', 'Wait Ride 1', 'Open Ride 1', 'Wait Ride 2', 'Open Ride 2', 'Wait Ride 3', 'Open Ride 3', 'Wait Ride 4', 'Open Ride 4']
dataset.index.name = 'date'

# format dataset values for network
####################################################################################################################

values = dataset.values
# convert data to float
values = values.astype('float32')
# normalize data between 0 and 1
scaler = MinMaxScaler(feature_range=(0, 1))
values = scaler.fit_transform(values)
min = scaler.data_min_
max = scaler.data_max_

# specify number of features / number of time steps / time in future to predict

# MESS WITH THIS
# number of steps used as input
n_steps = 8

n_rides = 5
n_external_features = 2

n_features = n_external_features + 2 * n_rides

# MESS WITH THIS!
# which ride to predict (rides are: 0, 1, 2, 3...)
f_ride = 4

f_predictor = n_external_features + 2 * f_ride

# MESS WITH THIS!
# how many steps(15 minute intervals) in future to predict
n_future_steps = 45

# frame as supervised learning (shift data)
values = sts.series_to_supervised(values, n_steps, 1, n_future_steps-1)

# split into train and test sets
####################################################################################################################
values = values.values

#CAREFULLY MESS WITH THIS! IF THERE IS NOT ENOUGH TESTING DATA THE TESTS WILL BE INACURATE
# number of data points to use as training data(out of 30287 points). remaining data will be delegated for testing
n_train_steps = 21000

test = values[n_train_steps:, :]
# split into input and outputs
n_obs = n_steps * n_features
test_x, test_y = test[:, :n_obs], test[:, -n_features + f_predictor]

# format to time difference

test_y = test_y - test_x[:,-n_features + f_predictor]


# reshape input to be 3D [samples, timesteps, features]
test_x = test_x.reshape((test_x.shape[0], n_steps, n_features))

# plot training history
####################################################################################################################
# pyplot.plot(history.history['loss'], label='train')
# pyplot.plot(history.history['val_loss'], label='test')
# pyplot.legend()
# pyplot.show()

# Show results
####################################################################################################################

pred_y = model.predict(test_x)
print(type(pred_y))
print(type(test_y))
pred_y = pred_y + test_y
print(pred_y)
# pred_y = pred_y.shift(n_future_steps)
print(pred_y)
invert_predicted_y = pred_y * (max[f_predictor] - min[f_predictor]) + min[f_predictor]

invert_actual_y = test_y * (max[f_predictor] - min[f_predictor]) + min[f_predictor]

# MESS WITH THIS
# graph last n_points points of predictions (60 is last recorded day, 120 is two days ect)
n_points = 600
invert_predicted_y = invert_predicted_y[-n_points:]
invert_actual_y = invert_actual_y[-n_points:]
print(type(invert_actual_y))
# pyplot.figure()
# pyplot.plot(invert_predicted_y, 'r')
# pyplot.plot(invert_actual_y, 'g')
# pyplot.show()
