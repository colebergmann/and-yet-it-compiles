from myModels import myModels
from matplotlib import pyplot
import time
import numpy as np

model = myModels('data.csv')
model.setupModel('model_53.json','model_53.h5')
pred = model.predict(5,3)
model.setupModel('model_56.json','model_56.h5')
pred = np.append(pred, model.predict(5,3))
model.setupModel('model_512.json','model_512.h5')
pred = np.append(pred, model.predict(5,6))
model.setupModel('model_524.json','model_524.h5')
pred = np.append(pred, model.predict(5,12))
model.setupModel('model_590.json','model_590.h5')
pred = np.append(pred, model.predict(5,78))
pyplot.figure()
pyplot.plot(pred)
pyplot.show()
