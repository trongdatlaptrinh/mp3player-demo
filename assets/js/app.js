const song = document.getElementById('song');
const playBtn = document.querySelector('.player-inner');
const nextBtn = document.querySelector('.play-forward');
const prevBtn = document.querySelector('.play-back');
const durationTime = document.querySelector('.duration');
const remainingTime = document.querySelector('.remaining');
const rangeBar = document.querySelector('.range');
const musicName = document.querySelector('.music-name');
const musicThumbnail = document.querySelector('.music-thumb');
const musicImage = document.querySelector('.music-thumb img');
const playRepeat = document.querySelector('.play-repeat');

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;

// const musics = ['god-is-a-girl.mp3',
// 'DJ-YA-ODNA.mp3'];

const musics = [
    {
        id : 1,
        tittle: 'God Is A Girl',
        file: 'god-is-a-girl.mp3',
        image: './assets/img/music-thumb/GodIsAGirl.jpg'
    },
    {
        id : 2,
        tittle: 'DJ YA ODNA X BROKEN ANGEL BREAKBEAT VIRAL TIK TOK TERBARU 2023 YANG KALIAN CARI !',
        file: 'DJ-YA-ODNA.mp3',
        image: './assets/img/music-thumb/DjYaOdna.jpg'
    },
    {
        id : 3,
        tittle: 'Faded',
        file: 'Faded.mp3',
        image: './assets/img/music-thumb/faded.png'
    }
];

/** 
 * Music 
 * id: 1
 * tittle: god-is-a-girl
 * src: god-is-a-girl.mp3
 * image: god-is-a-girl
 */

let timer;
let repeatCount = 0;

playRepeat.addEventListener('click', function (){
    if(isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute('style');
    }
    else {
        isRepeat = true;
        playRepeat.style.color = '#ffb86c';
    }
});

nextBtn.addEventListener('click',function (){
    changeSong(1);
});

prevBtn.addEventListener('click',function (){
    changeSong(-1);
});

song.addEventListener('ended',handleEndedSong);

function handleEndedSong(){
    repeatCount++;
    if(isRepeat && repeatCount === 1){
        // handle repeat song
        isPlaying = true;
        playPause();
    }
    else{
        changeSong(1);
    }
}

function changeSong(dir){
    if(dir === 1){
        // next song
        indexSong++;
        if(indexSong >= musics.length){
            indexSong = 0;
        }
        isPlaying = true;
    } else if(dir === -1){
        // previous song
        indexSong--;
        if(indexSong < 0){
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    init(indexSong);
    // song.setAttribute("src",`./assets/music/${musics[indexSong].file}`);
    playPause();
}

playBtn.addEventListener('click',playPause);

function playPause(){
    if(isPlaying){
        musicThumbnail.classList.add('is-playing');
        song.play();
        playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    }
    else{
        musicThumbnail.classList.remove('is-playing');
        song.pause();
        playBtn.innerHTML = `<i class="fa-solid fa-play play-icon"></i>`;
        isPlaying = true;
        clearInterval(timer);
    }
}

function displayTimer(){
    const {duration, currentTime} = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if(!duration){
        durationTime.textContent = '00:00';
    }
    else{
        durationTime.textContent = formatTimer(duration);
    }
}

function formatTimer(number){
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:
    ${seconds < 10 ? '0' + seconds: seconds}`;
}

rangeBar.addEventListener('change',handleChangeBar);

function handleChangeBar(){
    song.currentTime = rangeBar.value;
}

function init(indexSong){
    song.setAttribute('src',`./assets/music/${musics[indexSong].file}`);
    musicImage.setAttribute('src',musics[indexSong].image);
    musicName.textContent = musics[indexSong].tittle;
}

displayTimer();
init(indexSong);
