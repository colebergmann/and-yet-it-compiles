import org.json.JSONObject;

public class HourlyWeather {
    double precipIntensity;
    double precipProbability;
    double temperature;
    double apparentTemperature;
    double dewPoint;
    double humidity;
    double pressure;
    double windSpeed;
    double cloudCover;
    double uvIndex;
    double visibility;

    public HourlyWeather(JSONObject obj) {
        precipIntensity = obj.getDouble("precipIntensity");
        precipProbability = obj.getDouble("precipProbability");
        temperature = obj.getDouble("temperature");
        apparentTemperature = obj.getDouble("apparentTemperature");
        dewPoint = obj.getDouble("dewPoint");
        humidity = obj.getDouble("humidity");
        pressure = obj.getDouble("pressure");
        windSpeed = obj.getDouble("windSpeed");
        cloudCover = obj.getDouble("cloudCover");
        uvIndex = obj.getDouble("uvIndex");
        visibility = obj.getDouble("visibility");
    }

    public double getTemperature() {
        return temperature;
    }

    public double getPrecipProbability() {
        return precipProbability;
    }
}
