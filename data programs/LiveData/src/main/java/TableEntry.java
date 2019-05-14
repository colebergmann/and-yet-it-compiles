import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

// TableEntry is a data structure that holds one line of our data table
public class TableEntry {

    private static int RIDE_AMOUNT = 10;                // Amount of rides we expect to hold
    private static int STATICS_AMOUNT = 15;             // Amount of static params (Explicitly listed below)

    private int year;
    private int month;
    private int day_of_month;
    private int day_of_week;
    private int hour_of_day;
    private int minute;
    private int dlr_open;
    private int dca_open;
    private int dlr_close;
    private int dca_close;
    private double weather_daily_temperatureHigh;
    private double weather_daily_temperatureLow;
    private double weather_daily_precipProbability;
    private double weather_hourly_temperature;
    private double weather_hourly_precipProbability;
    private ArrayList<String> rideIds = new ArrayList<>();      // Array of ride IDs
    private ArrayList<Integer> waitTimes = new ArrayList<>();   // Array of wait times
    private ArrayList<Integer> rideOpen = new ArrayList<>();        // Array of indicator nums (1=open, 0=closed)

    // Default constructor - Initialize date variables
    public TableEntry() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        year = cal.get(Calendar.YEAR);
        month = cal.get(Calendar.MONTH) + 1;
        day_of_month = cal.get(Calendar.DAY_OF_MONTH);
        day_of_week  = cal.get(Calendar.DAY_OF_WEEK);
        hour_of_day = cal.get(Calendar.HOUR_OF_DAY);
        minute = cal.get(Calendar.MINUTE);
    }

    //Construct from a csv string
    public TableEntry(String input) throws Exception {
        //First, sanity check the input
        int numCommas = input.replaceAll("[^,]","").length();
        int expectedCommas = RIDE_AMOUNT*3 + STATICS_AMOUNT - 1;
        if (numCommas != expectedCommas) {
            throw new Exception("Invalid csv string passed into constructor. Expected " + expectedCommas + ", got " + numCommas);
        }
        parseLine(input);
    }

    //Update park hours
    void setParkHours(ParkHours ph) {
        dlr_open = ph.getDlOpenHour();
        dlr_close = ph.getDlCloseHour();
        dca_open = ph.getDcaOpenHour();
        dca_close = ph.getDcaCloseHour();
    }

    //Update weather
    public void setWeather(double dayHigh, double dayLow, double dayPrecip, double currentTemp, double currentPrecip) {
        weather_daily_temperatureHigh = dayHigh;
        weather_daily_temperatureLow = dayLow;
        weather_daily_precipProbability = dayPrecip;
        weather_hourly_temperature = currentTemp;
        weather_hourly_precipProbability = currentPrecip;
    }

    //Getters
    public int getYear() { return year; }
    public int getMonth() { return month;}
    public int getDayOfMonth() {return day_of_month;}

    public int getWaitForRide(String rideId) {
        if (rideIds.contains(rideId)) {
            return waitTimes.get(rideIds.indexOf(rideId));
        }
        return 0;
    }

    public int isRideOpen(String rideId) {
        if (rideIds.contains(rideId)) {
            return rideOpen.get(rideIds.indexOf(rideId));
        }
        return 0;
    }

    //Add a ride
    public void addRide(String rideId, int waitTime, boolean open) {
        rideIds.add(rideId);
        waitTimes.add(waitTime);
        if (open) {
            rideOpen.add(1);
        } else {
            rideOpen.add(0);
        }
    }

    //serialize this to a csv line
    public String exportAsCSV() {
        StringBuilder result = new StringBuilder();
        Object[] objs = new Object[] {
                year, month, day_of_month, day_of_week, hour_of_day, minute, dlr_open, dca_open,
                dlr_close, dca_close, weather_daily_temperatureHigh, weather_daily_temperatureLow, weather_daily_precipProbability,
                weather_hourly_temperature, weather_hourly_precipProbability
        };
        for (Object o : objs) {
            result.append(o.toString());
            result.append(", ");
        }
        for (int i = 0; i < rideIds.size(); i++) {
            result.append(rideIds.get(i));
            result.append(", ");
            result.append(waitTimes.get(i));
            result.append(", ");
            result.append(rideOpen.get(i));

            if (i != rideIds.size() - 1) {
                result.append(", ");
            }
        }
        return result.toString();
    }

    //Parse a csv string and update all the relevant table variables
    private void parseLine(String input) {
        String[] cols = input.split(",");

        //Parse the static vars
        year = Integer.parseInt(cols[0].trim());
        month = Integer.parseInt(cols[1].trim());
        day_of_month = Integer.parseInt(cols[2].trim());
        day_of_week = Integer.parseInt(cols[3].trim());
        hour_of_day = Integer.parseInt(cols[4].trim());
        minute = Integer.parseInt(cols[5].trim());
        dlr_open = Integer.parseInt(cols[6].trim());
        dca_open = Integer.parseInt(cols[7].trim());
        dlr_close = Integer.parseInt(cols[8].trim());
        dca_close = Integer.parseInt(cols[9].trim());
        weather_daily_temperatureHigh = Double.parseDouble(cols[10].trim());
        weather_daily_temperatureLow = Double.parseDouble(cols[11].trim());
        weather_daily_precipProbability = Double.parseDouble(cols[12].trim());
        weather_hourly_temperature = Double.parseDouble(cols[13].trim());
        weather_hourly_precipProbability = Double.parseDouble(cols[14].trim());

        //Parse each ride
        int i = 15;
        while (i < cols.length) {
            rideIds.add(cols[i].trim());
            waitTimes.add(Integer.parseInt(cols[i+1].trim()));
            rideOpen.add(Integer.parseInt(cols[i+2].trim()));
            i += 3;
        }
    }

    @Override
    public String toString() {
        StringBuilder result =  new StringBuilder("Year: " + year + ", Month: " + month + ", Day of month: " + day_of_month + ", Day of week: " +
                day_of_week + ", Hour: " + hour_of_day + ", Minute: " + minute + ", dlr_open: " + dlr_open + ", dca_open: " +
                dca_open + ", dlr_close: " + dlr_close + ", dca_close: " + dca_close + ", weather_daily_temperatureHigh: " +
                weather_daily_temperatureHigh + ", weather_daily_temperatureLow: " + weather_daily_temperatureLow +
                ", weather_daily_precipProbability: " + weather_daily_precipProbability + ", weather_hourly_temperature: " +
                weather_hourly_temperature + ", weather_hourly_precipProbability: " + weather_hourly_precipProbability + "\n[");
        for (int i = 0; i < rideIds.size(); i++) {
            result.append("(");
            result.append(rideIds.get(i));
            result.append(",");
            result.append(waitTimes.get(i));
            result.append(",");
            result.append(rideOpen.get(i));
            result.append(") ");
        }
        result.append("]");
        return result.toString();
    }
}
