import createDOM from "./DOMcreate";
import unitChange from "./unitChange";


const weatherBack = (function(){
  const background = {
    sunny: ['background: linear-gradient(to right, #ffb75e, #ed8f03);', "../dist/images/sun.png"],
    night: ['background: linear-gradient(to right, #141e30, #243b55)', "../dist/images/night.png"],
    cloud: ['background: linear-gradient(to right, #536976, #292e49);', "../dist/images/suncloud.png"],
    cloud_rain: ['background: linear-gradient(to right, #536976, #292e49);', "../dist/images/cloudrain.png"],
    rain_day: ['background: linear-gradient(to right, #536976, #292e49);', "../dist/images/suncloundrain.png"],
    rain_night: ['background: linear-gradient(to right, #0f2027, #203a43, #2c5364);', "../dist/images/nightrain.png"],

  }

  return {background}
})();

const apiFunct = () =>{

    const hero = document.querySelector('.hero');
    const searchBtn = document.querySelector('.search-city');
    const cityInput = document.querySelector('.city-input');
    const cityName = document.querySelector('.city-name');
    const countryName = document.querySelector('.country-name');
    const currentTemp = document.querySelector('.current-temp');
    const feelTemp = document.querySelector('.feel-temp');
    const currentImg = document.querySelector('.current-img');
    const unitCase = document.querySelector('.unit-case');
    const wrapperTipe = document.querySelector('.wraper-tipe')

  

    let preveusCity = ''

  let unitValue = false

  const weatherFunct = () =>{
    let apiKey = 'http://api.weatherapi.com/v1/forecast.json?key=eb01e213248b4bac8c5151242240301&q='
    if(cityInput.value != ''){
   apiKey += cityInput.value
   preveusCity = cityInput.value
    } else{
      apiKey += preveusCity;
    }

   apiKey += '&days=5&aqi=no&alerts=no'
   cityInput.value = ''
 
   fetch(apiKey, {
       mode: 'cors'
   })
 .then(res => res.json())
 .then(data => {
 
   let real_temp;
   let feel_temp
 
   console.log(unitValue)
   if(unitValue == false){
     real_temp = data['current'].temp_c + '°C';
      feel_temp = data['current'].feelslike_c + '°C';
   } else {
      real_temp = data['current'].temp_f + '°F';
      feel_temp = data['current'].feelslike_f + '°F';
   }
 
   const forecast = document.querySelector('.forecast-hour');
   const wraper = document.querySelector('.wraper-tipe');

   while (wraper.firstChild) {
    wraper.removeChild(wraper.firstChild);
}
 
   while (forecast.firstChild) {
       forecast.removeChild(forecast.firstChild);
   }
 
 
   cityName.textContent = data['location'].name;
   countryName.textContent = data['location'].country;
 
   currentTemp.textContent = real_temp;
   feelTemp.textContent = feel_temp;
 
 
   let dateTimeString = data.location.localtime;
   let parts = dateTimeString.split(' ');
   let timePart = parts[1];
   let timeComponents = timePart.split(':'); 
   let hour = timeComponents[0]; 
   
 
 
   currentImg.style.cssText = "width: 200px; height: 200px;"

 
   
   
   if(data.current.condition.text.includes('rain')){
     if(hour > 7 && hour < 18){
       if(data.current.cloud > 20){
         currentImg.src = weatherBack.background.cloud_rain[1];
         hero.style.cssText = weatherBack.background.cloud_rain[0]
       } else{
         currentImg.src = weatherBack.background.rain_day[1];
         hero.style.cssText = weatherBack.background.rain_day[0];
       }
     } else{
       currentImg.src = weatherBack.background.rain_night[1];
       hero.style.cssText = weatherBack.background.rain_night[0];
     }
 
   } else{
 
 
     if(hour > 7 && hour < 18){
       if(data.current.cloud > 20){
         currentImg.src = weatherBack.background.cloud[1];
         hero.style.cssText = weatherBack.background.cloud[0];
       } else{
         currentImg.src = weatherBack.background.sunny[1];
         hero.style.cssText = weatherBack.background.sunny[0];
       }
 
     } else{
       currentImg.src = weatherBack.background.night[1];
       hero.style.cssText = weatherBack.background.night[0];
     }
   }





 
   for(let i = 0; i < 5; i++){


     let image;
     if(data.forecast.forecastday[0].hour[hour].condition.text.includes('rain')){
       if(hour > 7 && hour < 18){
         if(data.forecast.forecastday[0].hour[hour].cloud > 20){
           image = weatherBack.background.cloud_rain[1];
         } else{
           image = weatherBack.background.rain_day[1];
         }
       } else{
         image = weatherBack.background.rain_night[1];
       }
     } else{
       if(hour > 7 && hour < 18){
         if(data.forecast.forecastday[0].hour[hour].cloud > 20){
           image = weatherBack.background.cloud[1];
         } else{
           image = weatherBack.background.sunny[1];
         }
       } else{
         image = weatherBack.background.night[1];
       }
     }

     if(unitValue == false){
      createDOM(image, data.forecast.forecastday[0].hour[hour].temp_c, data.forecast.forecastday[0].hour[hour].feelslike_c, hour)
     } else{
      createDOM(image, data.forecast.forecastday[0].hour[hour].temp_f, data.forecast.forecastday[0].hour[hour].feelslike_f, hour)
     }

     if(hour == 23){
       hour = -1;
     }
     hour++;
 
   }
 


 })
 
 
 .catch(function(err) {
   console.log('nott')
 });
 }

  unitCase.addEventListener('click', () =>{
    unitCase.classList.toggle('clicked');

    if(unitCase.classList.value.includes('clicked')){
      unitValue = true;
    } else{
      unitValue = false;
    }

    weatherFunct()

  })




    searchBtn.addEventListener('click', weatherFunct)
        

}


    



export default apiFunct