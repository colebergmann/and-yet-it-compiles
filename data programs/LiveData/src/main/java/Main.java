import org.json.JSONObject;

public class Main {
    public static void main(String[] args) {
        System.out.println("Running main");
       try {
           DisneyRequests dr = new DisneyRequests();
           CurrentWaitTimes cw = new CurrentWaitTimes(dr);
       } catch (Exception e) {
           e.printStackTrace();
           System.out.println("Failed");
       }
    }
}
