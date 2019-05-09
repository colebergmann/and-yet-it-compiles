import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Main {
    public static void main(String[] args) throws Exception {
        System.out.println("Running main");

        CSVManager csv = new CSVManager("sample.csv");

        String[] desiredRides = new String[] {"353439","367492", "353405", "353295", "353363", "353355", "353377", "353435", "353347", "353437" };
        int[] roofs = new int[] {260,150,120,185,55,450,180,555,300,440};

        DisneyRequests dr = new DisneyRequests();           // Get API token and authenticate with Disney
        CurrentWaitTimes cw = new CurrentWaitTimes(dr);     // Fetch current wait times
        ParkHours ph = new ParkHours(dr);                   // Fetch park hours today

        LocalWeather lw = new LocalWeather();               // Fetch current weather forecast from DarkSky

        TableEntry newEntry = new TableEntry();             // Populate this with our desired data

        //Exit if park is not open
        int currentHour = Integer.parseInt(new SimpleDateFormat("HH").format(new Date()));
        int openHour = ph.getDlOpenHour();
        int closeHour = ph.getDlCloseHour();
        if (closeHour == 0) {
            closeHour = 24;
        }

        if (!(currentHour < closeHour && currentHour > openHour)) {
            System.out.println("Park is not open, exiting");
            System.exit(0);
        }

        //Add weather data to our entry
        newEntry.setWeather(lw.getDayHigh(), lw.getDayLow(), lw.getDayPrecipProb(), lw.getTempNow(), lw.getPrecipProbNow());

        //Set park hours
        newEntry.setParkHours(ph);


        //First, check if we have a previous entry from today
        TableEntry previousEntry = null;
        String previousLine = csv.getLastLine();
        if (previousLine != null) {
            TableEntry prevEntry = new TableEntry(previousLine);
            if (prevEntry.getYear() == newEntry.getYear() && prevEntry.getDayOfMonth() == newEntry.getDayOfMonth()
                    && prevEntry.getMonth() == newEntry.getMonth()) {
                //The previous entry we have stored is also from today, so we can reference if if necessary
                previousEntry = prevEntry;
            }
        }

        for (int i = 0; i < desiredRides.length; i++) {
            String id = desiredRides[i];
            int waitMins = cw.getWaitTime(id);

            //check if ride is down and if we hae a prev entry. use the prev entry time if the ride is down
            if (cw.isDown(id) && previousEntry != null) {
                waitMins = previousEntry.getWaitForRide(id);
                System.out.println("[" + id + "] Ride is down, using previous wait value of " + waitMins);
            }

            //Floor the wait time
            if (waitMins > roofs[i]) {
                waitMins = roofs[i];
            }

            newEntry.addRide(id, waitMins, waitMins > 0);
        }

        csv.writeLine(newEntry.exportAsCSV());
        System.out.println("Added new line to CSV");
    }
}
