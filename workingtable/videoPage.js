function goHome() {
    location.href = "mainPage.html";
}
let homeButton = document.querySelector('header');
homeButton.addEventListener('click', goHome);

// above for homeButton

const url = new URL(window.location.href);
const urlParams = url.searchParams;
const videoName = urlParams.get('video');

document.title = videoName;

let birdSeries;

if (document.cookie === '') {
    let birdTemp = localStorage.getItem('birdSeries');
    birdSeries = JSON.parse(birdTemp);
} else {
    let temp = document.cookie.split(';');
    birdSeries = JSON.parse(temp[temp.length - 1]);
}


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

localStorage.setItem("birdSeries", JSON.stringify(birdSeries));

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


function goNextVideo() {
    videoTag.setAttribute('src', birdSeries[thisVideoIndex][2]);
    videoTag.setAttribute('poster', birdSeries[thisVideoIndex][1]);
    videoTag.setAttribute('title', birdSeries[thisVideoIndex][0]);
    document.title = birdSeries[thisVideoIndex][0];
    videoTitleH2.innerHTML = birdSeries[thisVideoIndex][0];
    temp = birdSeries[thisVideoIndex];
    birdSeries.splice(thisVideoIndex, 1);
    birdSeries.push(temp);
    printVideoList(0);
}

videoTag.addEventListener('ended', goNextVideo);

function goVideo() {
    for (let i = 0; i < birdSeries.length; i++) {
        if (birdSeries[i][0] === this.id)
            thisVideoIndex = i;
    }
    videoTag.setAttribute('src', birdSeries[thisVideoIndex][2]);
    videoTag.setAttribute('poster', birdSeries[thisVideoIndex][1]);
    videoTag.setAttribute('title', birdSeries[thisVideoIndex][0]);
    document.title = birdSeries[thisVideoIndex][0];
    videoTitleH2.innerHTML = birdSeries[thisVideoIndex][0];
    temp = birdSeries[thisVideoIndex];
    birdSeries.splice(thisVideoIndex, 1);
    birdSeries.push(temp);
    printVideoList(0);
}

let videoList = document.querySelector('.nextVideos');

function printVideoList(startIndex) {
    videoList.innerHTML = null;
    printInnerHTMLs(startIndex);
    makeLinks(startIndex);
    document.cookie = JSON.stringify(birdSeries);
}

function printInnerHTMLs(startIndex) {
    for (let index = startIndex; index < birdSeries.length - 1; index++) {
        videoList.innerHTML +=
            '<div class="nextVideo">' +
            '<img src="' + birdSeries[index][1] + '" id="' + birdSeries[index][0] + '">' +
            '<div class="nextVideoTitle"><h5 id="' + birdSeries[index][0] + '">' + birdSeries[index][0] + '</h5></div>' +
            '</div>';
    }
}

function makeLinks(startIndex) {
    let nextVideos = document.querySelectorAll('.nextVideo img');
    let videoTitleGaps = document.querySelectorAll('.nextVideo .nextVideoTitle');
    let videoTitles = document.querySelectorAll('.nextVideo .nextVideoTitle h5');

    for (let index = startIndex; index < nextVideos.length; index++) {
        nextVideos[index].addEventListener('click', goVideo);
        videoTitleGaps[index].addEventListener('click', select);
        videoTitles[index].addEventListener('click', goVideo);
    }
}

function select() {
    this.classList.toggle('clicked');
}

printVideoList(0);

let plusButton = document.querySelector('#plusButton');

plusButton.addEventListener('click', () => {
    let title = document.querySelector('#inputVideoTitle');
    let videoUrl = document.querySelector('#inputVideoUrl');

    let canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 167;
    let thumbUrl = canvas.toDataURL('image/jpeg');
    birdSeries.push([title.value, thumbUrl, videoUrl.value]);
    title.value = '';
    videoUrl.value = '';

    printVideoList(birdSeries.length - 1);
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
            videoList.innerHTML = null;
            printVideoList(0);
        }
    }
})

let sequence = document.querySelector('.sequence');
let shuffle = document.querySelector('.shuffle');

sequence.addEventListener('click', () => {
    if (sequence.classList.contains('clicked') === false) {
        sequence.classList.add('clicked');
        shuffle.classList.remove('clicked');
        videoTag.addEventListener('ended', goNextVideo);
        birdSeries = JSON.parse(localStorage.getItem('birdSeries'));
        printVideoList(0);
    }
})

shuffle.addEventListener('click', () => {
    shuffle.classList.add('clicked');
    sequence.classList.remove('clicked');
    birdSeries.sort(() => Math.random() - 0.5);
    printVideoList(0);
})