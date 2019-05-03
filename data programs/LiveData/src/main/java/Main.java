import org.json.JSONObject;

public class Main {
    public static void main(String[] args) {
        System.out.println("Running main");
        DisneyRequests dr = new DisneyRequests();

        try {
            JSONObject waits = dr.getJsonFromURL("https://api.wdpro.disney.go.com/facility-service/theme-parks/330339/wait-times");
            System.out.println(waits);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
