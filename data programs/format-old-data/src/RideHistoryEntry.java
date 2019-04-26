import java.text.SimpleDateFormat;
import java.util.Date;

/*
    RideHistoryEntry
    This class holds some basic values for a RideHistoryEntry that directly mirrors it's format in the MySQL DB
    Instantiated in the SQLWrapper class, and stored in the Ride class
 */

public class RideHistoryEntry {
    public int id;
    public int ride_id;
    public Date timestamp;
    public String status;
    public int waitTime;

    //Constructor
    public RideHistoryEntry(int id, int ride_id, Date timestamp, String status, int waitTime) {
        this.id = id;
        this.ride_id = ride_id;
        this.timestamp = timestamp;
        this.status = status;
        this.waitTime = waitTime;
    }

    //Date string getter
    public String getDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(timestamp);
    }

    @Override
    public String toString() {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        String result = "[" + ride_id + "," + sdf.format(timestamp) +"] " + status + ", t:" + waitTime;
        return result;
    }
}