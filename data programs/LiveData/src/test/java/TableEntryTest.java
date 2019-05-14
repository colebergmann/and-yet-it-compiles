import org.junit.Test;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.Assert.assertEquals;

public class TableEntryTest {
    private int expectedYear = Integer.parseInt(new SimpleDateFormat("yyyy").format(new Date()));
    private int expectedMonth = Integer.parseInt(new SimpleDateFormat("MM").format(new Date()));
    private int expectedDay = Integer.parseInt(new SimpleDateFormat("dd").format(new Date()));
    private int expectedDOW = Integer.parseInt(new SimpleDateFormat("u").format(new Date())) +1;
    private int expectedHour = Integer.parseInt(new SimpleDateFormat("HH").format(new Date()));
    private int expectedMinute = Integer.parseInt(new SimpleDateFormat("mm").format(new Date()));
    private String expectedCSVDateParams = expectedYear + ", " + expectedMonth + ", " + expectedDay + ", " + expectedDOW + ", "
            + expectedHour + ", " + expectedMinute;


    @Test
    public void testBaseConstructor() {
        TableEntry te = new TableEntry();
        assertEquals("Year should be current year",expectedYear, te.getYear());
        assertEquals("Month shoiuld be current month", expectedMonth, te.getMonth());
        assertEquals("Day should be current day", expectedDay, te.getDayOfMonth());
        assertEquals("Invalid ride should have a wait time of 0", 0, te.getWaitForRide("testride"));
        assertEquals("Invalid ride should be closed", 0, te.isRideOpen("testride"));

        //add a ride and try fetching its data
        te.addRide("testride", 45, true);
        assertEquals("Valid ride should have a wait time of 45", 45, te.getWaitForRide("testride"));
        assertEquals("Valid ride should be open", 1, te.isRideOpen("testride"));

        String expectedCSV = expectedCSVDateParams + ", 0, 0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, testride, 45, 1";
        assertEquals("Exported CSV does not match expected value", expectedCSV, te.exportAsCSV());
    }

    @Test(expected =  Exception.class)
    public void testInvalidConstructor() throws Exception {
        TableEntry te = new TableEntry("1,2,3,4,5,6");

    }

    @Test
    public void testValidConstructor() throws Exception {
        String testCSV = "2017, 11, 17, 6, 8, 0, 8, 8, 0, 23, 73.36, 54.98, 0.0, 63.44, 0.08, 353439, 5, 1, 367492, 5, 1, 353405, 5, 1, 353295, 5, 1, 353363, 5, 1, 353355, 10, 1, 353377, 10, 1, 353435, 10, 1, 353347, 5, 1, 353437, 5, 1";
        TableEntry te = new TableEntry(testCSV);
        assertEquals("Exported CSV must match input", testCSV, te.exportAsCSV());
        assertEquals("Wait time does not match input csv", te.getWaitForRide("353355"), 10);
        assertEquals("Wait time does not match input csv", te.getWaitForRide("353437"), 5);
        assertEquals("Wait time does not match input csv", te.getWaitForRide("353439"), 5);

        assertEquals("Open status does not match input csv", te.isRideOpen("353355"), 1);
        assertEquals("Open status does not match input csv", te.isRideOpen("353437"), 1);
        assertEquals("Open status does not match input csv", te.isRideOpen("353439"), 1);

        assertEquals("Status should be 0 for invalid ride id", te.isRideOpen("invalidid"), 0);
        assertEquals("Wait time should be 0 for invalid ride id", te.getWaitForRide("invalidid"), 0);
    }

    @Test
    public void testWeather() {
        TableEntry te = new TableEntry();
        te.setWeather(1,2,3,4,5);
        assertEquals("Weather export does not match expected", expectedCSVDateParams +
                ", 0, 0, 0, 0, 1.0, 2.0, 3.0, 4.0, 5.0, ", te.exportAsCSV());
    }
}
