import org.json.JSONObject;

import javax.net.ssl.HttpsURLConnection;
import java.io.*;
import java.net.URL;
import java.nio.charset.Charset;

public class DisneyRequests {
    private String apiKey;

    public DisneyRequests() throws Exception {
        //Reach out to Disney and get a nice API key
        apiKey = fetchAPIKey();
    }

    public String getApiKey() {
        return apiKey;
    }

    /*
        Requests JSON from a specific URL with our stored API key\
        Returns a JSONObject
     */
    public JSONObject getJsonFromURL(String url) throws IOException {
        //Prepare the request
        URL obj = new URL(url);
        HttpsURLConnection conn = (HttpsURLConnection) obj.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        conn.setRequestProperty("Authorization", "BEARER " + apiKey);

        //return the JSON representation
        return streamToJson(conn.getInputStream());
    }


    /*
        getAPIKey
        This function reaches out to Disney for an auth token and returns it as a string.
     */
    private String fetchAPIKey() throws Exception {
        URL obj = new URL("https://authorization.go.com/token");
        HttpsURLConnection conn = (HttpsURLConnection) obj.openConnection();

        //Add headers to the request
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        conn.setRequestProperty("User-Agent", "DLR/20190411.2 CFNetwork/978.0.7 Darwin/18.5.0");

        //Create the query string
        String params = "grant_type=assertion&assertion_type=public&client_id=TPR-DLR_2016.IOS-PROD";

        //Execute the request
        conn.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
        wr.writeBytes(params);
        wr.flush();
        wr.close();

        //get the results
        JSONObject jo = streamToJson(conn.getInputStream());

        String token = jo.getString("access_token");
        if (token != null && token.length() > 0) {
            return token;
        }

        throw new Exception();
    }

    /*
        JsonObject
        This function parses an InputStream and returns it's corresponding JSONObject
     */
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
