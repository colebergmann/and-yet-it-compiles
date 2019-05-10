from myModels import myModels
from matplotlib import pyplot

models = myModels('data.csv')
models.setupModel(0, "model_03.json", "model_03.h5", 0)
pred = models.predict(0,500)
models.addRow(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)
pred = models.predict(0,500)
pyplot.figure()
pyplot.plot(pred, 'r', label = 'Prediction')
pyplot.show()
