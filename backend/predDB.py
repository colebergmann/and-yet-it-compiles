# predDB.py
import json
import sys
import time
import math

sys.path.insert(0, "./MLimports")

import myModels as mm
import myModelsPop as mmp
import mysql.connector
from mysql.connector import Error, MySQLConnection
 

class database(object):

    def __init__(self):
        self.conn = self.connect()
        self.data = {}
        self.model = mm.myModels("../../LiveData/data.csv")
        self.popModel = mmp.myModels("../../LiveData/park_population.csv")
        self.lines = 0
        self.modelTimes = [3,6,12,24,90]
        self.modelDays = [7, 14, 21, 28]
        self.liveData = [None] * 10
        self.minuteIndex = 0
        self.newPredictions = [None] * 5
        self.newPopulations = [None] * 4
        # for i in range(10):
        #     for j in range(5):
        #         self.model.setupModel(5 * i + j, "./MLimports/Saved Models/model_%d%d.json" % (i, modelTimes[j]), "./MLimports/Saved Models/model_%d%d.h5" % (i, modelTimes[j]), i )
    
    def setData(self, data):
        self.data = data

    def getData(self):
        return self.data

    def parse(self, x):
        return mm.datetime.strptime(x, '%Y %m')
        
    def formatCSV(self, filename):
        dataset = mm.read_csv(filename,  parse_dates = [['year','month']], index_col=0, date_parser=self.parse)
        dataset.drop('ride-0', axis=1, inplace=True)
        dataset.drop('ride-1', axis=1, inplace=True)
        dataset.drop('ride-2', axis=1, inplace=True)
        dataset.drop('ride-3', axis=1, inplace=True)
        dataset.drop('ride-4', axis=1, inplace=True)
        dataset.drop('ride-5', axis=1, inplace=True)
        dataset.drop('ride-6', axis=1, inplace=True)
        dataset.drop('ride-7', axis=1, inplace=True)
        dataset.drop('ride-8', axis=1, inplace=True)
        dataset.drop('ride-9', axis=1, inplace=True)
        dataset.drop('day_of_month', axis=1, inplace=True)
        dataset.drop('minute', axis=1, inplace=True)
        dataset.drop('dlr_open', axis=1, inplace=True)
        dataset.drop('dca_open', axis=1, inplace=True)
        dataset.drop('dlr_close', axis=1, inplace=True)
        dataset.drop('dca_close', axis=1, inplace=True)
        dataset.drop('weather_daily_temperatureHigh', axis=1, inplace=True)
        dataset.drop('weather_daily_temperatureLow', axis=1, inplace=True)
        dataset.drop('weather_daily_precipProbability', axis=1, inplace=True)
        dataset.columns = ['Week day', 'hour', 'Temp', 'Precip', 'Wait Ride 0', 'Open Ride 0', 'Wait Ride 1', 'Open Ride 1', 'Wait Ride 2', 'Open Ride 2', 'Wait Ride 3', 'Open Ride 3', 'Wait Ride 4', 'Open Ride 4', 'Wait Ride 5', 'Open Ride 5', 'Wait Ride 6', 'Open Ride 6', 'Wait Ride 7', 'Open Ride 7', 'Wait Ride 8', 'Open Ride 8', 'Wait Ride 9', 'Open Ride 9']
        dataset.index.name = 'date'

        values = dataset.values
        # convert data to int
        values = values.astype('int')
        return values

    def formatLiveData(self):
        self.minuteIndex = int((math.floor(int(time.ctime().split(" ")[3].split(":")[0]) * 60 + int(time.ctime().split(" ")[3].split(":")[1])) - 480) / 10)
        live = self.formatCSV("../../LiveData/data.csv")
        for i in range(10):
            liveArray = []
            for j in range(0, self.minuteIndex):
                liveArray.append(int(live[(len(live) - self.minuteIndex ) + j][i*2 + 4]))
            self.liveData[i] = liveArray

    def formatRidePredictions(self, numRide):
        predictions = [None] * 5
        for j in range(5):
            if (j > 0):
                predictions[j] = list(self.model.predict(numRide, self.modelTimes[j] - self.modelTimes[j-1]))
                tempPredictions = predictions[j-1]
                tempPredictions.extend(predictions[j])
                predictions[j] = tempPredictions
            else:
                predictions[j] = list(self.model.predict(numRide, self.modelTimes[j]))
        return predictions[4]

    def formatLastPrediction(self, numRide):
        lastPrediction = list(self.model.predict(numRide, 1))[0]
        return lastPrediction

    def formatPopulation(self):
        populations = [None] * 4
        for i in range(4):
            if (i > 0):
                populations[i] = list(self.popModel.predict(self.modelDays[j] - self.modelDays[j-1]))
                tempPop = populations[i-1]
                tempPop.extend(populations[i])
                populations[i] = tempPop
            else:
                populations[i] = list(self.popModel.predict(self.modelDays[i]))
        return populations[3]

    def formatNewPopulation(self, k):
        self.newPopulations[k] = list(self.popModel.predict(1))[0]

    def formatLastPopulation(self):
        lastPop = list(self.popModel.predict(1))[0]
        return lastPop

    def formatNewPredictions(self, numRide, j):
        self.newPredictions[j] = list(self.model.predict(numRide, 1))[0]

    def writeToJSONFile(self, path, filename, data):
        filePathNameWExt = './' + path + '/' + filename + '.json'
        with open(filePathNameWExt, 'w') as fp:
            json.dump(data, fp, sort_keys=True, indent=4)

    def connect(self):
        """connect to MySQL database"""
        try:
            conn = mysql.connector.connect(host='localhost', database='cs48',user='cs48',password='ThisIsASuperSecurePassword1234!!')
            if conn.is_connected():
                print("Connected to mySQL database")
            return conn

        except Error as e:
            print(e)
            raise

    def disconnect(self, conn):
        """disconnect from MySQL database"""
        try:
            conn.close()
            if not conn.is_connected():
                print("Disconnected from mySQL database")

        except Error as e:
            print(e)

    def insertPredData(self, conn, numRide, predictions):
        cursor = conn.cursor()
        for i in range(len(predictions)):
            prediction = int(predictions[i])
            cursor.execute( "INSERT INTO ride%d (ID, Predictions) VALUES (%d, %d)" % (numRide, i,  prediction) )
        self.conn.commit()
        print("predictions inserted into database")
        cursor.close()

    def updatePopData(self, conn, newPopData):
        cursor = conn.cursor()
        cursor.execute("DELETE FROM population WHERE DAY = 0")
        for i in range(89):
            cursor.execute("UPDATE population SET DAY = %d WHERE DAY = (%d + 1)" % (i, i))
        cursor.execute("UPDATE population SET Population = %d WHERE DAY = 6" % (self.newPopulations[0]))
        cursor.execute("UPDATE population SET Population = %d WHERE DAY = 13" % (self.newPopulations[1]))
        cursor.execute("UPDATE population SET Population = %d WHERE DAY = 20" % (self.newPopulations[2]))
        cursor.execute("INSERT INTO population VALUES (27, %d)" % (self.newPopulations[3]))
        self.conn.commit()
        cursor.close()

    def updatePredData(self, conn, numRide, newPredData):
        cursor = conn.cursor()
        cursor.execute("DELETE FROM ride%d WHERE ID = 0" % numRide)
        for i in range(89):
            cursor.execute("UPDATE ride%d SET ID = %d WHERE ID = (%d + 1)" % (numRide, i, i))
        cursor.execute("UPDATE ride%d SET Predictions = %d WHERE ID = 2" % (numRide, newPredData[0]))
        cursor.execute("UPDATE ride%d SET Predictions = %d WHERE ID = 5" % (numRide, newPredData[1]))
        cursor.execute("UPDATE ride%d SET Predictions = %d WHERE ID = 11" % (numRide, newPredData[2]))
        cursor.execute("UPDATE ride%d SET Predictions = %d WHERE ID = 23" % (numRide, newPredData[3]))
        cursor.execute("INSERT INTO ride%d VALUES (89, %d)" % (numRide, newPredData[4]))
        self.conn.commit()
        cursor.close()
    
    def updateJustLast(self, conn, numRide, lastPrediction):
        cursor = conn.cursor()
        cursor.execute("DELETE FROM ride%d WHERE ID = 0" % numRide)
        for i in range(89):
            cursor.execute("UPDATE ride%d SET ID = %d WHERE ID = (%d + 1)" % (numRide, i, i))
        cursor.execute("INSERT INTO ride%d VALUES (89, %d)" % (numRide, lastPrediction))
        self.conn.commit()
        cursor.close()

    def fetchPredDataArray(self, conn, numRide):
        try:
            cursor = conn.cursor()
            cursor.execute(( "SELECT Predictions FROM ride%d ORDER BY ID ASC" % numRide ))

            plottableData = []

            row = cursor.fetchone()

            while row is not None:
                predData = row[0]
                plottableData.append(predData)
                row = cursor.fetchone()

        except Error as e:
            print(e)

        self.data[numRide] = plottableData

        self.writeToJSONFile("", "api", self.data)
        
        cursor.close()

    def fetchAllPredDataArray(self, conn):
        try:
                cursor = conn.cursor()
                cursor.execute(( "SELECT Population FROM population ORDER BY DAY ASC"))


                newPop = []

                row = cursor.fetchone()

                while row is not None:
                    predPop = row[0]
                    newPop.append(predPop * 167)
                    row = cursor.fetchone()

        except Error as e:
             print(e)


        self.data[10] = newPop
        self.formatLiveData()
        for i in range(10):
            try:
                cursor = conn.cursor()
                cursor.execute(( "SELECT Predictions FROM ride%d ORDER BY ID ASC" % i ))


                plottableData = []

                row = cursor.fetchone()

                while row is not None:
                    predData = row[0]
                    if predData < 5:
                        predData = 5
                    plottableData.append(predData)
                    row = cursor.fetchone()

            except Error as e:
                print(e)
            
            dataArray = [0 for x in range(90)]

            for j in range(self.minuteIndex):
                dataArray[j] = self.liveData[i][j]

            for k in range(self.minuteIndex, 90):
                dataArray[k] = plottableData[k - self.minuteIndex]

            self.data[i] = dataArray
            
            self.writeToJSONFile("", "api", self.data)
            
            cursor.close()

if __name__ == '__main__':
    DB = database()
    # populations = [None] * 30
    # for k in range(30):
    #     populations[k] = 42
    # DB.insertPredData(DB.conn, 0, DB.formatRidePredictions(0) )
    # DB.fetchPredDataArray(DB.conn, 0)
    # DB.insertPredData(DB.conn, 1, DB.formatRidePredictions(1) )
    # DB.fetchPredDataArray(DB.conn, 1)
    # DB.insertPredData(DB.conn, 2, DB.formatRidePredictions(2) )
    # DB.fetchPredDataArray(DB.conn, 2)
    # DB.insertPredData(DB.conn, 3, DB.formatRidePredictions(3) )
    # DB.fetchPredDataArray(DB.conn, 3)
    # DB.insertPredData(DB.conn, 4, DB.formatRidePredictions(4) )
    # DB.fetchPredDataArray(DB.conn, 4)
    # DB.insertPredData(DB.conn, 5, DB.formatRidePredictions(5) )
    # DB.insertPredData(DB.conn, 6, DB.formatRidePredictions(6) )
    # DB.insertPredData(DB.conn, 7, DB.formatRidePredictions(7) )
    # DB.insertPredData(DB.conn, 8, DB.formatRidePredictions(8) )
    # DB.insertPredData(DB.conn, 9, DB.formatRidePredictions(9) )
    while (True):
        while (DB.model.getDataLength() == DB.lines):
            DB.model.loadCSV("../../LiveData/data.csv")
            print("Waiting for updated CSV")
            time.sleep(10)
        DB.lines = DB.model.getDataLength()
        if ((math.floor(int(time.ctime().split(" ")[3].split(":")[0]) * 60 + int(time.ctime().split(" ")[3].split(":")[1])) - 480) < 0):
            for k in range(4):
                DB.popModel.setupModel("./MLimports/model_p%d.json" % (DB.modelDays[k]), "./MLimports/model_p%d.h5" % (DB.modelDays[k]))
                DB.formatNewPopulation(k)
            DB.updatePopData(DB.conn, DB.newPopulations)
        for i in range(10):
            for j in range(5):
                DB.model.setupModel("./MLimports/Saved Models/model_%d%d.json" % (i, DB.modelTimes[j]), "./MLimports/Saved Models/model_%d%d.h5" % (i, DB.modelTimes[j])) 
                print(5 * i + j)
                DB.formatNewPredictions(i, j)
            DB.updatePredData(DB.conn, i, DB.newPredictions)
        DB.fetchAllPredDataArray(DB.conn)
        DB.liveData = [None] * 10