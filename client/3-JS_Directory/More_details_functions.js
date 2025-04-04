    //------------------------------------------------------------
        /* Main function  */
    //------------------------------------------------------------
export function main_script_handle_details(Hourly_WeatherData_Collection, display_weather_more_details)
{
    const paragraphList = display_weather_more_details[0].getElementsByTagName('p');
    
    //console.log(paragraphList);
    // wind_speed <p>
    paragraphList[1].innerHTML = `Wind speed : ${Get_wind_speed(Hourly_WeatherData_Collection)}`;
    // air_humidity <p>
    paragraphList[2].innerHTML = `Air humidity : ${Get_air_humidity(Hourly_WeatherData_Collection)}`;
    // pressure <p> // has been finally change for cloud cover in function returned because more pertinent !
    paragraphList[3].innerHTML = `Cloud cover : ${Get_cloud_cover(Hourly_WeatherData_Collection)}`;
    // precipitation <p>
    paragraphList[4].innerHTML = `Precepitation : ${Get_precepitation(Hourly_WeatherData_Collection)}`;
    
}
    //------------------------------------------------------------
        /*function Get_wind_speed */
    //------------------------------------------------------------
function Get_wind_speed(Hourly_WeatherData_Collection)
{
    const   list_of_value_wanted = "wind_speed_10m";
    var     idx;
    var     nb_of_hours_in_a_day;
    var     string;

    idx = 1;
    nb_of_hours_in_a_day = 24;

    const   maxValue_in_tab = find_max_value(idx, nb_of_hours_in_a_day, Hourly_WeatherData_Collection, list_of_value_wanted);
    const   minValue_in_tab = find_min_value(idx, nb_of_hours_in_a_day, Hourly_WeatherData_Collection, list_of_value_wanted);

    string = `${minValue_in_tab} - ${maxValue_in_tab}  Km/h`;
    return(string)
}
    //------------------------------------------------------------
        /*function Get_air_humidity */
    //------------------------------------------------------------

function Get_air_humidity(Hourly_WeatherData_Collection)
    {
        const   list_of_value_wanted = "relative_humidity_2m";

        var     idx;
        var     nb_of_hours_in_a_day;
        var     string;

        idx = 1;
        nb_of_hours_in_a_day = 24;

        const   maxValue_in_tab = find_max_value(idx, nb_of_hours_in_a_day, Hourly_WeatherData_Collection, list_of_value_wanted);
        const   minValue_in_tab = find_min_value(idx, nb_of_hours_in_a_day, Hourly_WeatherData_Collection, list_of_value_wanted);

        string = `${minValue_in_tab} - ${maxValue_in_tab} %`;
        return(string);
    }

    //------------------------------------------------------------
        /*function Get_cloud_cover */
    //------------------------------------------------------------
    function Get_cloud_cover(Hourly_WeatherData_Collection)
    {
        const   list_of_value_wanted = "cloud_cover";

        var     idx;
        var     nb_of_hours_in_a_day;
        var     string;

        idx = 1;
        nb_of_hours_in_a_day = 24;

        const   maxValue_in_tab = find_max_value(idx, nb_of_hours_in_a_day, Hourly_WeatherData_Collection, list_of_value_wanted);
        const   minValue_in_tab = find_min_value(idx, nb_of_hours_in_a_day, Hourly_WeatherData_Collection, list_of_value_wanted);
        
        string = `${minValue_in_tab} - ${maxValue_in_tab} %`;
        return(string);
    }

    //------------------------------------------------------------
        /*function Get_cloud_cover */
    //------------------------------------------------------------
    function Get_precepitation(Hourly_WeatherData_Collection)
    {
        const   list_of_value_wanted = "rain";

        var     idx;
        var     nb_of_hours_in_a_day;
        var     string;

        idx = 1;
        nb_of_hours_in_a_day = 24;

        const   maxValue_in_tab = find_max_value(idx, nb_of_hours_in_a_day, Hourly_WeatherData_Collection, list_of_value_wanted);
        const   minValue_in_tab = find_min_value(idx, nb_of_hours_in_a_day, Hourly_WeatherData_Collection, list_of_value_wanted);
        const   interpret_rain  = precipitation_interpreter(maxValue_in_tab); 

        string = `${minValue_in_tab} - ${maxValue_in_tab} mm${interpret_rain}`;
        return(string);

    }


    //------------------------------------------------------------
        /* Helper Functions : find_max_value() | find_min_value() | return_columnIdx_for_string_searched_in_tab() | precipitation_interpreter() */
    //------------------------------------------------------------

function    find_max_value(Array_start, Array_stop, Hourly_WeatherData_Collection, for_this_columnString)
{   
    var     column_idx;
    var     max;
    var     int_value_pointed_in_tab;

    column_idx = return_columnIdx_for_string_searched_in_tab(for_this_columnString, Hourly_WeatherData_Collection);
    max = parseFloat(Hourly_WeatherData_Collection[Array_start][column_idx]); 

    while(Array_start <= Array_stop)
    {  
        int_value_pointed_in_tab = parseFloat(Hourly_WeatherData_Collection[Array_start][column_idx]); //transf str to float numb
        if (max < int_value_pointed_in_tab)
            max = int_value_pointed_in_tab;
            
        Array_start++;
    }
    return(max);

}

function    find_min_value(Array_start, Array_stop, Hourly_WeatherData_Collection, for_this_columnString)
{   
    var     column_idx;
    var     min;
    var     int_value_pointed_in_tab;

    column_idx = return_columnIdx_for_string_searched_in_tab(for_this_columnString, Hourly_WeatherData_Collection);
    min = parseFloat(Hourly_WeatherData_Collection[Array_start][column_idx]); 

    while(Array_start <= Array_stop)
    {  
        int_value_pointed_in_tab = parseFloat(Hourly_WeatherData_Collection[Array_start][column_idx]);
        if (min > int_value_pointed_in_tab)
            min = int_value_pointed_in_tab;
            
        Array_start++;
    }
    return(min);

} 

/* function below is used to dynamically search in a tab depending title of the column */

function return_columnIdx_for_string_searched_in_tab(string, Hourly_WeatherData_Collection)
{
    var     idx;
    var     array_length;
    var     idx_column;

    idx = 0;
    array_length = Hourly_WeatherData_Collection[0].length;

    while(idx < array_length)
    {
        if(string == Hourly_WeatherData_Collection[0][idx])
        {
            idx_column = idx;
            return(idx_column)
        }
        idx++
    }
}


function precipitation_interpreter(maxValue_in_tab)
{
    /* 
    // Source : https://windy.app/blog/how-do-we-measure-precipitation.html#:~:text=As%20a%20general%20rule%20in,a%20month%2C%20or%20a%20year.
    Light rain gives up to 2–4 mm (0.07–0.15 in) of precipitation;
    Moderate rain gives 5–6 mm (0.19–0.23 in);
    Rain or strong rain gives up about 15–20 mm (0.59–0.78 in);
    Rainfall gives more than 30 mm (1.18 in).
    */
    var string; 

    if( 2 >= maxValue_in_tab && 4 <= maxValue_in_tab)
    {
        string = " - Light rain";
        return(string);
    } 
    else if( 5 >= maxValue_in_tab && 6 <= maxValue_in_tab)
    {
        string = " - Moderate rain";
        return(string);
    }
    else if( 7 >= maxValue_in_tab && 20 <= maxValue_in_tab)
    {
        string = " - Rain or strong rain";
        return(string);
    }
    else if( 20 > maxValue_in_tab && 30 <= maxValue_in_tab)
    {
        string = " - Rainfall";
        return(string);
    }
    else if(maxValue_in_tab > 30)
    {
        string = " - Intense Rainfall";
        return(string);
    }
    else
    {
        string = ""; // null string | return nothing
        return(string);
    }
}