from myModels import myModels
from matplotlib import pyplot
import time
import numpy as np

model = myModels('data.csv')
model.setupModel("model_53.json", "model_53.h5")
pred = model.predict(5, 900)
np.roll(pred, -3)
model.setupModel("model_56.json", "model_56.h5")
pred2 = model.predict(5, 900)
np.roll(pred2, -6)
model.setupModel("model_512.json", "model_512.h5")
pred3 = model.predict(5, 900)
np.roll(pred3, -12)
model.setupModel("model_524.json", "model_524.h5")
pred4 = model.predict(5, 900)
np.roll(pred4, -24)
model.setupModel("model_590.json", "model_590.h5")
pred5 = model.predict(5, 900)
np.roll(pred, -90)

pyplot.figure()
pyplot.plot(pred)
pyplot.plot(pred2)
pyplot.plot(pred3)
pyplot.plot(pred4)
pyplot.plot(pred5)
pyplot.show()
