import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

public class SQLWrapper {

    Connection conn = null;

    //Constructor to instantiate SQLWrapper with MySQL connection
    public SQLWrapper(String connectionUrl, String user, String password) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(connectionUrl, user, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // This function queries the SQL database for all ride entries on a date and
    // returns a hashmap of String (rideId) and Ride
    public  HashMap<String, Ride> getRides(ParkCalendar cal, ArrayList<String> rideIds) {
        HashMap<String, Ride> rideMap = new HashMap<String, Ride>();

        //First, build the SQL statement
        String statement = "";
        for (int i = 0; i < rideIds.size(); i++) {
            statement += "ride_id=" + rideIds.get(i);
            if (i != rideIds.size() - 1) {
                statement += " OR ";
            }
        }
        statement = "SELECT * FROM ride_history WHERE " + statement + ";";

        //Then, run the statement
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(statement);

            //For each row in the table...
            while (rs.next()) {
                //Get all of the coulmns
                int id = rs.getInt("id");
                int ride_id = rs.getInt("ride_id");
                Timestamp timestamp = rs.getTimestamp("time");
                String status = rs.getString("status");
                int waitMins = rs.getInt("wait_mins");

                //Create a new RideHistoryEntry object for this row
                RideHistoryEntry re = new RideHistoryEntry(id, ride_id, timestamp, status,waitMins);

                //Make sure DL is open before we add the RideHistory entry to a ride
                // This just helps filter out Magic mornings / false entries after the park closes.
                if (cal.isParkOpen(330339, timestamp)) {
                    //Check if we have seen this ride before. If not, create it
                    if (!rideMap.containsKey(ride_id + "")) {
                        rideMap.put(ride_id + "", new Ride(ride_id));
                    }

                    //Add the sample to this ride.
                    rideMap.get(ride_id + "").addSample(re);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return rideMap;
    }

    // This function returns a ParkCalendar object that is populated with every field in the db
    public ParkCalendar getParkCalendar() {
        ParkCalendar pc = new ParkCalendar();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd H:m:s");

        try {
            String query = "SELECT * FROM park_hours;";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {

                //Pull fields from SQL
                int parkId = rs.getInt("park_id");
                String d = rs.getString("date");
                String openString = rs.getString("opens");
                String closeString = rs.getString("closes");

                //Handle the park closing at midnight
                if (closeString.equalsIgnoreCase("00:00:00")) {
                    closeString = "23:59:59";
                }

                Date openDate = df.parse(d + " " +  openString);
                Date closeDate = df.parse(d + " " + closeString);

                pc.addDate(parkId,d, openDate, closeDate);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return pc;
    }
}
