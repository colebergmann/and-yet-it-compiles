import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

public class Main {


    public static void main(String[] args) throws ParseException {

        //Define what rides we want to run this program on
        ArrayList<String> rideIds = new ArrayList<String>();
        rideIds.add("353405");  //Pirates
        rideIds.add("353293");  //Autopia
        rideIds.add("353347"); // Haunted Mansion
        rideIds.add("353435");  //Space
        rideIds.add("353437");   //Splash
        rideIds.add("16514416"); //Radiator Springs
        rideIds.add("353295");  //Thunder
        rideIds.add("353451"); //Guardians
        rideIds.add("353431"); //Soarin

        //Define the date range we want to export for
        String startDate = "2017-11-15";
        //String startDate = "2019-4-12";
        String endDate = "2019-4-15";

        //Instantiate SQLWrapper with our DB credentials
        SQLWrapper sql = new SQLWrapper("jdbc:mysql://localhost:32769/disney", "root", "root");

        createRideHistoryCSV(sql,rideIds, startDate, endDate, "/Users/cole/Desktop/bigrun.csv");
        //createHistoricalParkPopulationCSV(sql, rideIds, startDate, endDate, "/Users/Cole/Desktop/2018-population.csv");
    }


    /*
        createHistoricalParkPopulationCSV
        This function gets the max wait time for a set of rides and averages them together.
        Finally, it normalizes all values to max at 100

     */
    public static void createHistoricalParkPopulationCSV(SQLWrapper sql, ArrayList<String> rideIds,
                                                         String startDateString, String endDateString, String filename) {

        //Get park calendar
        ParkCalendar parkCal = sql.getParkCalendar();

        //Get rides
        HashMap<String, Ride> ridesMap = sql.getRides(parkCal, rideIds);

        Date startDate = new Date();
        Date endDate = new Date();
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        //parse the date strings
        try {
            startDate = sdf.parse(startDateString);
            endDate = sdf.parse(endDateString);
            cal.setTime(startDate);
        } catch (Exception e) {
            System.out.println("Unable to parse times");
            System.out.println(e.getCause());
            e.printStackTrace();
            System.exit(1);
        }

        ArrayList<Integer> times = new ArrayList<>();
        ArrayList<Date> dates = new ArrayList<>();
        int max = 0;

        //Iterate over every day
        while (cal.getTime().before(endDate)) {
            int totalMins = 0;
            int openRides = 0;

            for (String rid : ridesMap.keySet()) {
                int maxWait = ridesMap.get(rid).getMaxWaitOn(cal.getTime());
                if (maxWait > 0) {
                    totalMins += maxWait;
                    openRides += 1;
                }
            }
            int avgTime = totalMins/openRides;
            times.add(avgTime);
            if (avgTime > max) {
                max = avgTime;
            }
            dates.add(cal.getTime());
            cal.add(Calendar.HOUR_OF_DAY, 24);
        }

        System.out.println("Max: " + max);

        //Loop again to write to the CSV
        CSVWriter csv = new CSVWriter();
        for (int i = 0; i < times.size(); i++) {
            csv.addItem("date", sdf.format(dates.get(i)));
            csv.addItem("wait", (int)(times.get(i)*100.0)/max );
            csv.nextLine();
        }

        try {
            csv.writeToFile(filename);
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }

    }

    /*
        CreateRideHistoryCSV
        Requires a valid SQLWrapper instance, arraylist of rideIds, startDate, endDate, and a filename to write the final csv content to

        This function samples all the given rides every 15 minutes and, along with relevant static data like date
        information and park hours, adds them to a row in the CSV file. When complete, this function saves the data
        in the requested CSV file.e
     */
    public static void createRideHistoryCSV(SQLWrapper sql, ArrayList<String> rideIds,
                                            String startDate, String endDate, String filename) {
        //Get park calendar
        ParkCalendar parkCal = sql.getParkCalendar();

        //Get rides
        HashMap<String, Ride> ridesMap = sql.getRides(parkCal, rideIds);

        //Instantiate CSVWriter
        CSVWriter csv = new CSVWriter();

        //Create the calendar we will increment for the loop
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Calendar cal = Calendar.getInstance();

        //Parse our start and end dates
        Date endDateParsed = new Date();
        try {
            cal.setTime(sdf.parse(startDate + " 05:00"));
            endDateParsed = sdf.parse(endDate + " 23:59");
        } catch (Exception e) {
            System.out.println("Unable to parse date, quitting");
            e.printStackTrace();
            System.out.println(e.getCause());
            System.exit(1);
        }


        //Iterate every 15 mins
        while (cal.getTime().before(endDateParsed)) {
            //Increment date by 15 minutes
            cal.add(Calendar.MINUTE, 5);

            //break if park is closed at this time
            if (!parkCal.isParkOpen(330339, cal.getTime())) {
                continue;
            }

            //Get weather variables
            DailyWeather dailyWeather = parkCal.getDailyWeather(cal.getTime());
            HourlyWeather hourlyWeather = dailyWeather.getHourlyWeather(cal.get(Calendar.HOUR_OF_DAY));

            //Add basic info to each line
            csv.addItem("year",cal.get(Calendar.YEAR));
            csv.addItem("month",cal.get(Calendar.MONTH) + 1);
            csv.addItem("day_of_month",cal.get(Calendar.DAY_OF_MONTH));
            csv.addItem("day_of_week",cal.get(Calendar.DAY_OF_WEEK));
            csv.addItem("hour_of_day",cal.get(Calendar.HOUR_OF_DAY));
            csv.addItem("minute",cal.get(Calendar.MINUTE));
            csv.addItem("dlr_open",parkCal.getParkOpeningHour(330339, cal.getTime()));
            csv.addItem("dca_open",parkCal.getParkOpeningHour(336894, cal.getTime()));
            csv.addItem("dlr_close",parkCal.getParkClosingHour(330339, cal.getTime()));
            csv.addItem("dca_close",parkCal.getParkClosingHour(336894, cal.getTime()));
            csv.addItem("weather_daily_temperatureHigh",dailyWeather.getTemperatureHigh());
            csv.addItem("weather_daily_temperatureLow",dailyWeather.getTemperatureLow());
            csv.addItem("weather_daily_precipProbability",dailyWeather.getPrecipProbability());
            csv.addItem("weather_hourly_temperature", hourlyWeather.getTemperature());
            csv.addItem("weather_hourly_precipProbability", hourlyWeather.getPrecipProbability());

            //iterate over rides and add relevant information
            int rideIndex = 0;    // Store the rideID so we can reference it in the csv keys
            for (String rideId : ridesMap.keySet()) {
                csv.addItem("ride-" + rideIndex, rideId);
                int waitMins = ridesMap.get(rideId).getWaitAt(cal.getTime());
                csv.addItem("wait-" + rideIndex,waitMins);
                if (waitMins == 0) {
                    csv.addItem("open-" + rideIndex, 0);
                } else {
                    csv.addItem("open-" + rideIndex, 1);
                }
                rideIndex++;
            }

            csv.nextLine();
            System.out.println("Processing date: " + cal.getTime());
        }
        System.out.println("Done! Writing to file...");

        //Save the CSV
        try {
            csv.writeToFile(filename);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println(e.getCause());
            System.exit(1);
        }
        System.out.println("Done.");
    }
}
