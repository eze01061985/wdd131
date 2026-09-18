const temperature = 10;
const windSpeed = 5;

function calculateWindChill(temp, speed) {
  return 13.12 + 0.6215 * temp - 11.37 * speed ** 0.16 + 0.3965 * temp * speed ** 0.16;
}

const windChill = temperature <= 10 && windSpeed > 4.8
  ? `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`
  : "N/A";

document.querySelector("#temperature").textContent = temperature;
document.querySelector("#wind-speed").textContent = windSpeed;
document.querySelector("#wind-chill").textContent = windChill;
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = `Last Modification: ${document.lastModified}`;
