# predDB.py

import mysql.connector
from mysql.connector import Error, MySQLConnection
import json

class database(object):

    def __init__(self, numRide):
        self.conn = self.connect()
        self.numRide = numRide
        self.data = {}


    def writeToJSONFile(self, path, filename, data):
        filePathNameWExt = './' + path + '/' + filename + '.json'
        with open(filePathNameWExt, 'a') as fp:
            json.dump(data, fp, sort_keys=True, indent=4)

    def connect(self):
        """connect to MySQL database"""
        try:
            conn = mysql.connector.connect(host='localhost', database='testDB',user='root',password='#ChandraIsGr8')
            if conn.is_connected():
                print("Connected to mySQL database")
            return conn;

        except Error as e:
            print(e)

    def disconnect(self, conn):
        """disconnect from MySQL database"""
        try:
            conn.close()
            if not conn.is_connected():
                print("Disconnected from mySQL database")

        except Error as e:
            print(e)

    def insertPredDataArray(self, conn, numRide, data):
        cursor = conn.cursor()
        cursor.execute(( " ride%d" % numRide ))
        pass

    def fetchPredDataArray(self, conn, numRide, data):
        try:
            cursor = conn.cursor()
            cursor.execute(( "SELECT Prediction FROM ride%d" % numRide ))

            plottableData = []

            row = cursor.fetchone()
            predData = row[0]

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
    DB2 = database(0)
    DB.fetchPredDataArray(DB.conn, DB.numRide, DB.data)
    DB2.fetchPredDataArray(DB.conn, DB.numRide, DB.data)
    DB.disconnect(DB.conn)
