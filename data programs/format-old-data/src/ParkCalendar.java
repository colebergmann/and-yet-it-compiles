import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/*
    ParkCalendar
    This class is instantiated once and handles everything related to park opening and closing hours.
    Internally, it stores a hashmap of keys (dates) and values (CalendarEntries) for every date we have a record for.
 */

public class ParkCalendar {

    HashMap<String, CalendarEntry> map;

    //Constructor
    public ParkCalendar() {
        map = new HashMap<String, CalendarEntry>();
    }

    //Add a date to the Calendar. Key should be a date in the following format: yyyy-MM-dd
    public void addDate(int parkId, String key, Date open, Date close) {
        //Check if we already have a CalendarEntry for the given date. If not, create a blank one.
        if (!map.containsKey(key)) {
            map.put(key, new CalendarEntry());
        }
        //Update open and closing times for a specific park
        map.get(key).setDate(parkId, open, close);
    }

    //Check if a given park is open on a certain date
    public boolean isParkOpen(int parkId, Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String d = sdf.format(date);
        if (!map.containsKey(d)) {
            return false;
        }
        return map.get(d).isParkOpen(parkId, date);
    }

    //Get the opening time for a specific park on a date
    public Date getParkOpening(int parkId, Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String d = sdf.format(date);
        return map.get(d).getOpening(parkId);
    }

    //Get the closing time for a specific park on a date
    public Date getParkClosing(int parkId, Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String d = sdf.format(date);
        return map.get(d).getClosing(parkId);
    }

    //Get the opening hour as a string (0-23) of a specific park
    public String getParkOpeningHour(int parkId, Date date) {
        Date d = getParkOpening(parkId, date);
        SimpleDateFormat sdf = new SimpleDateFormat("HH");
        return sdf.format(d);
    }

    //Get the closing hour as a string (0-23) of a specific park
    public String getParkClosingHour(int parkId, Date date) {
        Date d = getParkClosing(parkId, date);
        SimpleDateFormat sdf = new SimpleDateFormat("HH");

        //We need to handle the case where closingTime is 23:59:59, because that is midnight.
        SimpleDateFormat sdf2 = new SimpleDateFormat("mm");
        if (sdf2.format(d).equalsIgnoreCase("59")) {
            return "00";
        }
        return sdf.format(d);
    }

    public DailyWeather getDailyWeather(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return map.get(sdf.format(date)).getDailyWeather();
    }


    @Override
    public String toString() {
        String result = "";
        for (Map.Entry<String, CalendarEntry> entry : map.entrySet()) {
            result += "ON date:" + entry.getKey() + " Hours: " + entry.getValue() + "\n";
        }
        return result;
    }
}
