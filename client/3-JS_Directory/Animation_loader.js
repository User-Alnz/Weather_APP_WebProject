export function StartLoader()
{
    const loader = document.createElement('div');
    loader.id = 'loaderWrapper';
 
    const skyBackground = document.createElement('div');
    skyBackground.id = "skyBackground";

    const pulseAnimation1 = document.createElement('div');
    pulseAnimation1.id = "animation";

    const pulseAnimation2 = document.createElement('span');
    pulseAnimation2.id = "animationDelay";

    document.body.appendChild(loader);
    loader.appendChild(skyBackground);
    skyBackground.appendChild(pulseAnimation1);
    skyBackground.appendChild(pulseAnimation2);

}

 export function StopLoader() 
{
    const loader = document.getElementById('loaderWrapper'); //loaderWrapper

    if(loader) 
    loader.remove();
}