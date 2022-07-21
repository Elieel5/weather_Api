document.querySelector(".quest").addEventListener("submit", async (event) => {
  event.preventDefault();

  let input = document.querySelector("#searchInput").value;

  if (input !== "") {
    clearInfo();
    showWarning("Carregando...");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=a61aaa386b2f7561afadf6ce69a1871f&units=metric&lang=pt_br`;

    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcons: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning("Localização não encontrada.");
    }
  } else {
    clearInfo();
  }
});

function showInfo(json) {
  showWarning("");

  document.querySelector(".title").innerHTML = `${json.name}, ${json.country}`;
  document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector(
    ".windInfo"
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`;

  document
    .querySelector(".temp img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcons}@2x.png`
    );
  document.querySelector(
    ".windPoint"
  ).style.transform = `rotate(${json.windAngle}deg)`;

  document.querySelector(".result").style.display = "block";
}

function clearInfo() {
  showWarning("");
  document.querySelector(".result").style.display = "none";
}

function showWarning(message) {
  document.querySelector(".notice").innerHTML = message;
}
