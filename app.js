// GET USER TIME DATA

const getTime = () => {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    document.getElementById('userTimezone').innerHTML = hours + ":" + minutes;

    // AUTO REFRESHING TIME EVERY 30 SECOND

    setTimeout(() => {
        getTime();
    }, 15000)
}


// SET TIMER

const timer = {
    time: 300
}

let slider = document.getElementById('slider');

const setTimer = () => {
    let time = document.getElementById('time');
    let timeValue = document.getElementById('timerSlider').value;

    if(timeValue < 10) {
       timeValue = "0" + timeValue;
    }

    timer.time = timeValue * 60;

    time.innerHTML = `${timeValue}:00`;
}


// AUDIO

let startAudio = new Audio('sounds/start-sound.mp3');
let endAudio = new Audio('sounds/end-sound.mp3');

// BUTTONS

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const resetBtn = document.getElementById('resetBtn');

// UPDATE TIMER

let myInterval;

const updateInterval = () => {
    myInterval = setInterval(() => {
        let minutes = Math.floor(timer.time / 60);
        let seconds = timer.time % 60;
    
        if(minutes < 10) {
           minutes = "0" + minutes;
        }
    
        if(seconds < 10) {
           seconds = "0" + seconds;
        }
    
        document.getElementById('time').innerHTML = `${minutes}:${seconds}`;
    
        timer.time--;
    
        if(timer.time < 0) {
            clearInterval(myInterval);
            startBtn.style.display = 'initial';
            slider.style.display = 'initial';
            pauseBtn.style.display = 'none';
            endAudio.play();
        }
    
    }, 1000)
};


// START COUNTDOWN

const startTimer = () => {
    startBtn.style.display = "none";
    pauseBtn.style.display = "initial";
    startAudio.play();
    slider.style.display = "none";
    updateInterval();
}


// PAUSE COUNTDOWN

pauseBtn.addEventListener('click', () => {
    clearInterval(myInterval);
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'initial';
    resetBtn.style.display = 'initial';
 })

// RESUME COUNTDOWN

resumeBtn.addEventListener('click', () => {
    startAudio.play();
    resumeBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    pauseBtn.style.display = 'initial';
    updateInterval();
})

// RESET COUNTDOWN

resetBtn.addEventListener('click', () => {
    slider.style.display = 'initial';
    resumeBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    startBtn.style.display = 'initial';
    timer.time = 300;
    document.getElementById('time').innerHTML = `05:00`;
})



// CHANGE VIDEO

let icons = document.querySelectorAll('.settings-search-icon');
let video = document.querySelector('#video');

icons.forEach( icon => {
    let i = 0;
    icon.addEventListener('click', function() {

        //CHANGE SETTINGS SEARCH ICONS BACKGROUND TO

        icons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        //CHANGE VIDEO

        video.setAttribute('src', `https://res.cloudinary.com/razvaniulian/video/upload/${icon.getAttribute('alt')}/videos/${icon.getAttribute('id')}.webm`);
    })
})



// DON'T DISPLAY ON MOBILE

if(screen.width > 600) {
    document.getElementById('mobile').style.display = "none";
}   