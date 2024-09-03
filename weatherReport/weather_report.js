function showWeatherDetails(event) {
    event.preventDefault(); // Prevent form submission
  
    const city = document.getElementById('city').value;
    const apiKey = 'e502f3796933c566d26d1f97e8fd417c'; // Replace with your actual API key
  
    // Step 1: Use Geocoding API to get coordinates
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  
    fetch(geocodeUrl)
      .then(response => {
        console.log('Geocoding API Response:', response);
        return response.json();
      })
      .then(locationData => {
        console.log('Geocoding API Data:', locationData);
        if (locationData.length === 0) {
          throw new Error('City not found');
        }
  
        const { lat, lon } = locationData[0];
  
        // Step 2: Fetch weather data using coordinates
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
        return fetch(weatherUrl);
      })
      .then(response => {
        console.log('Weather API Response:', response);
        return response.json();
      })
      .then(weatherData => {
        console.log('Weather API Data:', weatherData);
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `<h2>Weather in ${weatherData.name}</h2>
                                  <p>Temperature: ${weatherData.main.temp} &#8451;</p>
                                  <p>Weather: ${weatherData.weather[0].description}</p>`;
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
      });
  }
  
  // Attach the event listener to the form
  document.getElementById('weatherForm').addEventListener('submit', showWeatherDetails);