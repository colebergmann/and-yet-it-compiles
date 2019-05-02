from myModels import myModels
from matplotlib import pyplot

models = myModels('8rides-10min.csv')
models.setupModel(0, "model.json", "model.h5", 22, 0)
pred = models.predict(0,500)
models.addRow(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)
pred = models.predict(0,500)
pyplot.figure()
pyplot.plot(pred, 'r', label = 'Prediction')
pyplot.show()
