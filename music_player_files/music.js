// import {songs} from "./song";

const volume = document.querySelector('#volume');
const audio = document.querySelector('#audio')
const start_pause = document.querySelector('#start_pause');
const stop = document.querySelector('#stop');
const repeat = document.querySelector('#repeat');
const range = document.querySelector('#range');

/**ミュート機能 */
volume.addEventListener('click', function(){
    if(audio.volume > 0){
        previousVolume = audio.volume;
        audio.volume = audio.muted;
        volume.classList.remove("fa-volume-high");
        volume.classList.add("fa-volume-xmark");
    } else {
        audio.volume = previousVolume;
        volume.classList.remove("fa-volume-xmark");
        volume.classList.add("fa-volume-high");
    }
});

/**再生＆一時停止 */
start_pause.addEventListener('click', function(){
    if(start_pause.classList.contains("fa-play")){
        audio.play();
        start_pause.classList.remove("fa-play");
        start_pause.classList.add("fa-pause");
    } else {
        audio.pause();
        start_pause.classList.remove("fa-pause");
        start_pause.classList.add("fa-play");
    }
});

/**ループ処理 */
repeat.addEventListener('click', function(){
    if(repeat.id == "repeat") {
        audio.loop = true; 
        repeat.id = "repeat-on";
    } else {
        audio.loop = false;
        repeat.id = "repeat";
    }
})