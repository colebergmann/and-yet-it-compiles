import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import static java.lang.Math.toIntExact;

/*
    Ride
    This class holds the ride's id and all of it's RideHistoryEntries hashed by date string (yyyy-MM-dd)
    Instantiated in the SQLWrapper class
 */

public class Ride {
    int id;
    HashMap<String, ArrayList<RideHistoryEntry>> map;

    //Constructor
    public Ride(int id) {
        this.id = id;
        map = new HashMap<String, ArrayList<RideHistoryEntry>>();
    }

    /*
        Returns the ride wait time in minutes, as an int, at a given date
        Data points where the ride is "Down" are thrown out
        If given a date before our first data point for a day, the first data point is used.
        If requesting a time in the middle of the day, get the two nearest points and return the average
        If requesting a time when the ride is closed (for the day or refurb), returns 0

        NOTE: This function is incredibly inefficient (big O of probably n^45)
        We loop through the day's RideHistoryEntries every time we request a time.
        This could probably be improved, but it's not a big priority since it's only meant to be used once.
     */
    public int getWaitAt(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String dateString = sdf.format(date);

        //Case when ride is closed (no times today)
        if (!map.containsKey(dateString)) {
            return 0;
        }

        //Get today's array and strip out:
        // - Down events
        // - Instances where wait is less than 5 and status is not Closed
        // - Instances where status is Closed and it is not the last entry for the day
        ArrayList<RideHistoryEntry> today = map.get(dateString);
        for (int i = 0; i < today.size(); i++) {
            if ((today.get(i).status.equalsIgnoreCase("Closed") && i != today.size() - 1) || (today.get(i).waitTime < 5 && !today.get(i).status.equalsIgnoreCase("Closed"))) {
                today.remove(today.get(i));
                i--;
            }
        }

        //Case where ride now has no events after stripping out Down
        //  Ex: the only events today were down or closed
        if (map.get(dateString).size() == 0) {
            return 0;
        }


        //Case when we are asking for a time before the first recorded time today
        // Return the first recorded wait time today
        if (date.before(today.get(0).timestamp)) {
            return today.get(0).waitTime;
        }

        //Case where we are asking for a time after the last recorded time today
        // Return the last recorded wait time today
        RideHistoryEntry last = today.get(today.size() - 1);
        if (date.after(last.timestamp)) {
            return last.waitTime;
        }

        //Case where we are asking for a time in the middle of the day
        // Find the points before and after this time
        // Find distance between our requested date and the before/after date
        // Average the wait time and weight it
        RideHistoryEntry before = new RideHistoryEntry(0,0,new Date(), "Closed", 0);
        RideHistoryEntry after = new RideHistoryEntry(0,0,new Date(), "Closed", 0);
        //scan and find the first entry that is AFTER the time we are asking for.
        //When we find it, step back once for the time BEFORE we are asking
        for (int i = 0; i < today.size(); i++) {
            if (date.before(today.get(i).timestamp)) {
                //we found the first after date
                after = today.get(i);
                before = today.get(i-1);
                break;
            }
        }
        //System.out.println("Calculated time based off starting val of " + before.waitTime + " vs " + after.waitTime);

        //Case when before and after are the same
        if (before.waitTime == after.waitTime) {
            return before.waitTime;
        }


        //If we got this far, Before and After must have been found and we need to find the weighted avg between them
        int minsBefore = Math.abs(toIntExact(date.getTime() - before.timestamp.getTime())) / (60 * 1000) % 60 + 1;
        int minsAfter = Math.abs(toIntExact(date.getTime() - after.timestamp.getTime())) / (60 * 1000) % 60;

        int waitDiff = after.waitTime - before.waitTime;
        double change = ((waitDiff + 0.0)/(minsBefore + minsAfter))*minsBefore;
        int newTime = before.waitTime + toIntExact(Math.round(change));

        //whewf, finally we can return
        return before.waitTime;


    }

    //Return the maximum wait time on this date
    public int getMaxWaitOn(Date d) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String dateString = sdf.format(d);

        //Case when ride is closed (no times today)
        if (!map.containsKey(dateString)) {
            return 0;
        }

        int max = 0;
        //iterate over all entries
        for (RideHistoryEntry re : map.get(dateString)) {
            if (re.waitTime > max && re.waitTime < 300) {
                max = re.waitTime;
            }
        }
        return max;
    }

    // Add a RideHistoryEvent
    // Function adds it to the HashMap based on the date
    public void addSample(RideHistoryEntry e) {
        if (!map.containsKey(e.getDate())) {
            map.put(e.getDate(), new ArrayList<RideHistoryEntry>());
        }
        ArrayList<RideHistoryEntry> a = map.get(e.getDate());
        a.add(e);

    }

    @Override
    public String toString() {
        String result = "Days: " + map.size();
        for (String key : map.keySet()) {
            result += key + " - " + map.get(key) + "\n\n";
        }
        return result;
    }
}
