/* Attraverso una chiamata ajax all’Api di boolean avremo 
a disposizione una decina di dischi musicali.
Servendoci di handlebars stampiamo tutto a schermo.
 */

function getMusic() {
	$.ajax({
		url: "https://flynn.boolean.careers/exercises/api/array/music",
		method: "GET",
		success: function (data) {
			console.log('success', data);
			var arrMusic = data.response;
			evaluateMusicData(arrMusic);
		},
		error: function (error) {
			console.log("error", error);
		}
	});
}

function evaluateMusicData(arrData) {
	arrData.forEach(function (cd) {
		// console.log('cd ', cd, "index ", index);
		var cdPoster = cd.poster;
		var cdTitle = cd.title;
		var cdAuthor = cd.author;
		var cdYear = cd.year;
		// console.log(cdPoster);
		printMusic(cdPoster, cdTitle, cdAuthor, cdYear);
	})
}

function printMusic(cdPoster, cdTitle, cdAuthor, cdYear) {
	var source = document.getElementById('music-template').innerHTML;
	var musicTemplate = Handlebars.compile(source);
	var musicData = { cdPoster: cdPoster, cdTitle: cdTitle, cdAuthor: cdAuthor, cdYear: cdYear };
	var htmlMusicData = musicTemplate(musicData);
	$('.cds-container.container').append(htmlMusicData);
}

$(document).ready(function() {

	getMusic();
});