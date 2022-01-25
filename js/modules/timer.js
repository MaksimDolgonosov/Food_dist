
function getZero(i) {
    if (i >= 10 && i < 0) {
        return i;
    } else {
        return `0${i}`;
    }
}

function timer() {

    // Обратный таймер

    const endtime = `2021-12-27 15:01`;
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        let hours = Math.floor(t / (1000 * 60 * 60) % 24);
        let minutes = Math.floor(t / (1000 * 60) % 60);
        let seconds = Math.floor(t / 1000 % 60);

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }


    function setClock(endtime) {
        let timer = document.querySelector(".timer");
        let days = timer.querySelector("#days");
        let hours = timer.querySelector("#hours");
        let minutes = timer.querySelector("#minutes");
        let seconds = timer.querySelector("#seconds");
        let interval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            let t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(interval);
                days.innerHTML = "00";
                hours.innerHTML = "00";
                minutes.innerHTML = "00";
                seconds.innerHTML = "00";
            }
        }


    }
    setClock(endtime);


}

export default timer;
export { getZero };