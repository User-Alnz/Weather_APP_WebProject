export function Date_today()
{
    const   display_date_today = document.getElementById("date");
    const   dayNames_ENG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    const   monthNames_ENG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const   hours_DoubleDigits_format = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09","10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

    const   obj_day = new Date();
    let     string;
        
    const   day = obj_day.getDay();
    const   date = obj_day.getDate();
    const   month = obj_day.getMonth();
    const   hours = obj_day.getHours();
    let     minutes = obj_day.getMinutes(); // type of is 'number'!

    if (minutes >= 0 && minutes <= 9)
    {
        minutes = minutes.toString(); //transf 'int' to 'str'
        minutes = '0' + minutes;
    }
    
    string = `${dayNames_ENG[day]} ${date} ${monthNames_ENG[month]} ${hours_DoubleDigits_format[hours]}:${minutes}`;
    return(display_date_today.innerHTML = string);
}

export function DisplayDateSyncInRealTime()
{
    let     callItEachMinute = 60000;
    Date_today();
    setInterval(Date_today, callItEachMinute);
}