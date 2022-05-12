
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

function goVideo() {
	location.href = "videoPage.html?video=" + this.id;
}

for (let i = 0; i < birdSeries.length; i++) {
	document.write(
		'<div class="thumbnail">' +
		'   <img class="thumb_img" src="../새시리즈/' + birdSeries[i] + '.jpg" alt="' + birdSeries[i] + '" title="' + birdSeries[i] + '" id="' + birdSeries[i] + '">' +
		'<h4 class="thumb_title" id="' + birdSeries[i] + '">' + birdSeries[i] + '</h4>' +
		'</div>'
	)
}
let titles = document.querySelectorAll('h4');
let imgs = document.querySelectorAll('img');

for (let i = 0; i < birdSeries.length; i++) {
	titles[i].addEventListener('click', goVideo);
	imgs[i].addEventListener('click', goVideo);
}
