function goHome() {
	location.href = "mainPage.html";
}

let homeButton = document.querySelector('header');

homeButton.addEventListener('click', goHome);


let birdSeries = [
	['뒷마당을지키는새', 'https://drive.google.com/uc?export=download&id=1feS2PExCeuZz5CnQzSIDYnqAl8hZuT0Q', 'https://drive.google.com/uc?export=download&id=19we3Gz4GIzIeDFHlGrwA1Pkp6AS-FvZY'],
	['부리가큰새', 'https://drive.google.com/uc?export=download&id=1KYhfBeQq5GPc02G8AzO_RGmT81u56_c2', 'https://drive.google.com/uc?export=download&id=1wyO78ioktw-oPNoH7iRV0WuGpPboHzkd'],
	['슬피우는새', 'https://drive.google.com/uc?export=download&id=1m1ny28nq9GX-i-s1otl5pSEDbp2Jyjmh', 'https://drive.google.com/uc?export=download&id=1CXvv7lmHuWskr_Bf4fLMyZ8guf6bqjnv'],
	['신나게웃는새', 'https://drive.google.com/uc?export=download&id=18H0i_AfZxmMMcfj4CJw72jv-M5oqphbd', 'https://drive.google.com/uc?export=download&id=1i4Jr5FdFuVT1fLEKCLQNU-gss5StkNNG'],
	['알을지키는새', 'https://drive.google.com/uc?export=download&id=1Sx1dhcwRHOQahGH-kqDzWl-YIRvaEflF', 'https://drive.google.com/uc?export=download&id=17B1sYulEumjJNp9hQ-AYmoD9PPhQbyzn'],
	['야생검은새', 'https://drive.google.com/uc?export=download&id=1KEouhnYxP4-W1h7TByPFCJ6ewqsswcSY', 'https://drive.google.com/uc?export=download&id=1_Dwo_T0Q6Nv3OSNlJMZDVSqoDvfYSzru'],
	['야생분홍새', 'https://drive.google.com/uc?export=download&id=1AaOJNDHIXeG2DvHodp6vnJ6nUQwlqgsP', 'https://drive.google.com/uc?export=download&id=1jL6n6JPWP_GlifTz5EyUKLXfF0xBbqa4'],
	['정처없이떠도는새', 'https://drive.google.com/uc?export=download&id=1jRI4lgmmnmHLfkYvNh43bfGDfbCERh9A', 'https://drive.google.com/uc?export=download&id=1h7ROWk9LhO6VhVMR7wI-ueq8d3chzifw'],
	['한번만우는새', 'https://drive.google.com/uc?export=download&id=17vQDmZrCiCpechDBfEOyMC8M0ySjgDNS', 'https://drive.google.com/uc?export=download&id=1_WP12rwJHL7LiR7TLRQoOGHdFJ8IPFBM'],
	['한입에꿀꺽하는새', 'https://drive.google.com/uc?export=download&id=1i4EqSthbyViOeJMFsr7Twm2axVIidOs4', 'https://drive.google.com/uc?export=download&id=1bU9xmLP-LEr0rRoEfMBgcsQK4fNvfgb3']
];

localStorage.setItem("inOrder", JSON.stringify(birdSeries));

function goVideo() {
	location.href = "videoPage.html?video=" + this.id;
}

let wrapper = document.querySelector('.wrapper');

for (let i = 0; i < birdSeries.length; i++) {
	wrapper.innerHTML +=
		'<li class="thumbnail">' +
		'   <img class="thumb_img" src="' + birdSeries[i][1] + '" alt="' + birdSeries[i][0] + '" title="' + birdSeries[i][0] + '" id="' + birdSeries[i][0] + '">' +
		'<h4 class="thumb_title" id="' + birdSeries[i][0] + '">' + birdSeries[i][0] + '</h4>' +
		'</li>';
}

let titles = document.querySelectorAll('h4');
let imgs = document.querySelectorAll('img');

for (let i = 0; i < birdSeries.length; i++) {
	titles[i].addEventListener('click', goVideo);
	imgs[i].addEventListener('click', goVideo);
}
