import org.junit.Test;
import static org.junit.Assert.*;

public class CurrentWaitTimesTest {
    @Test
    public void testInvalidWaits() throws Exception {
        DisneyRequests dr = new DisneyRequests();
        CurrentWaitTimes cw = new CurrentWaitTimes(dr);
        assertEquals("Wait time for invalid ride should be 0", cw.getWaitTime("invalidid"), 0);
        assertTrue("Invalid ride should be closed", cw.isClosed("invalidid"));
        assertFalse("Invalid ride should not be down", cw.isDown("invalidid"));
    }

    @Test(expected = NullPointerException.class)
    public void testInvalidCW() throws Exception {
        DisneyRequests dr = null;
        CurrentWaitTimes cw = new CurrentWaitTimes(dr);
    }
}
