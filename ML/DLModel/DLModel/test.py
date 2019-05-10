from myModels import myModels
from matplotlib import pyplot
import time

model = myModels('data.csv')
start = time.time()
model.setupModel("model_03.json", "model_03.h5")
end = time.time() - start

pred = model.predict(0, 50)

pyplot.figure()
pyplot.plot(pred, 'r', label = 'Prediction')
pyplot.show()
