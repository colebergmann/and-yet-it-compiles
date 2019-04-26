#test.py
import backendAPI as be

model = be.loadModel("model.json", "weights.h5")

print(be.predictData(model))
