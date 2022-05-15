function goHome() {
    location.href = "mainPage.html";
}

let homeButton = document.querySelector('header');

homeButton.addEventListener('click', goHome);

const url = new URL(window.location.href);
const urlParams = url.searchParams;
const videoName = urlParams.get('video');

document.title = videoName;

let birdTemp = localStorage.getItem('key');
let birdSeries = JSON.parse(birdTemp);

let thisVideoIndex;

for (let i = 0; i < birdSeries.length; i++) {
    if (birdSeries[i][0] === videoName)
        thisVideoIndex = i;
}

let temp = birdSeries[thisVideoIndex];

let videoTag = document.querySelector('.video');

videoTag.setAttribute('src', birdSeries[thisVideoIndex][2]);
videoTag.setAttribute('poster', birdSeries[thisVideoIndex][1]);
videoTag.setAttribute('title', videoName);

birdSeries.splice(thisVideoIndex, 1);
birdSeries.push(temp);

localStorage.setItem("key", JSON.stringify(birdSeries));

let videoTitleH2 = document.querySelector('.videoGrid .videoPage .videoText .videoTitle h2');
videoTitleH2.innerHTML = videoName;

let moreBtn = document.querySelector('.moreBtn');
let content = document.querySelector('.content');

moreBtn.addEventListener('click', () => {
    if (moreBtn.innerHTML === 'more')
    {
        moreBtn.innerHTML = 'less';
    }
    else if (moreBtn.innerHTML === 'less')
        moreBtn.innerHTML = 'more';
    content.classList.toggle('more');
});

let videoList = document.querySelector('.nextVideos');

for (let i = 0; i < birdSeries.length - 1; i++) {
    videoList.innerHTML +=
        '<div class="nextVideo">' +
            '<img src="' + birdSeries[i][1] + '" id="' + birdSeries[i][0] + '">' +
            '<div class="nextVideoTitle"><h5 id="' + birdSeries[i][0] + '">' + birdSeries[i][0] + '</h5></div>' +
        '</div>';
}

function goNextVideo() {
    location.replace("videoPage.html?video=" + birdSeries[0][0]);
}

videoTag.addEventListener('ended', goNextVideo);

function goVideo() {
    location.replace("videoPage.html?video=" + this.id);
}

function select() {
    this.classList.toggle('clicked');
}

function makeLinks() {
    let nextVideos = document.querySelectorAll('.nextVideo img');
    let videoTitleGaps = document.querySelectorAll('.nextVideo .nextVideoTitle');
    let videoTitles = document.querySelectorAll('.nextVideo .nextVideoTitle h5');

    for (let i = 0; i < nextVideos.length; i++) {
        nextVideos[i].addEventListener('click', goVideo);
        videoTitleGaps[i].addEventListener('click', select);
        videoTitles[i].addEventListener('click', goVideo);
    }
}

makeLinks();

let plusButton = document.querySelector('#plusButton');

plusButton.addEventListener('click', () => {
    let title = document.querySelector('#inputVideoTitle');
    let videoUrl = document.querySelector('#inputVideoUrl');

    let canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 167;
    let thumbUrl = canvas.toDataURL('image/jpeg');
    birdSeries.push([title.value, thumbUrl, videoUrl.value]);
    localStorage.setItem("key", JSON.stringify(birdSeries));
    title.value = '';
    videoUrl.value = '';

    videoList.innerHTML +=
        '<div class="nextVideo">' +
        '<img src="' + birdSeries[birdSeries.length - 1][1] + '" id="' + birdSeries[birdSeries.length - 1][0] + '">' +
        '<div class="nextVideoTitle"><h5 id="' + birdSeries[birdSeries.length - 1][0] + '">' + birdSeries[birdSeries.length - 1][0] + '</h5></div>' +
        '</div>';
    makeLinks();
});

let minusButton = document.querySelector('#minusButton');

minusButton.addEventListener('click', () => {
    let videoTitleGaps = document.querySelectorAll('.nextVideo .nextVideoTitle');
    for (let i = 0; i < birdSeries.length - 1; i++) {
        if (videoTitleGaps[i].classList.contains("clicked") === true) {
            let thisVideo = videoTitleGaps[i].children[0].innerHTML;
            for (let j = 0; j < birdSeries.length; j++) {
                if (birdSeries[j][0] === thisVideo)
                    birdSeries.splice(j, 1);
            }
            localStorage.setItem("key", JSON.stringify(birdSeries));
            videoList.innerHTML = null;
            for (let j = 0; j < birdSeries.length - 1; j++) {
                videoList.innerHTML +=
                    '<div class="nextVideo">' +
                    '<img src="' + birdSeries[j][1] + '" id="' + birdSeries[j][0] + '">' +
                    '<div class="nextVideoTitle"><h5 id="' + birdSeries[j][0] + '">' + birdSeries[j][0] + '</h5></div>' +
                    '</div>';
            }
            makeLinks();
        }
    }
})
