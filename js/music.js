import { songs } from './song.js';

const volume = document.querySelector('#volume');
const audio = document.querySelector('#audio');

/* 音楽のタイトル*/
const songName = document.querySelector('.song-name');
/* 作曲者 */
const artist = document.querySelector('.artist-name');
/*画像 */
const image = document.querySelector('#song-image');

const current_Time = document.querySelector('#current-time');
const total_Time = document.querySelector('#total-time');
const start_pause = document.querySelector('#start_pause');
const stop = document.querySelector('#stop');
const repeat = document.querySelector('#repeat');
const range = document.querySelector('#range');
const shuffle = document.querySelector('#shuffle');

const backward = document.querySelector('#backward');
const forward = document.querySelector('#forward');

/**音楽読み込み */
let currentIndex = 0;
let shuffleIndex = 0;

function loadSong(index) {
  const song = songs[index];
  songName.textContent = song.title;
  artist.textContent = song.artist;
  image.src = song.image;
  audio.src = song.path;
}

document.addEventListener('DOMContentLoaded', () => {
  loadSong(currentIndex);
});

//**rangeとaudioの連動 */
audio.addEventListener('canplaythrough', function () {
  range.max = audio.duration;

  current_Time.textContent = formatTime(audio.currentTime);

  total_Time.textContent = formatTime(audio.duration);
  // range.value = audio.currentTime;
});

// 時間バーの連動
audio.addEventListener('timeupdate', function () {
  range.value = audio.currentTime;

  current_Time.textContent = formatTime(audio.currentTime);

  total_Time.textContent = formatTime(audio.duration);
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

range.addEventListener('input', function () {
  audio.currentTime = range.value;
});

// 曲の終了時、次の曲へ
audio.addEventListener('ended', function () {
  if (shuffle.id === 'shuffle-on') {
    // リピートがオンの場合、現在の曲を再度再生
    currentIndex = getRandom(songs.length);
  } else if (repeat.id === 'repeat-on') {
    audio.play();
    return;
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
  }
  loadSong(currentIndex);
  audio.play();
});

/**ミュート機能 */

volume.addEventListener('click', function () {
  if (!audio.muted) {
    audio.muted = true;
    volume.classList.remove('fa-volume-high');
    volume.classList.add('fa-volume-xmark');
  } else {
    audio.muted = false;
    volume.classList.remove('fa-volume-xmark');
    volume.classList.add('fa-volume-high');
  }
});

/**再生＆一時停止 */
start_pause.addEventListener('click', function () {
  if (start_pause.classList.contains('fa-play')) {
    audio.play();
    start_pause.classList.remove('fa-play');
    start_pause.classList.add('fa-pause');
  } else {
    audio.pause();
    start_pause.classList.remove('fa-pause');
    start_pause.classList.add('fa-play');
  }
});

/** 前の曲に戻る */
backward.addEventListener('click', function () {
  if (shuffle.id === 'shuffle-on') {
    currentIndex = getRandom(songs.length);
  } else {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  }

  loadSong(currentIndex);
  audio.play();
});

/** 次の曲に進む */
forward.addEventListener('click', function () {
  if (shuffle.id === 'shuffle-on') {
    currentIndex = getRandom(songs.length);
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
  }
  loadSong(currentIndex);
  audio.play();
});

/**ループ処理 */
repeat.addEventListener('click', function () {
  if (repeat.id == 'repeat') {
    audio.loop = true;
    repeat.id = 'repeat-on';
  } else {
    audio.loop = false;
    repeat.id = 'repeat';
  }
});
// シャッフル
shuffle.addEventListener('click', function () {
  if (shuffle.id == 'shuffle') {
    shuffle.id = 'shuffle-on';
    // let shuffleIndex = getRandom(songs.length);
  } else {
    shuffle.id = 'shuffle';
  }
});

//  ランダム関数
function getRandom(max) {
  return Math.floor(Math.random() * max);
}
