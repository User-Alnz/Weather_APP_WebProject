    //------------------------------------------------------------
        /* Global Variables  */
    //------------------------------------------------------------

    var     path_to_png_directory;
    var     path_to_WMO_Codes;
    var     WMO_json; // used later to store json file from retrieve_jsonfile() in main functio


    path_to_png_directory = "/Images_source/PNG_icons_256x256";
    path_to_WMO_Codes = "/WMO_Weather_Codes/WMO_Weather_codes_interpretations.json"; 

    //------------------------------------------------------------
        /* Main function  */
    //------------------------------------------------------------

export function main_script_handle_icons_and_descriptions_for_the_week(Daily_WeatherData_collection, Main_pack_weekly_collection)
{
    retrieve_jsonfile()
    .then((WMO_json)=> {

        display_icons(Daily_WeatherData_collection, Main_pack_weekly_collection, WMO_json);
        display_description(Daily_WeatherData_collection, Main_pack_weekly_collection, WMO_json);

    })
    .catch(error=> console.error("main_script_handle_icons_and_descriptions_per_hours", error));
}

    //------------------------------------------------------------
       /*Below all functions called in main_script_handle_icons_and_descriptions_for_the_week() */
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

    function display_icons(Daily_WeatherData_collection, Main_pack_weekly_collection, WMO_json)
    {
        var     each_day;
        var     Array_length;
        var     idx;
        
        each_day = 1; //start to 1 because Daily_WeatherData_collection has title "WMO_codes" row 0;
        Array_length = Main_pack_weekly_collection.length;
        idx = 0;

        while(idx < Array_length) // loop through children <img>'weekly_icons' to apply function
        {
            Main_pack_weekly_collection[idx].getElementsByClassName('weekly_icons')[0].src = provide_iconURL(Daily_WeatherData_collection, WMO_json, each_day);
            each_day++;
            idx++;
        }

    }

    function provide_iconURL(Daily_WeatherData_collection, WMO_json, each_day)
    {
        var     idx_WMNO_code;
        var     json_length;
        var     idx;
        var     iconURL;
       
        idx_WMNO_code = Daily_WeatherData_collection[each_day][18];
        
        json_length = Object.keys(WMO_json).length;
        idx = 0;

        while(idx < json_length) // check if WMO_code is referenced in WMO json file. 
        {
            if(idx_WMNO_code == Object.keys(WMO_json)[idx])
            {   
                iconURL = path_to_png_directory + '/' + WMO_json[idx_WMNO_code].day.icon;
                
                    return(iconURL);
            }

            idx++;

        }
                // if not found though we went through all json code. return idx 404 with error in json        
                if(idx_WMNO_code !== Object.keys(WMO_json)[idx])
                {
                    iconURL = path_to_png_directory + '/' + WMO_json['404'].error.error_icon;
                        return(iconURL);
                }
    }

    function display_description(Daily_WeatherData_collection, Main_pack_weekly_collection, WMO_json)
    {
        var     each_day;
        var     Array_length;
        var     idx;
        
        each_day = 1; //start to 1 because Daily_WeatherData_collection has title "WMO_codes" row 0;
        Array_length = Main_pack_weekly_collection.length;
        idx = 0;

        while(idx < Array_length) // loop through children <img>'weekly_icons' to apply function
        {
        
            Main_pack_weekly_collection[idx].getElementsByClassName('weekly_comment')[0].innerHTML = provide_description(Daily_WeatherData_collection, WMO_json, each_day);
            each_day++;
            idx++;
        }
    }

    function provide_description(Daily_WeatherData_collection, WMO_json, each_day)
    {
        var     idx_WMNO_code;
        var     json_length;
        var     idx;
        var     description;
       
        
        idx_WMNO_code = Daily_WeatherData_collection[each_day][18];
        
        json_length = Object.keys(WMO_json).length;
        idx = 0;

        while(idx < json_length) // check if WMO_code is referenced in WMO json file. 
        {
            if(idx_WMNO_code == Object.keys(WMO_json)[idx])
            {   
                description = WMO_json[idx_WMNO_code].day.description_per_day;
                
                    return(description);
            }

            idx++;

        }
                // if not found though we went through all json code. return idx 404 with error in json        
                if(idx_WMNO_code !== Object.keys(WMO_json)[idx])
                {
                    description = WMO_json['404'].error.error_description_per_day;
                        return(description);
                }
    }