from pandas import read_csv
from datetime import datetime
from matplotlib import pyplot

# Load Data
#def parse(x):
#    return datetime.strptime(x, '%Y %m')
#dataset = read_csv('C:\\Users\\denve\\OneDrive\\Documents\\MLData\\DL\\5rides-basic.csv',  parse_dates = [['year','month']], index_col=0, date_parser=parse)
#dataset.drop('ride-0', axis=1, inplace=True)
#dataset.drop('ride-1', axis=1, inplace=True)
#dataset.drop('ride-2', axis=1, inplace=True)
#dataset.drop('ride-3', axis=1, inplace=True)
#dataset.drop('ride-4', axis=1, inplace=True)
# Manually specify column names
#dataset.columns = ['Month Day', 'Week day', 'Hour', 'Minute', 'DLR Open', 'DCA Open', 'DLR Close', 'DCA Close', 'Wait Ride 0', 'Open Ride 0', 'Wait Ride 1', 'Open Ride 1', 'Wait Ride 2', 'Open Ride 2', 'Wait Ride 3', 'Open Ride 3', 'Wait Ride 4', 'Open Ride 4']
#dataset.index.name = 'date'
# Save to file
#dataset.to_csv('DLDataFormated.csv')

# Load dataset

dataset = read_csv('DLDataFormated.csv', header=0, index_col=0)
values = dataset.values

# Specify columns to plot

groups = [0, 1, 2, 8, 9, 10, 11, 12, 13, 14, 15, 16]
i = 1

# Plot each column

pyplot.figure()
for group in groups:
    pyplot.subplot(len(groups), 1, i)
    pyplot.plot(values[:, group])
    pyplot.title(dataset.columns[group], y = 0.5, loc='right')
    i+=1

pyplot.show()
