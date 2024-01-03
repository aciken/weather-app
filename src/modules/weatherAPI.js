const apiFunct = () =>{

    const searchBtn = document.querySelector('.search-city');
    const cityInput = document.querySelector('.city-input');
    const displayTemp = document.querySelector('.display-temp');

    

    searchBtn.addEventListener('click', () =>{
        let apiKey = 'https://api.weatherapi.com/v1/current.json?key=eb01e213248b4bac8c5151242240301&q='
        apiKey += cityInput.value

        fetch(apiKey, {
            mode: 'cors'
        })
      .then(res => res.json())
      .then(data => {
        displayTemp.textContent = data['current'].temp_c;
      })
    
    
      .catch(function(err) {
        console.log('nott')
      });
    })


}

export default apiFunct