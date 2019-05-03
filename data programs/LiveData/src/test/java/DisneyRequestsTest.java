import org.json.JSONException;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.*;

public class DisneyRequestsTest {

    @Test
    public void normalSuccessCase() {
        DisneyRequests dr = new DisneyRequests();

        //check API key
        assertTrue("API key is invalid", dr.getApiKey().length() > 0);

        try {
            //check known good URL
            dr.getJsonFromURL("https://api.wdpro.disney.go.com/facility-service/theme-parks/330339/wait-times");
        } catch (Exception e) {
            e.printStackTrace();
            fail("An exception was thrown for a known good URL");
        }
    }

    @Test(expected = IOException.class)
    public void invalidURLCase() throws IOException {
        DisneyRequests dr = new DisneyRequests();

        //Bad URL, should throw an exception
        dr.getJsonFromURL("https://api.wdpro.disney.go.com/facility-service/theme-parks/4444444444/wait-times");
    }

    @Test(expected = JSONException.class)
    public void validButNotJsonURL() throws IOException {
        DisneyRequests dr = new DisneyRequests();

        //Valud URL that does not contain uson
        dr.getJsonFromURL("https://google.com");
    }
}
