import sts
from datetime import datetime
from matplotlib import pyplot
import tensorflow as ts
import numpy as np
import os
from math import sqrt
from numpy import concatenate
from pandas import read_csv
from pandas import DataFrame
from pandas import concat
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
 
# load and format csv
####################################################################################################################

def parse(x):
    return datetime.strptime(x, '%Y %m')

# REPLACE THIS ADRESS WITH THE ADRESS OF YOUR DOWNLOADED CSV FILE
dataset = read_csv('8rides-10min.csv',  parse_dates = [['year','month']], index_col=0, date_parser=parse)
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
n_past_steps = 5

# MESS WITH THIS!
# how many steps(15 minute intervals) in future to predict
n_future_steps = 12

n_rides = 9
n_external_features = 4

n_features = n_external_features + 2 * n_rides

# MESS WITH THIS!
# which ride to predict (rides are: 0, 1, 2, 3...)
f_ride = 0

f_predictor = n_external_features + 2 * f_ride

# frame as supervised learning (shift data)
values = sts.series_to_supervised(values, n_past_steps, 1, n_future_steps-1)

# split into train and test sets
####################################################################################################################
values = values.values

#CAREFULLY MESS WITH THIS! IF THERE IS NOT ENOUGH TESTING DATA THE TESTS WILL BE INACURATE
# number of data points to use as training data(out of 45329 points). remaining data will be delegated for testing
n_train_steps = 40000

train = values[:n_train_steps, :]
test = values[n_train_steps:, :]
# split into input and outputs
n_obs = n_past_steps * n_features
train_x, train_y = train[:, :n_obs], train[:, -n_features + f_predictor]
test_x, test_y = test[:, :n_obs], test[:, -n_features + f_predictor]

# format to time difference

train_y = train_y - train_x[:,-n_features + f_predictor]
test_y = test_y - test_x[:,-n_features + f_predictor]

# reshape input to be 3D [samples, timesteps, features]
r_train_x = train_x.reshape((train_x.shape[0], n_past_steps, n_features))
r_test_x = test_x.reshape((test_x.shape[0], n_past_steps, n_features))


# MESS WITH THIS
# design network
####################################################################################################################
model = ts.keras.models.Sequential()
model.add(ts.keras.layers.LSTM(50, return_sequences=True, input_shape=(n_past_steps, n_features)))
model.add(ts.keras.layers.LSTM(50))
#model.add(ts.keras.layers.LSTM(30, activation = 'relu'))
model.add(ts.keras.layers.Dense(30, activation = 'relu'))
model.add(ts.keras.layers.Dense(1))
opt = ts.keras.optimizers.Adam(lr=0.0007)
model.compile(loss='mse', optimizer=opt)

# fit network
####################################################################################################################
history = model.fit(r_train_x, train_y, epochs=20, batch_size=120, validation_data=(r_test_x, test_y), verbose=1, shuffle=False)

# plot training history
####################################################################################################################
pyplot.plot(history.history['loss'], label='train')
pyplot.plot(history.history['val_loss'], label='test')
pyplot.legend()
pyplot.show()

# Show results
####################################################################################################################
pred_y = model.predict(r_test_x).flatten()

pyplot.figure()
pyplot.plot(pred_y, 'g')
pyplot.plot(test_y, 'r')
pyplot.show()

rmse = sqrt(mean_squared_error(test_y, pred_y))
print('Test RMSE: %.4f' % rmse)

# Format prediction
####################################################################################################################

a_x = test_x[:,-n_features + f_predictor]
a_pred_y = pred_y + test_x[:,-n_features + f_predictor]
a_test_y = test_y + test_x[:,-n_features + f_predictor]

invert_predicted_y = a_pred_y * (max[f_predictor] - min[f_predictor]) + min[f_predictor]
invert_actual_y = a_test_y * (max[f_predictor] - min[f_predictor]) + min[f_predictor]
invert_x = a_x * (max[f_predictor] - min[f_predictor]) + min[f_predictor]

# MESS WITH THIS
# graph last n_points points of predictions (60 is last recorded day, 120 is two days ect)
n_points = 5000

invert_predicted_y = invert_predicted_y[-n_points:]
invert_actual_y = invert_actual_y[-n_points:]
invert_x = invert_x[-n_points:]

rmse = sqrt(mean_squared_error(invert_actual_y, invert_predicted_y))
print('Test B RMSE: %.4f' % rmse)

rmse = sqrt(mean_squared_error(invert_actual_y, invert_x))
print('Normal Test RMSE: %.4f' % rmse)

pyplot.figure()
pyplot.plot(invert_predicted_y, 'r', label = 'Prediction')
pyplot.plot(invert_actual_y, 'g', label = 'Actual')
pyplot.plot(invert_x, 'b', label = 'Input')
pyplot.show()

# save model to json
model_json = model.to_json()
with open("model.json", "w") as json_file:
    json_file.write(model_json)
# save weights to HDF5
model.save_weights("model.h5")
