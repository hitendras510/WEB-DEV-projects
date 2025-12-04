let time = document.getElementById("time");
let dateEl = document.getElementById("date");
let dayEl = document.getElementById("day");

function updateclock() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");

    let d = now.getDate();
    let m = now.getMonth() + 1; // month fix
    let y = now.getFullYear();

    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let dayName = days[now.getDay()];

    time.textContent = `${hours}:${minutes}:${seconds}`;
    dateEl.textContent = `${d}/${m}/${y}`;
    dayEl.textContent = dayName;

    setTimeout(updateclock, 1000);
}

updateclock();
