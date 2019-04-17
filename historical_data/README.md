# Historical Data
Various data exports we will use to train our machine learning algorithm. Data points where rides are down for maintenance mid-day are ignored. Samples are averaged.

## [5rides-basic.csv](./5rides-basic.csv)

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
* dca_close: Hour California Adventure closes (00 represents midnight)
* ride-(0-4): ID for specified ride. 0 is 353405 (Pirates), 1 is 353293 (Autopia), 2 is 353347 (Haunted Mansion), 3 is 353435 (Space Mountain), 4 is 353437 (Splash Mountain)
* wait-(0-4): Wait minutes for specified ride
* open-(0-4): Status of specified ride (1 for open, 0 for closed)


## [2018-population.csv](./2018-population.csv)
Contains the normalized park "busyness" level on a scale of 1-100. This was calculated by taking the max wait time for several popular rides on a given day and averaging their waits. This was then normalized to 100 using the maximum time found.

Fields:
* Date (as yyyy-MM-dd)
* Wait (from 1-100, 100 being busiest)