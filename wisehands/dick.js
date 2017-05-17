var video = document.getElementById('watchMe');
var overlay = document.getElementById('overlay');

video.addEventListener('ended', function(){
    overlay.style.display = 'block';
}, false);

function openPussy() {
    overlay.style.display = 'none';
    var video = document.querySelector('video')
    var source = video.querySelector('source')

    source.setAttribute('src', 'pussy.mp4');

    video.appendChild(source);
    video.load();
    video.play();
}