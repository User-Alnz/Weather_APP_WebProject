export function hanldeDynamicBackgroundChange()
{
    var     index; 
    var     backgroundSelection;
    var     eachTimeOutrepeat;
   
    const BackgroundList =[
        "linear-gradient(rgba(255 255 255 / 18%), rgba(0 0 0 / 80%)),url('/Images_source/UI_landscape_interface/landscape_Images_sources/Background_late_after_noon.jpg')",
        "linear-gradient(rgba(255 255 255 / 18%), rgba(0 0 0 / 80%)),url('/Images_source/UI_landscape_interface/landscape_Images_sources/Background_after_noon_summer.jpg')",
        "linear-gradient(rgba(255 255 255 / 18%), rgba(0 0 0 / 80%)),url('/Images_source/UI_landscape_interface/landscape_Images_sources/Background_earlymoorning.jpg')",
        "linear-gradient(rgba(255 255 255 / 18%), rgba(0 0 0 / 80%)),url('/Images_source/UI_landscape_interface/landscape_Images_sources/Background_moorning.jpg')",
        "linear-gradient(rgba(255 255 255 / 18%), rgba(0 0 0 / 80%)),url('/Images_source/UI_landscape_interface/landscape_Images_sources/Background_morning_summer.jpg')",
        "linear-gradient(rgba(255 255 255 / 18%), rgba(0 0 0 / 80%)),url('/Images_source/UI_landscape_interface/landscape_Images_sources/Background_mountain_after_noon.jpg')",
        "linear-gradient(rgba(255 255 255 / 18%), rgba(0 0 0 / 80%)),url('/Images_source/UI_landscape_interface/landscape_Images_sources/Background_night.jpg')",
        "linear-gradient(rgba(255 255 255 / 18%), rgba(0 0 0 / 80%)),url('/Images_source/UI_landscape_interface/landscape_Images_sources/Background_noon.jpg')",
        "linear-gradient(rgba(255 255 255 / 18%), rgba(0 0 0 / 80%)),url('/Images_source/UI_landscape_interface/landscape_Images_sources/Backgroung_cloody.jpg')"
    ];

    index = 0;
    backgroundSelection = document.getElementsByClassName('container');
    eachTimeOutrepeat = (1000 * 60) * 5; //change each 5 minutes
    
    function changeBackground()
    {
        backgroundSelection[0].style.backgroundImage = BackgroundList[index];
        index = (index + 1) % BackgroundList.length;
    }
   
    changeBackground();
    setInterval(changeBackground, eachTimeOutrepeat);
}