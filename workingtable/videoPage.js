const url = new URL(window.location.href);
const urlParams = url.searchParams;
const videoName = urlParams.get('video');

document.title = videoName;

let birdTemp = localStorage.getItem('key');
let birdSeries = JSON.parse(birdTemp);

let thisVideoIndex;

for (let i = 0; i < birdSeries.length - 1; i++) {
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
    // if (i === thisVideoIndex)
    //     continue ;
    videoList.innerHTML +=
        '<div class="nextVideo">' +
            '<img src="' + birdSeries[i][1] + '" id="' + birdSeries[i][0] + '">' +
            '<div class="nextVideoTitle" id="' + birdSeries[i][0] + '">' + birdSeries[i][0] + '</div>' +
        '</div>';
}

function goNextVideo() {
    location.replace("videoPage.html?video=" + birdSeries[0][0]);
}

videoTag.addEventListener('ended', goNextVideo);

function goVideo() {
    location.replace("videoPage.html?video=" + this.id);
}

let nextVideos = document.querySelectorAll('.nextVideo img');
let videoTitles = document.querySelectorAll('.nextVideo .nextVideoTitle');

for (let i = 0; i < nextVideos.length; i++) {
    nextVideos[i].addEventListener('click', goVideo);
    videoTitles[i].addEventListener('click', goVideo);
}