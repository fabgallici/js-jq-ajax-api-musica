/* Attraverso una chiamata ajax all’Api di boolean avremo 
a disposizione una decina di dischi musicali.
Servendoci di handlebars stampiamo tutto a schermo.
 */
// Bonus: Creare una select con i seguenti generi: pop, rock, metal e jazz.
// In base a cosa scegliamo nella select vedremo i corrispondenti cd.

//request music array and send it to evaluateMusicData
function getMusic(genre) {
	$.ajax({
		url: "https://flynn.boolean.careers/exercises/api/array/music",
		method: "GET",
		success: function (data) {
			console.log('success', data);
			var arrMusic = data.response;
			filterMusicGenre(arrMusic, genre);
		},
		error: function (error) {
			console.log("error", error);
		}
	});
}

//filtro l'array in base al genere musicale
function filterMusicGenre(arrData, type) {
	// var filterArr = [];
	// for (i = 0; i < arrData.length; i++) {
	// 	if (arrData[i].genre === type) {
	// 		filterArr.push(arrData[i]);
	// 	}
	// }

	//filter vers alt
	var filterArr = arrData.filter(cd => {
		// return cd["genre"] === type;
		return cd.genre === type;
	})

	console.log(filterArr);
	//resetto dati a schermo
	$('.cds-container.container').empty();
	//elaboro l'array filtrato
	evaluateMusicData(filterArr);
}

//ciclo l'array arrData, per ogni oggetto cd ottengo i valori richiesti e li invio a printMusic
function evaluateMusicData(arrData) {
	arrData.forEach(function (cd) {
		var cdPoster = cd.poster;
		var cdTitle = cd.title;
		var cdAuthor = cd.author;
		var cdYear = cd.year;
		var cdGenre = cd.genre;
		printMusic(cdPoster, cdTitle, cdAuthor, cdYear, cdGenre);
	})
}

//riceve valori da evMusicData, per ogni set di valori crea una struttura handlebars e la aggiunge all'html
function printMusic(cdPoster, cdTitle, cdAuthor, cdYear, cdGenre) {
	var source = document.getElementById('music-template').innerHTML;
	var musicTemplate = Handlebars.compile(source);
	var musicData = { cdPoster: cdPoster, cdTitle: cdTitle, cdAuthor: cdAuthor, cdYear: cdYear, cdGenre: cdGenre };
	var htmlMusicData = musicTemplate(musicData);
	$('.cds-container.container').append(htmlMusicData);
}

$(document).ready(function () {



	$('#select-genre').change(function () {
		console.log('work');
		console.log($(this).val());
		var genre = $(this).val();

		getMusic(genre);
	})


});