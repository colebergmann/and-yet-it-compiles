import org.json.JSONException;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.*;

public class DisneyRequestsTest {

    @Test
    /*
        Test the expected case with a few known good URLs that we will use elsewhere in the program
        to make sure they a) return correctly and b) the program reads them correctly
     */
    public void normalSuccessCase() throws Exception {
        DisneyRequests dr = new DisneyRequests();

        //check API key
        assertTrue("API key is invalid", dr.getApiKey().length() > 0);

        try {
            //check a few known good URLs
            dr.getJsonFromURL("https://api.wdpro.disney.go.com/facility-service/theme-parks/330339/wait-times");
            dr.getJsonFromURL("https://api.wdpro.disney.go.com/facility-service/theme-parks/336894/wait-times");
        } catch (Exception e) {
            e.printStackTrace();
            fail("An exception was thrown for a known good URL");
        }
    }


    @Test(expected = IOException.class)
    /*
        Test the case where we input a completely invalid URL (404)
        Should throw an IOException
     */
    public void invalidURLCase() throws Exception {
        DisneyRequests dr = new DisneyRequests();

        //Bad URL, should throw an exception
        dr.getJsonFromURL("https://api.wdpro.disney.go.com/facility-service/theme-parks/4444444444/wait-times");
    }



    @Test(expected = JSONException.class)
    /*
        Test the case where we give it a valid, yet non-json URL
        Should throw JSONException
     */
    public void validButNotJsonURL() throws Exception {
        DisneyRequests dr = new DisneyRequests();

        //Valud URL that does not contain uson
        dr.getJsonFromURL("https://google.com");
    }
}
