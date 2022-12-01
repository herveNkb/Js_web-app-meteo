const loader = document.querySelector(".loader");

// Demande l'autorisation d'activer la géolocalisation
if (navigator.geolocation) {
  // En cas de succès
  navigator.geolocation.getCurrentPosition(
    location => {
      const long = location.coords.longitude;
      const lat = location.coords.latitude;
      getWeatherData(long, lat);
    },
      // En cas d'erreur
    () => {
      loader.textContent =
        "Vous avez refusé la géolocalisation, merci de l'activer," +
        " sinon l'application ne fonctionnera pas !";
    }
  );
}

async function getWeatherData(long, lat) {
 try {
     const results = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=fr&appid=e73c5cd27f8fcf82db88aa294035dbb3`)
     if (!results.ok) {
         throw new Error(`Erreur: ${results.status}`)
     }
     const data = await results.json();
     console.log(data);
     loader.classList.add("fade-out");
 } catch (e) {
     loader.textContent = e;
 }
}
