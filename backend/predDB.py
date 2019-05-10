# predDB.py
import sys
sys.path.insert(0, "./MLimports")
import myModels as mm
import mysql.connector
from mysql.connector import Error, MySQLConnection
import json
from pympler.tracker import SummaryTracker
import time

class database(object):

    def __init__(self):
        self.conn = self.connect()
        self.data = {}
        self.model = mm.myModels("../../LiveData/data.csv")
        # modelTimes = [3,6,12,24,90]
        # for i in range(10):
        #     for j in range(5):
        #         self.model.setupModel(5 * i + j, "./MLimports/Saved Models/model_%d%d.json" % (i, modelTimes[j]), "./MLimports/Saved Models/model_%d%d.h5" % (i, modelTimes[j]), i )
    
    def setData(self, data):
        self.data = data

    def getData(self):
        return self.data

    def formatRidePredictions(self, numRide):
        predictions = [None] * 90
        modelTimes = [3,6,12,24,90]
        for j in range(5):
            if (j > 0):
                predictions[j] = list(self.model.predict(modelTimes[j] - modelTimes[j-1]))
                predictions[j-1].extend(predictions[j])
                predictions[j] = predictions[j-1]
            else:
                predictions[j] = list(self.model.predict(modelTimes[j]))
        return predictions[4]

    def formatNewPredictions(self, numRide):
        newPredictions = [None] * 5
        modelTimes = [3,6,12,24,90]
        for j in range(5):
            newPredictions[j] = list(self.model.predict(1))[0]
        return newPredictions

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
        print("in updatePredData")
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

    def fetchAllPredDataArray(self, conn,):
        for i in range(10):
            try:
                cursor = conn.cursor()
                cursor.execute(( "SELECT Predictions FROM ride%d ORDER BY ID ASC" % i ))


                plottableData = []

                row = cursor.fetchone()

                while row is not None:
                    predData = row[0]
                    plottableData.append(predData)
                    row = cursor.fetchone()

            except Error as e:
                print(e)

            self.data[i] = plottableData

            self.writeToJSONFile("", "api", self.data)
            
            cursor.close()

if __name__ == '__main__':
    DB = database()
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
        for i in range(10):
            for j in range(5):
                 self.model.setupModel("./MLimports/Saved Models/model_%d%d.json" % (i, modelTimes[j]), "./MLimports/Saved Models/model_%d%d.h5" % (i, modelTimes[j]), i )
                DB.updatePredData(DB.conn, i, DB.formatNewPredictions(i))
        DB.fetchAllPredDataArray(DB.conn)
        print("Going to sleep. Goodnight")
        time.sleep(600)
        print("Goodmorning. Updating...")