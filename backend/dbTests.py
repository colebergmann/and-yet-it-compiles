# dbTests.py
import predDB

def testConnect(db):
    try:
        db.connect()
    except Error as e:
        sys.exit(1)

if __name__ == '__main__':
    DB = predDB.database(0)
    testConnect(DB)
    DB = predDB.database(1)
    testConnect(DB)
    DB = predDB.database(2)
    testConnect(DB)
    DB = predDB.database(3)
    testConnect(DB)
    DB = predDB.database(4)
    testConnect(DB)
    DB = predDB.database(5)
    testConnect(DB)
    DB = predDB.database(6)
    testConnect(DB)
    DB = predDB.database(7)
    testConnect(DB)
    DB = predDB.database(8)
    testConnect(DB)
    DB = predDB.database(9)
    testConnect(DB)
