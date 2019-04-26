from myModel import myModel
from matplotlib import pyplot

model = myModel("model.json", "model.h5", '8rides-10min.csv', 22, 5, 0)
model.addRow(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1) # week_day, hour, temp, precip, wait0, open0, wait1, open1,  wait2, open2, wait3, open3, wait4, open4, wait5, open5, wait6, open6, wait7, open7, wait8, open8

pred = model.predict(100)

pyplot.figure()
pyplot.plot(pred, 'r', label = 'Prediction')
pyplot.show()
