document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    setTimeout(() => {
      section.classList.add("animate-in");
    }, index * 150);
  });

  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link, index) => {
    setTimeout(
      () => {
        link.classList.add("animate-in");
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
  setInterval(setTime, 30000);
}

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

async function copyEmail() {
  const el = document.querySelector(".email-text");
  const email = el.textContent;
  
  try {
    await navigator.clipboard.writeText(email);
    el.textContent = "copied to clipboard";
    setTimeout(() => el.textContent = email, 2000);
  } catch {}
}