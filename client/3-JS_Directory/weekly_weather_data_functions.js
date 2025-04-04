    //------------------------------------------------------------
        /* Main function  */
    //------------------------------------------------------------

export function main_script_handle_dates_and_temperatures_for_week(Hourly_WeatherData_Collection, Main_pack_weekly_collection)
{   
    var     idx;
    var     nb_days_in_week;
    var     hourly_array_start;
    var     hourly_array_stop;
    var     offset_array_to_nxt_24h;
    
    idx = 0;
    nb_days_in_week = 7;
    hourly_array_start = 1;
    hourly_array_stop = 24;
    offset_array_to_nxt_24h = 24;

    while(idx < nb_days_in_week) //loop into children of Main_pack_weekly_collection <div> and distribute values through function written below. 
    {   
        Main_pack_weekly_collection[idx].getElementsByClassName('day')[0].innerHTML = display_day(idx);
        Main_pack_weekly_collection[idx].getElementsByClassName('day_date')[0].innerHTML = display_date(idx);

        Main_pack_weekly_collection[idx].getElementsByClassName('max_temp')[0].innerHTML = `max <strong> +${find_max_value(hourly_array_start, hourly_array_stop, Hourly_WeatherData_Collection)}°</strong> `;
        Main_pack_weekly_collection[idx].getElementsByClassName('min_temp')[0].innerHTML = `min <strong> +${find_min_value(hourly_array_start, hourly_array_stop, Hourly_WeatherData_Collection)}°</strong> `;
        hourly_array_start += offset_array_to_nxt_24h;
        hourly_array_stop += offset_array_to_nxt_24h;
        idx++;
    }

}
    //------------------------------------------------------------
        /*Below all functions called into ft_handle_Main_pack_weekly */
    //------------------------------------------------------------

    function    display_day(idx)
    {
        const   dayNames_ENG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
        var     obj_day;
        var     str;

        obj_day = new Date();
        const   day = obj_day.getDay(); //method called return value from 0 to 6.

        if(day+idx > 6) //the end of dayNames_ENG is 6. But we need to return to 0, to get days that make up the start of the week. 
            str=`${dayNames_ENG[(day+idx)%6 -1]}`; //modulo (%6-1) allows an automatic return to 0. like that we can easily catch the next of the week from dayNames_ENG array 
            //(in a way if day > 6. idx will take lead by finding right day within the array, that's it).
        else 
            str = `${dayNames_ENG[day + idx]}`;

        return(str);
    }

    function    display_date(idx)
    {   
        const   monthNames_ENG = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var     obj_day;
        var     str;

        obj_day = new Date();
        const   date = obj_day.getDate();
        const   month = obj_day.getMonth();

        str =`${date+idx} ${monthNames_ENG[month]}`;

        return(str);
    }

    function    find_max_value(hourly_array_start, hourly_array_stop, Hourly_WeatherData_Collection)
    {   
        var     idx;
        var     max;
        var     int_value_pointed_in_tab;

        idx = hourly_array_start; 
        max = parseFloat(Hourly_WeatherData_Collection[idx][1]); //initiate max to float numb for a comparaison below in the loop. Otherwise, it wouldn't work due to 'undefined' value. 
        
        while(idx++ < hourly_array_stop)
        {   
            int_value_pointed_in_tab = parseFloat(Hourly_WeatherData_Collection[idx][1]); //transf str to float numb
            if (max < int_value_pointed_in_tab)
                max = int_value_pointed_in_tab;
        }
        
        return(max);
    }

    function    find_min_value(hourly_array_start, hourly_array_stop, Hourly_WeatherData_Collection)
    {
        var     idx;
        var     min;
        var     int_value_pointed_in_tab;

        idx = hourly_array_start;
        min = parseFloat(Hourly_WeatherData_Collection[idx][1]);
        
        while(idx++ < hourly_array_stop)
        {
            int_value_pointed_in_tab = parseFloat(Hourly_WeatherData_Collection[idx][1]);

            if(min > int_value_pointed_in_tab)
                min = int_value_pointed_in_tab;
        }
        
        return(min);
    }