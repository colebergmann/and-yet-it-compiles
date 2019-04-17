# Historical Data
Various data exports we will use to train our machine learning algorithm. Data points where rides are down for maintenance mid-day are ignored. Samples are averaged.

## [5rides-basic.csv](./5rides-basic.csv)
---
Contains most basic park info along with 5 rides.

Fields:
* Year
* Month
* Day of month
* Day of week (1-7)
* Hour of day (~8-23), 15 minute increments
* Minute (0,15,30,45)
* dlr_open: Hour Disneyland opens
* dca_open: Hour California Adventure opens
* dlr_close: Hour Disneyland closes (00 represents midnight)
* dca_close: Hour California Adventure closes (00 represnets midnight)
* ride-0: ID for ride 0 (always 353405, which is Pirates)
* wait-0: Wait minutes for ride-0
* open-0: Status of ride-0 (1 for open, 0 for closed)
* ride-1: ID for ride 1 (always 353293, which is Autopia)
* wait-1: Wait minutes for ride-1
* open-1: Status of ride-1 (1 for open, 0 for closed)
* ride-2: ID for ride 1 (always 353347, which is Haunted Mansion)
* wait-2: Wait minutes for ride-1
* open-2: Status of ride-1 (1 for open, 0 for closed)
* ride-3: ID for ride 3 (always 353435, which is Space Mountain)
* wait-3: Wait minutes for ride-3
* open-3: Status of ride-3 (1 for open, 0 for closed)
* ride-4: ID for ride 4 (always 353435, which is Splash Mountain)
* wait-4: Wait minutes for ride-4
* open-4: Status of ride-4 (1 for open, 0 for closed)