const url = new URL(window.location.href);
const urlParams = url.searchParams;
const videoName = urlParams.get('video');

document.title = videoName;

let videoTag = document.querySelector('.video');

videoTag.setAttribute('src', '../새시리즈/' + videoName + '.mp4');
videoTag.setAttribute('poster', '../새시리즈/' + videoName + '.jpg');
videoTag.setAttribute('title', videoName);

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

let birdSeries = [
    '뒷마당을지키는새',
    '부리가큰새',
    '슬피우는새',
    '신나게웃는새',
    '알을지키는새',
    '야생검은새',
    '야생분홍새',
    '정처없이떠도는새',
    '한번만우는새',
    '한입에꿀꺽하는새'
];

let videoList = document.querySelector('.videoList');

for (let i = 0; i < birdSeries.length; i++) {
    if (birdSeries[i] === videoName)
        continue ;
    videoList.innerHTML +=
        '<div class="nextVideos">' +
            '<img src="../새시리즈/' + birdSeries[i] + '.jpg">' +
            '<p>' + birdSeries[i] + '</p>' +
        '</div>';
}