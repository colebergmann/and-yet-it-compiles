from myModels import myModels
from matplotlib import pyplot
import time

model = myModels('data.csv')
start = time.time()
for i in range(50):
    model.setupModel("model_03.json", "model_03.h5")
    print(i)
end = time.time() - start

##pyplot.figure()
##pyplot.plot(pred, 'r', label = 'Prediction')
##pyplot.show()
