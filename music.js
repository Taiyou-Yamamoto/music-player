const volume = document.querySelector('#volume')

const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const repeat = document.querySelector('#repeat');


volume.addEventListener('click', function(){
    if(volume.classList.contains("fa-volume-high")){
        volume.classList.remove("fa-volume-high");
        volume.classList.add("fa-volume-xmark");
    } else {
        volume.classList.remove("fa-volume-xmark");
        volume.classList.add("fa-volume-high");
    }
});