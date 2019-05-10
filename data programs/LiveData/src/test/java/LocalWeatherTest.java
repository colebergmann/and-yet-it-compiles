import org.junit.Test;
import static org.junit.Assert.*;

public class LocalWeatherTest {

    @Test
    // A straightforward test to make sure the LocalWeather object constructs correctly
    public void testWeather() throws Exception {
        LocalWeather weather = new LocalWeather();
        assertTrue("Got zero for daily high temperature", weather.getDayHigh() > 0);
        assertTrue("Got zero for daily low temperature", weather.getDayLow() > 0);
        assertTrue("Got zero for current temperature", weather.getTempNow() > 0);
    }
}
