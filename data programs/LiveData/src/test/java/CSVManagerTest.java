import org.junit.Test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import static org.junit.Assert.*;

public class CSVManagerTest {

    @Test
    public void testFileCreation() throws Exception {
        String testFilepath = "test.csv";
        CSVManager csv = new CSVManager(testFilepath);
        csv.close();

        //Make sure file exists
        assertTrue("Test file does not exist", new File(testFilepath).exists());

        //Read the first line
        BufferedReader b = new BufferedReader(new FileReader(testFilepath));
        String text = b.readLine();
        assertEquals("CSV header is incorrect", text, CSVManager.header);

        //delete the file
        File f = new File(testFilepath);
        assertTrue("Failed to delete file " + testFilepath, f.delete());
    }

    @Test
    public void testFileReadWrite() throws Exception {
        String testFilepath = "test2.csv";
        CSVManager csv = new CSVManager(testFilepath);

        //Try getting line from csv (should be null)
        assertNull("getLastLine should return null", csv.getLastLine());

        //Write a line to file
        csv.writeLine("testline");

        //Read the first two lines of the file
        BufferedReader b = new BufferedReader(new FileReader(testFilepath));
        String line1 = b.readLine();
        String line2 = b.readLine();

        assertEquals("CSV header is incorrect", line1, CSVManager.header);
        assertEquals("Written line is incorrect", line2, "testline");

        //Double check that getLastLine returns the correct text
        assertEquals("Written line is incorrect", csv.getLastLine(), "testline");

        //delete the file
        File f = new File(testFilepath);
        assertTrue("Failed to delete file " + testFilepath, f.delete());
    }


}
