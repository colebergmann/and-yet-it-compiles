import org.junit.Test;

import static org.junit.Assert.assertTrue;

public class ParkHoursTest {

    @Test
    //Expected case
    public void testParkHours() throws Exception {
        DisneyRequests dr = new DisneyRequests();
        ParkHours ph = new ParkHours(dr);

        assertTrue("Got zero for Disneyland open time", ph.getDlOpenHour() > 0);
        assertTrue("Got zero for DCA open time", ph.getDcaOpenHour() > 0);
    }

    @Test(expected = NullPointerException.class)
    //Test invalid DisneyRequests input
    public void testParkHoursInvalid() throws Exception {
        DisneyRequests dr = null;
        ParkHours ph = new ParkHours(dr);
    }
}
