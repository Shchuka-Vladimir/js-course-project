const data = {
  url: "https://variety.com/2023/tv/news/archer-final-season-14-fxx-premiere-date-1235612849/",
  src: "./images/Archer.webp",
  title: "Archer",
  text: "the final season",
  date: "august 30",
};
let intervalId;

openTimeBlock(data);
function getTimeToFinish() {
  const currentTime = moment();
  const dataFinish = moment([2023, 07, 30, 22, 00]);
  const time = moment(dataFinish - currentTime);
  if (time <= 0) {
    clearInterval(intervalId);
    return "the season has started";
  }
  const months = dataFinish.diff(currentTime, "month");
  let millisecond = months * 1000 * 60 * 60 * 24 * 30.417;
  const days = time.diff(moment(millisecond), "day");
  millisecond += days * 1000 * 60 * 60 * 24;
  const hours = time.diff(moment(millisecond), "hour");
  millisecond += hours * 1000 * 60 * 60;
  const minutes = time.diff(moment(millisecond), "minute");
  millisecond += minutes * 1000 * 60;
  const seconds = time.diff(moment(millisecond), "second");
  return `${months} months, ${days} days, ${moment(hours, "HH").format(
    "HH"
  )}:${moment(minutes, "mm").format("mm")}:${moment(seconds, "ss").format(
    "ss"
  )}`;
}

function openTimeBlock(data) {
  const main = document.querySelector(".main");
  const timeBlock = document.createElement("a");
  timeBlock.classList.add("time-block");
  main.prepend(timeBlock);
  timeBlock.innerHTML = `
    <a
    class="time-block"
    href="${data.url}"
  >
    <img
      class="time-poster"
      src="${data.src}"
      alt="poster ${data.title}"
    />
    <div class="time-content">
    <div class="time-title">${data.title}</div>
    <div>${data.text}</div>
    <div>${data.date}</div>
    <div class="time-container">
    <div class="time"></div>
    </div>
    </div>
    
  </a>
    `;
  intervalId = setInterval(() => {
    const timeElement = document.querySelector(".time");
    timeElement.textContent = getTimeToFinish();
  }, 1000);
}
