    import {is_night_now} from "./Define_if_is_Night_or_Day.js";
    //------------------------------------------------------------
        /* Global Variables  */
    //------------------------------------------------------------

    var     path_to_png_directory;
    var     path_to_WMO_Codes;
    var     WMO_json; // used later to store json file from retrieve_jsonfile() in main function. 

    path_to_png_directory = "/Images_source/PNG_icons_256x256";
    path_to_WMO_Codes = "/WMO_Weather_Codes/WMO_Weather_codes_interpretations.json"; 

    //------------------------------------------------------------
        /* Main function  */
    //------------------------------------------------------------

    export async function main_script_handle_icon_and_description_for_the_day(Hourly_WeatherData_Collection, Daily_data_collection, icon_current_weather, display_apparent_temperature_description)
    {
        retrieve_jsonfile() 
        .then((WMO_json)=>{

            display_description(Hourly_WeatherData_Collection, Daily_data_collection, WMO_json, display_apparent_temperature_description);
            display_icon(Hourly_WeatherData_Collection, Daily_data_collection, WMO_json, icon_current_weather);
        })
        .catch(error=> console.error("error with main_script_handle_icon_and_description_for_the_day ", error));
    }

    //------------------------------------------------------------
        /* functions called in main_script_handle_icon_and_description_for_the_day() */
    //------------------------------------------------------------

    async function retrieve_jsonfile()
    {
        var     xhr; // XML HTTP Request

        return new Promise((resolve, reject) => 
        {    
            xhr = new XMLHttpRequest();
            xhr.open("GET", path_to_WMO_Codes, true );
            xhr.responseType = "json";

            xhr.onload = function get_WMO_json()
            {
                // console.log(this); //console.log obj structure if needed
                if(this.readyState == 4 && this.status == 200 ) 
                {
                    WMO_json = xhr.response;
                    //console.log(WMO_json);
                    resolve(WMO_json);
                }
                else if(this.readyState == 4 && this.status !== 200 )
                {
                    console.error("Error while accesing file. Server status : " + this.status);
                    reject(error);
                }
                else
                {
                    console.error("Error with Request. Impossible to process", this.status, this.statusText);
                    reject(error);
                }
            }
            xhr.send();
        })
    }

    
    async  function display_icon(Hourly_WeatherData_Collection, Daily_data_collection, WMO_json, icon_current_weather)
    {
        
        var     obj_day;
        var     idx_WMNO_code;
        var     array_length;
        var     idx;
        var     url;

        obj_day = new Date();
        const hours = obj_day.getHours(); //Define current hour now to define where to find WMO code from the row pointing the time it's now.

        idx_WMNO_code = Hourly_WeatherData_Collection[hours+1][17]; //define right WMO_code to pick from tab. | first row of tab is made of title like "time", "unit", "WMO_codes"etc.. So we start from idx[0+1].
        array_length = Object.keys(WMO_json).length; 
        idx = 0;
      
            while (idx < array_length)
            {
                if(idx_WMNO_code == Object.keys(WMO_json)[idx]) // if WMO Code from tab is in WMO json
                {
                    if(is_night_now(Daily_data_collection))
                    {
                        url = path_to_png_directory + '/' + WMO_json[idx_WMNO_code].night.icon;
                        icon_current_weather.src =  url;
                            return(icon_current_weather.src);
                    }
                    else
                    {
                        url = path_to_png_directory + '/' + WMO_json[idx_WMNO_code].day.icon;
                        icon_current_weather.src =  url;
                            return(icon_current_weather.src);
                    }
                }
            idx++;
            }
    }

    async function display_description(Hourly_WeatherData_Collection, Daily_data_collection, WMO_json, display_apparent_temperature_description)
    {   
        var     obj_day;
        var     idx_WMNO_code;
        var     array_length;
        var     idx;
        var     description;

        obj_day = new Date();
        const hours = obj_day.getHours(); 

        idx_WMNO_code = Hourly_WeatherData_Collection[hours+1][17];
        array_length = Object.keys(WMO_json).length; 
        idx = 0;

            while  (idx < array_length)
            {
                if(idx_WMNO_code == Object.keys(WMO_json)[idx])
                {   
                    if(is_night_now(Daily_data_collection))
                    {
                        description = WMO_json[idx_WMNO_code].night.description;
                        display_apparent_temperature_description.innerHTML = description;
                            return(display_apparent_temperature_description);
                    }
                    else
                    {
                        description = WMO_json[idx_WMNO_code].day.description;
                        display_apparent_temperature_description.innerHTML = description;
                            return(display_apparent_temperature_description);
                    }
                }
                idx++;
            }
    }