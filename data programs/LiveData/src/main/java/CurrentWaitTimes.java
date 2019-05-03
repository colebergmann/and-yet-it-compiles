import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;


/*  This class is responsible for reaching out to Disney and storing ride wait times / status
    in the HashMap as described below. */
public class CurrentWaitTimes {
    /* rideWaits stores wait times (in minutes) hashed by the ride_id
       If ride is closed, wait is 0
       If ride is "down", wait is -1  */
    private HashMap<String, Integer> rideWaits;


    public CurrentWaitTimes(DisneyRequests dr) throws IOException {
        rideWaits = new HashMap<>();
        // Add wait times for DL
        fetchLatestWaits(dr, "https://api.wdpro.disney.go.com/facility-service/theme-parks/330339/wait-times");
        // Add wait times for DCA
        fetchLatestWaits(dr, "https://api.wdpro.disney.go.com/facility-service/theme-parks/336894/wait-times");

    }

    // Returns stored wait time. Always positive. 0 if ride is closed or down.
    public int getWaitTime(String id) {
        if (rideWaits.containsKey(id) && rideWaits.get(id) > 0) {
            return rideWaits.get(id);
        }
        return 0;
    }

    //Returns true if the ride is down. If ride not found, return false
    public boolean isDown(String id) {
        return rideWaits.containsKey(id) && rideWaits.get(id) == -1;
    }

    // Returns true if ride is closed or not found. Return false if we have a valid time or its down
    public boolean isClosed(String id) {
        if (rideWaits.containsKey(id)) {
            return rideWaits.get(id) < 1;
        }
        return true;
    }

    // Gets the latest wait times from Disney and loads them into the map.
    private void fetchLatestWaits(DisneyRequests dr, String url) throws IOException {
        JSONObject jo = dr.getJsonFromURL(url);
        JSONArray entries = jo.getJSONArray("entries");
        for (int i = 0; i < entries.length(); i++) {
            JSONObject currentEntry = entries.getJSONObject(i);
            parseRide(currentEntry);
        }
    }

    //Parse a single ride and add its status to the map
    private void parseRide(JSONObject obj) {
        String id = obj.getString("id");
        id = id.substring(0, id.indexOf(';'));
        try {
            if (obj.getString("id").contains("Attraction")) {
                //parse and add to our map
                JSONObject waitData = obj.getJSONObject("waitTime");
                //Expected case when ride is operating like normal
                if (waitData.getString("status").equalsIgnoreCase("Operating")) {
                    rideWaits.put(id, waitData.getInt("postedWaitMinutes"));
                    return;
                }

                //Case where ride is down
                if (waitData.getString("status").equalsIgnoreCase("Down")) {
                    rideWaits.put(id, -1);
                    return;
                }

                //Case where ride is closed
                if (waitData.getString("status").equalsIgnoreCase("Closed")) {
                    rideWaits.put(id, 0);
                }
            }
        } catch (JSONException e) {
            //This could happen when ride is open and no wait is posted
            //So let's just call it closed since we don't want any rides w/o wait times
            rideWaits.put(id, 0);
        }
    }
}
