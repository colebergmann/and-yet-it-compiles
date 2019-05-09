import java.io.*;
import java.nio.charset.StandardCharsets;

public class CSVManager {

    private File file;
    private PrintWriter pw;
    public static String header = "year,month,day_of_month,day_of_week,hour_of_day,minute,dlr_open,dca_open,dlr_close,dca_close,weather_daily_temperatureHigh,weather_daily_temperatureLow,weather_daily_precipProbability,weather_hourly_temperature,weather_hourly_precipProbability,ride-0,wait-0,open-0,ride-1,wait-1,open-1,ride-2,wait-2,open-2,ride-3,wait-3,open-3,ride-4,wait-4,open-4,ride-5,wait-5,open-5,ride-6,wait-6,open-6,ride-7,wait-7,open-7,ride-8,wait-8,open-8,ride-9,wait-9,open-9";

    //Check if a csv exists at the given location. If not, create a new file
    public CSVManager(String filepath) throws Exception {
        file = new File(filepath);
        boolean fileExists = true;

        //create subdirs if they do not exist
        //if(!file.getParentFile().exists()) file.getParentFile().mkdirs();
        if (!file.exists()) {
            fileExists = false;
        }

        //Initialize stream
        FileOutputStream fos = new FileOutputStream(file, true);
        OutputStreamWriter osw = new OutputStreamWriter(fos, StandardCharsets.UTF_8);
        BufferedWriter bw = new BufferedWriter(osw);
        pw = new PrintWriter(bw, true);

        //Add header to new file
        if (!fileExists) {
            bw.write(header);
            bw.flush();
        }
    }

    public void close() {
        pw.close();
    }

    //Get the last line in the CSV file
    //Returns null if we don't have a previous line to work with
    public String getLastLine() {
        try {
            String currentLine;
            String lastLine = "";

            BufferedReader br = new BufferedReader(new FileReader(file.getPath()));
            while ((currentLine = br.readLine()) != null) {
                lastLine = currentLine;
            }

            //Make sure this line is not just the header
            if (lastLine.contains("weather_hourly_temperature")) {
                return null;
            }

            //Return the last line
            return lastLine;
        } catch (Exception e) {
            return null;
        }
    }

    //Write a line to the end of the CSV file
    public void writeLine(String line) {
        pw.write("\n" + line);
        pw.flush();
    }


}
