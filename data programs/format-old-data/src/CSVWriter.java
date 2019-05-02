import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

/*
    CSVWriter
    A super primitive class to keep track of a header and body for a CSV document

    WARNING: Be very careful with this class. It will ONLY function properly if
    you are consistently adding rows with the EXACT SAME KEYS, EXACT SAME AMOUNT OF KEYS,
    and REPEATEDLY IN THE SAME ROW. Perfect for a loop, not awesome for much else.
 */

public class CSVWriter {
    String header;
    String csv;

    //Constructor
    public CSVWriter() {
        csv = "";
        header = "";
    }

    //Add an entry to the CSV file by key and item
    // WARNING: Read the warning above
    public void addItem(String key, String item) {
        csv += item + ", ";
        if (!header.contains(key)) {
            if (header.length() != 0) {
                header += ",";
            }
            header += key;
        }
    }

    //Overloading addItem to support ints
    public void addItem(String key, int item) {
        addItem(key, item + "");
    }

    //Overloading addItem to support doubles
    public void addItem(String key, double item) {
        addItem(key, item + "");
    }

    //Add a linebreak to the CSV body
    public void nextLine() {
        csv = csv.substring(0, csv.length()-2);
        csv += "\n";
    }

    //Mash the header and body together to get our raw text for the csv file
    public String getContent() {
        return header + "\n" + csv;
    }

    //Write the csv header and body to the specified file
    public void writeToFile(String filename) throws IOException {
        BufferedWriter writer = new BufferedWriter(new FileWriter(filename,false));
        writer.append(getContent());
        writer.close();
    }


}
