const createDOM = (src, realTemp_text, feelTemp_text, temp_time) => {
    
    console.log(`${src} || ${realTemp_text} || ${feelTemp_text}`);
    const forecast = document.querySelector('.forecast-hour');



    const oneHour = document.createElement('div');
    oneHour.classList.add('one-hour');
    forecast.appendChild(oneHour);

    const img = document.createElement('img');
    img.src = src;
    img.classList.add('weather-img');
    oneHour.appendChild(img);

    const tempPart = document.createElement('div');
    tempPart.classList.add('weather-part');
    oneHour.appendChild(tempPart);

    const realTemp = document.createElement('h1');
    realTemp.classList.add('real-temp-forecast');
    realTemp.textContent = realTemp_text;
    tempPart.appendChild(realTemp);

    const feelTemp = document.createElement('p');
    feelTemp.classList.add('temp-feeling-forecast');
    feelTemp.textContent = feelTemp_text;
    tempPart.appendChild(feelTemp);

    const time = document.createElement('p');
    time.classList.add('forecast-time');
    time.textContent = temp_time + ':00';
    oneHour.appendChild(time)
}

export default createDOM