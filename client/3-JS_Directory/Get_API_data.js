    //------------------------------------------------------------
        /* Main function  */

        //API documentation source = https://www.meteomatics.com/en/api/getting-started/
        /* Here is what do Call_Meteomatics_API

        here is the pipe : 
        | main => Call_Meteomatics_API() 
        | => Get_Current_Location() => Get_hourly_Weather_Data(),Get_daily_Weather_Data() 
        | => Transform_JSON_to_Table_Daily(), Transform_JSON_to_Table_Hourly()
        | => return(Hourly_WeatherData_Collection, Daily_WeatherData_collection) | * transform json into 2d array and return it.

        NB: There is promises and asynchronus function because we need to get sure tab is fully populated before being used in Main_script.js
        */
    //------------------------------------------------------------

export function Call_Meteomatics_API(Hourly_WeatherData_Collection, Daily_WeatherData_collection)
{

    function Get_Current_Location()
    {
        var     latitude;
        var     longitude;
        
        return new Promise((resolve, reject) => 
        {
            
            // GET current latitude and longitude || Documentation : https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
            if (!navigator.geolocation)
            {
                console.log("Impossible to get current location - Verrify if you allowed access in your browser options");
                reject(new Error("Geolocation not supported or access denied"));
            }
            else{
                navigator.geolocation.getCurrentPosition((position) => {

                    latitude = position.coords.latitude.toFixed(2);
                    longitude = position.coords.longitude.toFixed(2);
                    const url_hourly = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_direction_10m&timezone=Europe%2FLondon&models=meteofrance_seamless`;
                    const url_daily = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=Europe%2FLondon&models=meteofrance_seamless`;

                    Promise.all([ Get_daily_Weather_Data(url_daily, Daily_WeatherData_collection), Get_hourly_Weather_Data(url_hourly, Hourly_WeatherData_Collection) ])
                    .then(()=>resolve()) 
                    .catch(reject);
                })
            }
        });

    }

    //------------------------------------------------------------
        /* functions call in Get_Current_Location () */
    //------------------------------------------------------------
    function Get_daily_Weather_Data(url_daily, Daily_WeatherData_collection)
    {
        return fetch(url_daily, // return itself then tab Daily_data fully populated
        {
            method : 'GET',
        })

        .then((response)=>
        {
            if(!response.ok)
            {
                throw new Error ('impossible to get daily data ');
            }
            return(response.json());
        })

        .then((data_daily) =>
        {
            Transform_JSON_to_Table_Daily(data_daily, Daily_WeatherData_collection);
        })

        .catch(error=>console.log(error));

    }

    function Get_hourly_Weather_Data(url_hourly, Hourly_WeatherData_Collection)
    {
        return fetch(url_hourly, 
        {
            method : 'GET',
        })

        .then((response) =>
        { 
            if(!response.ok)
                {
                    throw new Error('impossible to get hourly data');
                }
           return (response.json());
        })

        .then ((data_hourly) =>
        {
            Transform_JSON_to_Table_Hourly(data_hourly, Hourly_WeatherData_Collection);
        })

        .catch(error=>console.log(error));
    }
    
    return (Get_Current_Location()); 
}

    //------------------------------------------------------------
        /* functions call in Get_daily_Weather_Data() & Get_hourly_Weather_Data() */
    //------------------------------------------------------------

function Transform_JSON_to_Table_Daily(data_daily, Daily_WeatherData_collection)
{
    let     idx_row;
    let     idx_jsonFile;

    idx_row = 0 ;
    idx_jsonFile = 0;

    Daily_WeatherData_collection[idx_row] = ['time', 'unit', 'sunrise', 'unit',  'sunset', 'unit', 'precipitation sum', 'unit', 'shower_sum', 'unit', 'snowfall_sum', 'unit', 'wind direction', 'unit', 'wind guts', 'unit', 'wind speed', 'unit', 'WMO_codes'];

    while(idx_jsonFile < data_daily.daily.time.length)
    {
        idx_row++;

        if(!Daily_WeatherData_collection[idx_row])
            Daily_WeatherData_collection[idx_row] = [];
        
        Daily_WeatherData_collection[idx_row].push(data_daily.daily.time[idx_jsonFile]);
        Daily_WeatherData_collection[idx_row].push(data_daily.daily_units.time);

        Daily_WeatherData_collection[idx_row].push(data_daily.daily.sunrise[idx_jsonFile]);
        Daily_WeatherData_collection[idx_row].push(data_daily.daily_units.sunrise);

        Daily_WeatherData_collection[idx_row].push(data_daily.daily.sunset[idx_jsonFile]);
        Daily_WeatherData_collection[idx_row].push(data_daily.daily_units.sunset);

        Daily_WeatherData_collection[idx_row].push(data_daily.daily.precipitation_sum[idx_jsonFile]);
        Daily_WeatherData_collection[idx_row].push(data_daily.daily_units.precipitation_sum);

        Daily_WeatherData_collection[idx_row].push(data_daily.daily.showers_sum[idx_jsonFile]);
        Daily_WeatherData_collection[idx_row].push(data_daily.daily_units.showers_sum);

        Daily_WeatherData_collection[idx_row].push(data_daily.daily.snowfall_sum[idx_jsonFile]);
        Daily_WeatherData_collection[idx_row].push(data_daily.daily_units.snowfall_sum);

        Daily_WeatherData_collection[idx_row].push(data_daily.daily.wind_direction_10m_dominant[idx_jsonFile]);
        Daily_WeatherData_collection[idx_row].push(data_daily.daily_units.wind_direction_10m_dominant);

        Daily_WeatherData_collection[idx_row].push(data_daily.daily.wind_gusts_10m_max[idx_jsonFile]);
        Daily_WeatherData_collection[idx_row].push(data_daily.daily_units.wind_gusts_10m_max);

        Daily_WeatherData_collection[idx_row].push(data_daily.daily.wind_speed_10m_max[idx_jsonFile]);
        Daily_WeatherData_collection[idx_row].push(data_daily.daily_units.wind_speed_10m_max);

        Daily_WeatherData_collection[idx_row].push(data_daily.daily.weather_code[idx_jsonFile]);
        idx_jsonFile++;
        
    }

    return (Daily_WeatherData_collection);
}

function Transform_JSON_to_Table_Hourly(data_hourly, Hourly_WeatherData_Collection)
{
    let     idx_row;
    let     idx_jsonFile;

    idx_row = 0;
    idx_jsonFile = 0;
    
    Hourly_WeatherData_Collection[idx_row] = ['time', 'temperature_2m', 'unit', 'apparent_temperature', 'unit', 'wind_direction_10m', 'unit', 'wind_speed_10m', 'unit', 'snowfall', 'unit', 'rain', 'unit','cloud_cover', 'unit', 'relative_humidity_2m', 'unit', 'WMO_codes'];
       
    while(idx_jsonFile < data_hourly.hourly.time.length)
    {
        idx_row++;

        if (!Hourly_WeatherData_Collection[idx_row]) 
            Hourly_WeatherData_Collection[idx_row] = [];  

        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly.time[idx_jsonFile]);
        
        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly.temperature_2m[idx_jsonFile]);
        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly_units.temperature_2m);

        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly.apparent_temperature[idx_jsonFile]);
        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly_units.apparent_temperature);

        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly.wind_direction_10m[idx_jsonFile]);
        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly_units.wind_direction_10m);

        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly.wind_speed_10m[idx_jsonFile]);
        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly_units.wind_speed_10m);

        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly.snowfall[idx_jsonFile]);
        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly_units.snowfall);

        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly.rain[idx_jsonFile]);
        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly_units.rain);

        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly.cloud_cover[idx_jsonFile]);
        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly_units.cloud_cover);

        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly.relative_humidity_2m[idx_jsonFile]);
        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly_units.relative_humidity_2m);

        Hourly_WeatherData_Collection[idx_row].push(data_hourly.hourly.weather_code[idx_jsonFile]);

        idx_jsonFile++;
    }

    return(Hourly_WeatherData_Collection);
} 
