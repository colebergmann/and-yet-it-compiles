# predDB.py

import mysql.connector
from mysql.connector import Error, MySQLConnection

def connect():
    """connect to MySQL database"""
    try:
        conn = mysql.connector.connect(host='localhost', database='testDB',user='root',password='#ChandraIsGr8')
        if conn.is_connected():
            print("Connected to mySQL database")
        return conn;

    except Error as e:
        print(e)

def disconnect(conn):
    """disconnect from MySQL database"""
    try:
        conn.close()
        if not conn.is_connected():
            print("Disconnected from mySQL database")

    except Error as e:
        print(e)

def queryWithFetchone(conn):
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT Prediction FROM ride0")

        plottableData = []

        row = cursor.fetchone()

        while row is not None:
            plottableData.append(row)
            row = cursor.fetchone()

    except Error as e:
        print(e)

    for i in range(len(plottableData)):
        print(plottableData[i])
    cursor.close()


if __name__ == '__main__':
    conn = connect()
    queryWithFetchone(conn)
    disconnect(conn)
