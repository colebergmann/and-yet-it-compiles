import java.text.SimpleDateFormat;
import java.util.Date;

/*
    CalendarEntry
    This object is created by the ParkCalendar class for each unique date.
    This class tracks the opening and closing date for both parks.
 */

public class CalendarEntry {
    public Date dcaOpening;
    public Date dcaClosing;

    public Date dlrOpening;
    public Date dlrClosing;

    DailyWeather dailyWeather;

    public CalendarEntry() {

    }

    public DailyWeather getDailyWeather() {
        if (dailyWeather != null) {
            return dailyWeather;
        }
        dailyWeather = new DailyWeather(dlrOpening);
        return dailyWeather;
    }

    //Set the opening and closing date for a specific park
    public void setDate(int parkId, Date opening, Date closing) {
        if (parkId == 330339) {
            //Disneyland
            dlrOpening = opening;
            dlrClosing = closing;
        } else {
            //DCA
            dcaOpening = opening;
            dcaClosing = closing;
        }
    }

    //Check if a specific park is open on a Date
    public boolean isParkOpen(int parkId, Date date) {
        //We must get the date string from the Date object to lookup the CalendarEntry
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String d = sdf.format(date);


        if (parkId == 330339) {
            //Disneyland
            return (date.after(dlrOpening) && date.before(dlrClosing)) || date.equals(dlrOpening) || date.equals(dlrClosing);
        } else {
            //DCA
            return (date.after(dcaOpening) && date.before(dcaClosing)) || date.equals(dcaOpening) || date.equals(dcaClosing);
        }
    }

    //Get the opening date for a specific park
    public Date getOpening(int parkId) {
        if (parkId == 330339) {
            //Disneyland
            return dlrOpening;
        } else {
            //DCA
            return dcaOpening;
        }
    }

    //Get the closing date for a specific park
    public Date getClosing(int parkId) {
        if (parkId == 330339) {
            //Disneyland
            return dlrClosing;
        } else {
            //DCA
            return dcaClosing;
        }
    }

    @Override
    public String toString() {
        return "DCA: " + dcaOpening + " - " + dcaClosing + " --------- DLR: " + dlrOpening + " - " + dlrClosing;
    }
}
