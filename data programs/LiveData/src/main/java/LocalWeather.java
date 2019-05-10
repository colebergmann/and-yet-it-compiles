import org.json.JSONObject;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.Charset;

/* This class is responsible for fetching and storing the current weather params at the moment this class is
    instantiated. */

public class LocalWeather {
    private double dayHigh;
    private double dayLow;
    private double dayPrecipProb;
    private double tempNow;
    private double precipProbNow;

    //TODO: Encrypt this for Travis and revoke the committed API keys.
    private String API_KEY = "4d0a6eb0938d05c7baf766f0e6951b17";

    // Reach out to DarkSky and get the current weather forecast at Disneyland.
    // Update the local variables.
    public LocalWeather() throws Exception {
        //Fetch weather
        JSONObject weather = getWeatherNow();

        //Extract current values
        tempNow = weather.getJSONObject("currently").getDouble("temperature");
        precipProbNow = weather.getJSONObject("currently").getDouble("precipProbability");

        //Extract predicted values for the entire day
        JSONObject daily = weather.getJSONObject("daily").getJSONArray("data").getJSONObject(0);
        dayHigh = daily.getDouble("temperatureHigh");
        dayLow = daily.getDouble("temperatureLow");
        dayPrecipProb = daily.getDouble("precipProbability");
    }

    //      -------    Lots of getter functions ---------- //


    public double getDayHigh() {
        return dayHigh;
    }

    public double getDayLow() {
        return dayLow;
    }

    public double getDayPrecipProb() {
        return dayPrecipProb;
    }

    public double getTempNow() {
        return tempNow;
    }

    public double getPrecipProbNow() {
        return precipProbNow;
    }

    /*
       Make the HTTP call to get the current weather and return the JSON object
    */
    private JSONObject getWeatherNow() throws Exception {
        //Prepare the request
        URL obj = new URL("https://api.darksky.net/forecast/" + API_KEY + "/33.812056,-117.918835");
        HttpsURLConnection conn = (HttpsURLConnection) obj.openConnection();
        conn.setRequestMethod("GET");

        //return the JSON representation
        return streamToJson(conn.getInputStream());
    }

    // This function parses an InputStream and returns it's corresponding JSONObject
    private JSONObject streamToJson(InputStream is) throws IOException {
        // Read each line to a string
        BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        String jsonText = sb.toString();

        //Get and return the JSON object
        return new JSONObject(jsonText);
    }
}
