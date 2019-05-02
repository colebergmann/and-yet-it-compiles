import org.json.JSONException;
import org.json.JSONObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.Date;
import java.util.HashMap;

public class DailyWeather {

    private static String API_KEY = "4d0a6eb0938d05c7baf766f0e6951b17"; //Cole
    //private static String API_KEY = "9eb0473fb8f8ae3267084cb7b0d5bcd4"; //Bob

    double temperatureHigh;
    double temperatureLow;
    double humidity;
    double precipProbability;

    HashMap<Integer, HourlyWeather> hourMap;

    public DailyWeather(Date d) {
        //Get system epoch time
        long mills = d.getTime() / 1000;
        hourMap = new HashMap<>();

        //Contact the API and get the data we need
        String url = "https://api.darksky.net/forecast/" + API_KEY + "/33.812056,-117.918835," + mills;
        JSONObject json = readJsonFromUrl(url);

        JSONObject today = json.getJSONObject("daily").getJSONArray("data").getJSONObject(0);

        try {
            temperatureHigh = today.getDouble("temperatureHigh");
            temperatureLow = today.getDouble("temperatureLow");
        } catch (Exception e) {
            temperatureHigh = today.getDouble("temperatureMin");
            temperatureLow = today.getDouble("temperatureMax");
        }
        humidity = today.getDouble("humidity");
        precipProbability = today.getDouble("precipProbability");

        //Iterate every hour and add the object to our map
        HourlyWeather previousHourlyWeather = null;
        for (int i = 0; i < 24; i++) {
            try {
                JSONObject j = json.getJSONObject("hourly").getJSONArray("data").getJSONObject(i);
                HourlyWeather hw = new HourlyWeather(j);
                hourMap.put(i, hw);
                previousHourlyWeather = hw;
            } catch (Exception e) {
                hourMap.put(i, previousHourlyWeather);
                System.out.println("Using previous weather");
            }
        }
    }

    public HourlyWeather getHourlyWeather(int at) {
        return hourMap.get(at);
    }

    public double getTemperatureHigh() {
        return temperatureHigh;
    }

    public double getTemperatureLow() {
        return temperatureLow;
    }

    public double getPrecipProbability() {
        return precipProbability;
    }

    /*
                        Private helper functions to properly request data from our API endpoint
                     */
    private JSONObject readJsonFromUrl(String url){
        System.out.println("Requesting data from: " + url);
        try {
            InputStream is = new URL(url).openStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
            StringBuilder sb = new StringBuilder();
            int cp;
            while ((cp = rd.read()) != -1) {
                sb.append((char) cp);
            }
            String jsonText = sb.toString();
            JSONObject json = new JSONObject(jsonText);
            is.close();
            return json;
        }  catch (Exception e) {
            e.printStackTrace();
            System.out.println("Unable to get weather");
            System.exit(1);
        }
        return new JSONObject();
    }
}
