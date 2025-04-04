    console.log("This project is made from scratch and for educational purpose\n\nTech used: HTML/CSS/JS. the app is fully responsive and will adapt all screen type & size even landscape orientation on phone ;)\n\nVisit my https://github.com/User-Alnz");
    
    //------------------------------------------------------------
        /*All CSSFiles to bo compiled with webpack into bundle.js*/
    //------------------------------------------------------------
    import '../2-CSS_Directory/AnimationLoader.css';
    import '../2-CSS_Directory/Fonts.css';
    import '../2-CSS_Directory/Nav_top_bar_menu.css';
    import '../2-CSS_Directory/Section_daily_weather_data.css';
    import '../2-CSS_Directory/Section_weekly_weather_data.css';
    import '../2-CSS_Directory/Main_layout.css';


    //------------------------------------------------------------
        /*All functions imported */
    //------------------------------------------------------------

import {StartLoader, StopLoader} from "./Animation_loader.js";
import {hanldeDynamicBackgroundChange} from "./changeBackgroundAnimation.js";
import {Call_Meteomatics_API} from "./Get_API_data.js";
import {Date_today, DisplayDateSyncInRealTime} from "./handle_dates.js";
import {Get_sunrise, Get_sunset, Display_apparent_temperature, Display_weather_for_the_day, Temperature_right_now} from "./daily_weather_data_functions.js";
import {main_script_handle_details} from "./More_details_functions.js";
import {main_script_handle_dates_and_temperatures_for_week} from "./weekly_weather_data_functions.js";
import {main_script_handle_icon_and_description_for_the_day} from "./Icone_manager_WMO_interpreter_for_the_day.js";
import {main_script_handle_icons_and_descriptions_per_hours} from "./Icone_manager_WMO_interpreter_for_hours.js";
import {main_script_handle_icons_and_descriptions_for_the_week} from "./Icone_manager_WMO_interpreter_for_the_week.js";

    //------------------------------------------------------------
        /*Json file from API call is temp store into tab to handle data */
    //------------------------------------------------------------

var     Hourly_WeatherData_Collection = [];
var     Daily_WeatherData_collection = [];

    //------------------------------------------------------------
        /* daily_weather_data - selection in DOM */
        
        // all used in main ()
    //------------------------------------------------------------

const   icon_current_weather = document.getElementById("icon_current_weather");
const   display_sunrise = document.getElementById("daily_sunrise");
const   display_sunset = document.getElementById("daily_sunset");
const   display_temp_now = document.getElementById("current_temperature");
const   display_apparent_temperature = document.getElementById("apparent_temperature");
const   display_apparent_temperature_description = document.getElementById("apparent_temperature_description");
const   display_weather_more_details = document.getElementsByClassName("more_details");
const   Main_pack_daily_collection = document.getElementsByClassName("Main_pack");
const   daily_temp_collection = document.getElementsByClassName("daily_temp");

    //------------------------------------------------------------
        /* weekly_weather_data - selection in DOM*/

        //used in main ()
    //------------------------------------------------------------
const   Main_pack_weekly_collection = document.getElementsByClassName("Main_pack_weekly");


    //------------------------------------------------------------
        /*Call_Meteomatics_API calls API and store data temporary into tabs */
    //------------------------------------------------------------
    StartLoader();
    hanldeDynamicBackgroundChange();

    Call_Meteomatics_API(Hourly_WeatherData_Collection, Daily_WeatherData_collection)
    .then(() => {  main(); StopLoader(); })
    .catch(error=> console.error("main function not run | check ft calling API", error));


    //------------------------------------------------------------
        /* Main function  */
    //------------------------------------------------------------
async function main()
{
    const   DateObject = new Date(); 
    let     seconds = DateObject.getSeconds();
    let     SynchronizeTimeToRealTimeSpending = (60 - seconds) * 1000;
  
    try
    {
        /* daily_weather_data - selection in DOM */
        display_sunrise.innerHTML = Get_sunrise(Daily_WeatherData_collection);
        display_sunset.innerHTML = Get_sunset(Daily_WeatherData_collection);
        Date_today();
        setTimeout(() => DisplayDateSyncInRealTime(), SynchronizeTimeToRealTimeSpending); 
        display_apparent_temperature.innerHTML = Display_apparent_temperature(Hourly_WeatherData_Collection);
        display_temp_now.innerHTML = Temperature_right_now(Hourly_WeatherData_Collection);
        
        Display_weather_for_the_day(daily_temp_collection, Hourly_WeatherData_Collection);

        //functions cross data from tab "Hourly_WeatherData_Collection, Daily_WeatherData_collection" and cross it with WMO_Weather_codes.json to display right icon & description*/
        main_script_handle_icon_and_description_for_the_day(Hourly_WeatherData_Collection, Daily_WeatherData_collection,  icon_current_weather, display_apparent_temperature_description);
        main_script_handle_icons_and_descriptions_per_hours(Hourly_WeatherData_Collection, Daily_WeatherData_collection, Main_pack_daily_collection);

        
        main_script_handle_details(Hourly_WeatherData_Collection, display_weather_more_details);

        /* weekly_weather_data - selection in DOM*/

        main_script_handle_dates_and_temperatures_for_week(Hourly_WeatherData_Collection, Main_pack_weekly_collection);
        main_script_handle_icons_and_descriptions_for_the_week(Daily_WeatherData_collection, Main_pack_weekly_collection);

        /* Display tab in console if needed ! */
        //console.log(Daily_WeatherData_collection);
        //console.log(Hourly_WeatherData_Collection);
    }
    catch (error)
    {
        console.error("Failed to get data from API. Check function in main.", error);
    } 
    
}