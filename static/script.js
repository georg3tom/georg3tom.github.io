// Add fade-in animation on page load
document.addEventListener("DOMContentLoaded", () => {
  // Animate main sections
  const sections = document.querySelectorAll("section, header");
  sections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition =
      "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

    setTimeout(() => {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }, index * 150);
  });

  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link, index) => {
    link.style.opacity = "0";
    link.style.transform = "scale(0.8)";
    link.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

    setTimeout(
      () => {
        link.style.opacity = "1";
        link.style.transform = "scale(1)";
      },
      500 + index * 100,
    );
  });

  updateTime();
  getWeather();
});

function updateTime() {
  const timeElement = document.querySelector(".time-text");

  function setTime() {
    const now = new Date();
    const istTime = now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    timeElement.textContent = `${istTime} IST`;
  }

  setTime();
  setInterval(setTime, 1000);
}

// Get weather data
async function getWeather() {
  const weatherIcon = document.querySelector(".weather-container i");
  const weatherText = document.querySelector(".weather-text");
  const weatherTemp = document.querySelector(".weather-temp");

  try {
    const latitude = 9.9;
    const longitude = 76.3;

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weathercode,temperature_2m`,
    );

    if (!response.ok) throw new Error("Weather data not available");

    const data = await response.json();

    const temp = Math.round(data.current.temperature_2m);
    const weatherCode = data.current.weathercode;
    const description = getWeatherDescription(weatherCode);

    weatherTemp.textContent = `${temp}°C`;
    weatherText.textContent = description;

    const iconClass = getWeatherIconClass(weatherCode);
    weatherIcon.className = `fas ${iconClass}`;
  } catch (error) {
    weatherText.textContent = "Weather unavailable";
    weatherIcon.className = "fas fa-cloud";
  }
}

function getWeatherDescription(code) {
  switch (code) {
    case 0:
      return "Clear sky";
    case 1:
      return "Mainly clear";
    case 2:
      return "Partly cloudy";
    case 3:
      return "Overcast";
    case 45:
    case 48:
      return "Foggy";
    case 51:
    case 53:
    case 55:
      return "Drizzle";
    case 56:
    case 57:
      return "Freezing drizzle";
    case 61:
    case 63:
    case 65:
      return "Rain";
    case 66:
    case 67:
      return "Freezing rain";
    case 71:
    case 73:
    case 75:
      return "Snow";
    case 77:
      return "Snow grains";
    case 80:
    case 81:
    case 82:
      return "Rain showers";
    case 85:
    case 86:
      return "Snow showers";
    case 95:
      return "Thunderstorm";
    case 96:
    case 99:
      return "Thunderstorm with hail";
    default:
      return "Unknown";
  }
}

function getWeatherIconClass(code) {
  switch (code) {
    case 0:
      return "fa-sun"; // Clear sky
    case 1:
      return "fa-sun"; // Mainly clear
    case 2:
      return "fa-cloud-sun"; // Partly cloudy
    case 3:
      return "fa-cloud"; // Overcast
    case 45:
    case 48:
      return "fa-smog"; // Fog
    case 51:
    case 53:
    case 55:
      return "fa-cloud-rain"; // Drizzle
    case 56:
    case 57:
      return "fa-cloud-rain"; // Freezing drizzle
    case 61:
    case 63:
    case 65:
      return "fa-cloud-showers-heavy"; // Rain
    case 66:
    case 67:
      return "fa-cloud-rain"; // Freezing rain
    case 71:
    case 73:
    case 75:
      return "fa-snowflake"; // Snow
    case 77:
      return "fa-snowflake"; // Snow grains
    case 80:
    case 81:
    case 82:
      return "fa-cloud-showers-heavy"; // Rain showers
    case 85:
    case 86:
      return "fa-snowflake"; // Snow showers
    case 95:
      return "fa-bolt"; // Thunderstorm
    case 96:
    case 99:
      return "fa-bolt"; // Thunderstorm with hail
    default:
      return "fa-cloud"; // Default
  }
}

