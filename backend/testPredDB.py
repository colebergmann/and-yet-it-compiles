# testPredDB.py

import json
import sys
import time
import predDB as db


if __name__ == '__main__':
    DB = db.database()

    DB.formatLiveData(42)