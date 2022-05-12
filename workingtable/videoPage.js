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
