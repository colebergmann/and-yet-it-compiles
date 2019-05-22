from myModelsNew import myModels
from matplotlib import pyplot
import time
import numpy as np

model = myModels('data2.csv')
files = ['model_03.json','model_03.h5','model_06.json','model_06.h5','model_012.json','model_012.h5','model_024.json','model_024.h5','model_090.json','model_090.h5','model_13.json','model_13.h5','model_16.json','model_16.h5','model_112.json','model_112.h5','model_124.json','model_124.h5','model_190.json','model_190.h5','model_23.json','model_23.h5','model_26.json','model_26.h5','model_212.json','model_212.h5','model_224.json','model_224.h5','model_290.json','model_290.h5','model_33.json','model_33.h5','model_36.json','model_36.h5','model_312.json','model_312.h5','model_324.json','model_324.h5','model_390.json','model_390.h5','model_43.json','model_43.h5','model_46.json','model_46.h5','model_412.json','model_412.h5','model_424.json','model_424.h5','model_490.json','model_490.h5','model_53.json','model_53.h5','model_56.json','model_56.h5','model_512.json','model_512.h5','model_524.json','model_524.h5','model_590.json','model_590.h5','model_63.json','model_63.h5','model_66.json','model_66.h5','model_612.json','model_612.h5','model_624.json','model_624.h5','model_690.json','model_690.h5','model_73.json','model_73.h5','model_76.json','model_76.h5','model_712.json','model_712.h5','model_724.json','model_724.h5','model_790.json','model_790.h5','model_83.json','model_83.h5','model_86.json','model_86.h5','model_812.json','model_812.h5','model_824.json','model_824.h5','model_890.json','model_890.h5','model_93.json','model_93.h5','model_96.json','model_96.h5','model_912.json','model_912.h5','model_924.json','model_924.h5','model_990.json','model_990.h5']
model.load_files(files)

model.fill()
pred = model.getRidePrediction(9)

pyplot.figure()
pyplot.plot(pred)
pyplot.show()
