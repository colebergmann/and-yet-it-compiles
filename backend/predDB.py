# predDB.py
import sys
sys.path.insert(0, "./MLImports")
import myModels as mm
import mysql.connector
from mysql.connector import Error, MySQLConnection
import json

class database(object):

    def __init__(self, numRide):
        self.conn = self.connect()
        self.numRide = numRide
        self.data = {}

    def setNumRide(self, numRide):
        self.numRide = numRide

    def formatNewPredictions(numRide):
        newPredictions = []


    def writeToJSONFile(self, path, filename, data):
        filePathNameWExt = './' + path + '/' + filename + '.json'
        with open(filePathNameWExt, 'a') as fp:
            json.dump(data, fp, sort_keys=True, indent=4)

    def connect(self):
        """connect to MySQL database"""
        try:
            conn = mysql.connector.connect(host='localhost', database='cs48',user='cs48',password='ThisIsASuperSecurePassword1234!!')
            if conn.is_connected():
                print("Connected to mySQL database")
            return conn;

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
            prediction = predictions[i]
            cursor.execute(( "INSERT INTO ride%d VALUES (%d, %d)" % (numRide, i,  prediction) ))
        print("predictions inserted into database")

    def updatePredData(self, conn, numRide, newPredictions):
        cursor = conn.cursor()
        cursor.execute("DELETE FROM ride%d WHERE ID = 0" % numRide)
        for i in range(89):
            cursor.execute("UPDATE ride%d SET ID = %d WHERE ID = (%d + 1)" % (numRide, i, i))
        cursor.execute("UPDATE ride%d SET Predictions = %d WHERE ID = 2" % (numRide, newPredictions[0]))
        cursor.execute("UPDATE ride%d SET Predictions = %d WHERE ID = 5" % (numRide, newPredictions[1]))
        cursor.execute("UPDATE ride%d SET Predictions = %d WHERE ID = 11" % (numRide, newPredictions[2]))
        cursor.execute("UPDATE ride%d SET Predictions = %d WHERE ID = 23" % (numRide, newPredictions[3]))
        cursor.execute("INSERT INTO ride%d VALUES (89, %d)" % (numRide, newPredictions[4]))

    def fetchPredDataArray(self, conn, numRide, data):
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

        data[numRide] = plottableData

        self.writeToJSONFile("", "api", data)

        for i in range(len(plottableData)):
            print(plottableData[i])
        cursor.close()


if __name__ == '__main__':
    DB = database(1)
    model = mm.myModels("./MLImports/data.csv")
    model.setupModel(DB.numRide + 8, "./MLImports/model_03.json", "./MLImports/model_03.h5", 0)
    DB.insertPredData(DB.conn, DB.numRide, model.predict(DB.numRide + 8,90))
    DB.fetchPredDataArray(DB.conn, DB.numRide, DB.data)
    DB.disconnect(DB.conn)
