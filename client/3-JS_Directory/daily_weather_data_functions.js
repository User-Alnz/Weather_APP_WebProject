export function Get_sunrise(Daily_WeatherData_collection)
{
    var     idx;
    var     temp_store;
    var     sunrise;

    //console.log(Daily_WeatherData_collection); //if needed. 
    temp_store = Daily_WeatherData_collection[1][2]; //value in the array from tab is this format : "2024-09-17T06:21" | "YYYY-MM-DDTHH:MM"
    idx = temp_store.length - 5; //So we only need last 5 char in a row. 
    sunrise = 'Sunrise : ';

    while(++idx < temp_store.length) //We loop through each char in array from -5 char before the end. 
    {
        sunrise += temp_store[idx]; //Add each char one by one into string 'sunrise'. 
    }
    sunrise += ' AM';    

    return(sunrise);
}

export function Get_sunset(Daily_WeatherData_collection)
{
    var     idx;
    var     temp_store;
    var     sunset;

    temp_store = Daily_WeatherData_collection[1][4];
    idx = temp_store.length - 5;
    sunset = 'Sunset : ';

    while(++idx < temp_store.length)
    {
        sunset += temp_store[idx];
    }
    sunset += ' PM';    

    return(sunset);
}

export function Display_weather_for_the_day(var_daily_temp_collection_by_class, Hourly_WeatherData_Collection)
{
    var     midnight;
    var     three_AM;
    var     six_AM;
    var     nine_AM
    var     midday;
    var     three_PM;
    var     six_PM;
    var     nine_PM;

    //console.log(Hourly_WeatherData_Collection); // if needed. 
    midnight =  Hourly_WeatherData_Collection[1][1] + Hourly_WeatherData_Collection[1][2]; // Ex format : Hourly_WeatherData_Collection[1][1] = ('29') + Hourly_WeatherData_Collection[1][2] = ('°C')
    var_daily_temp_collection_by_class[0].innerHTML = midnight;

    three_AM =  Hourly_WeatherData_Collection[4][1] + Hourly_WeatherData_Collection[4][2];
    var_daily_temp_collection_by_class[1].innerHTML = three_AM;

    six_AM =  Hourly_WeatherData_Collection[7][1] + Hourly_WeatherData_Collection[7][2];
    var_daily_temp_collection_by_class[2].innerHTML = six_AM;

    nine_AM =  Hourly_WeatherData_Collection[10][1] + Hourly_WeatherData_Collection[10][2];
    var_daily_temp_collection_by_class[3].innerHTML = nine_AM;

    midday =  Hourly_WeatherData_Collection[13][1] + Hourly_WeatherData_Collection[13][2];
    var_daily_temp_collection_by_class[4].innerHTML = midday;

    three_PM = Hourly_WeatherData_Collection[16][1] + Hourly_WeatherData_Collection[16][2];
    var_daily_temp_collection_by_class[5].innerHTML = three_PM;

    six_PM =  Hourly_WeatherData_Collection[19][1] + Hourly_WeatherData_Collection[19][2];
    var_daily_temp_collection_by_class[6].innerHTML = six_PM;

    nine_PM = Hourly_WeatherData_Collection[22][1] + Hourly_WeatherData_Collection[22][2];
    var_daily_temp_collection_by_class[7].innerHTML = nine_PM;
}

export function Display_apparent_temperature(Hourly_WeatherData_Collection)
{
    var     apparent_temperature;
    var     obj_day;
    
    apparent_temperature = 'Feels like ';
    obj_day = new Date();

    const   hours = obj_day.getHours();
    apparent_temperature += Hourly_WeatherData_Collection[hours+1][3]; //hours+1 because array strat to 0. First row indicates name of each column in tab. | ex : "time" , "temperature_2m", "unit" etc.. 
    apparent_temperature +=  '°';

    return (apparent_temperature);
}

export function Temperature_right_now(Hourly_WeatherData_Collection)
{
    var     temperature_now;
    var     obj_day;

    temperature_now = '+ '
    obj_day = new Date();

    const   hours = obj_day.getHours();

    temperature_now += Hourly_WeatherData_Collection[hours+1][1];
    temperature_now += '°C';
    
    return (temperature_now);
}