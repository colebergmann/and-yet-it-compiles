from myModelsPop import myModels
from matplotlib import pyplot
import time
import numpy as np

model = myModels('C:\\Users\\denve\\OneDrive\\Documents\\MLData\\pdata.csv')
model.setupModel('model_p14.json','model_p14.h5')
pred = model.predict(100)
pyplot.figure()
#pyplot.plot(pred)
#pyplot.plot(pred2)
#pyplot.plot(pred3)
#pyplot.plot(pred4)
pyplot.plot(pred)
pyplot.show()
