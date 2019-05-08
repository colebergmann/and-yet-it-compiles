import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/* This class is responsible for fetching and storing the park hours of operation */
public class ParkHours {
    private int dlOpenHour;
    private int dlCloseHour;
    private int dcaOpenHour;
    private int dcaCloseHour;

    public ParkHours(DisneyRequests dr) throws IOException {
        fetchCurrentHours(dr);
    }

    public int getDlOpenHour() {
        return dlOpenHour;
    }

    public int getDlCloseHour() {
        return dlCloseHour;
    }

    public int getDcaOpenHour() {
        return dcaOpenHour;
    }

    public int getDcaCloseHour() {
        return dcaCloseHour;
    }

    // Gets the park open/close hours for today and save them to local vars
    private void fetchCurrentHours(DisneyRequests dr) throws IOException {
        String url = "https://api.wdpro.disney.go.com/mobile-service/public/finder/calendar/80008297;entityType=destination?date="
                + formatDate("yyyy-MM-dd");
        JSONObject jo = dr.getJsonFromURL(url);
        JSONArray locations = jo.getJSONArray("locations");

        //Iterate over locations
        for (int i = 0; i < locations.length(); i++) {
            JSONObject currentLocation = locations.getJSONObject(i);
            JSONArray schedules = currentLocation.getJSONObject("schedule").getJSONArray("schedules");

            //Iterate over the location's schedule entries
            for (int k = 0; k < schedules.length(); k++) {
                JSONObject currentSchedule = schedules.getJSONObject(k);

                //Filter out magic hours, etc
                if (!currentSchedule.getString("type").equalsIgnoreCase("Operating")) {
                    continue;
                }

                int open = Integer.parseInt(currentSchedule.getString("startTime").substring(0,2));
                int close = Integer.parseInt(currentSchedule.getString("endTime").substring(0,2));

                if (currentLocation.getString("urlFriendlyId").equalsIgnoreCase("disneyland")) {
                    //Set Disneyland times
                    dlOpenHour = open;
                    dlCloseHour = close;
                } else if (currentLocation.getString("urlFriendlyId").equalsIgnoreCase("disney-california-adventure")) {
                    //set DCA times
                    dcaOpenHour = open;
                    dcaCloseHour = close;
                }
            }
        }
    }

    //Helper function to format the date
    private String formatDate(String dateformat) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(dateformat);
        return simpleDateFormat.format(new Date());
    }
}
