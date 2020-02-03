// virer les évènement du HTML pour les avoir dans le script JS
// voir quand on  a l'évènement de lancement de la vidéo cliquable sur la vidéo pour que le bouton play/pause soit modifié ( ça se passe au niveau du this)
/*Amélioration à faire: 
bouton fullScreen
bouton volume 							OK ( AMELIO ENCORE POSSIBLE)
barre de progression + rendre cliquable					OK RESTE A RENDRE CLIQUABLE
temps écoulé depuis le début de la vidéo 				OK 
Bouton pour avancer/reculer dans la vidéo 				OK
bouton pour faire tourner la vidéo en boucle ou non		OK
faire passer les boutons par dessus la vidéo( jouer avec l'opacité?)
rendre le player/les boutons utilisable avec des touches clavier
custom de player avec du css			EN COURS
*/
//(function(){

	function play(idPlayer, control)
	{
		var player = document.querySelector('#' + idPlayer),
		play = document.getElementById('play');
		if(player.paused)
		{
			player.play();
			play.textContent = "Pause";
		} else {
			player.pause();
			play.textContent = "Play";
		}
	}

	function stop(idPlayer)
	{
		var player = document.querySelector('#' + idPlayer),
		play = document.getElementById('play');

		player.currentTime = 0;
		player.pause();
		play.textContent = "Play";
	}

	function muted(idPlayer)
	{
		var player = document.querySelector('#' + idPlayer);

		if(player.muted === true)
		{
			player.muted = false;
		}else
		{
			player.muted = true;
		}
	}

	function update(player) // function affichant le temps écoulée depuis le début de la vidéo
	{
		var duration = player.duration;    // Durée totale
    	var time     = player.currentTime; // Temps écoulé
    	var fraction = time / duration;
    	var percent  = Math.ceil(fraction * 100);

    	var progress = document.querySelector('#progressBar');

    	progress.style.width = percent + '%';
    	progress.textContent = percent + '%';

		document.querySelector('#dureeEcoulee').textContent = formatTime(time);
	}

	function formatTime(time) { //function de calcul pour la function update
    	var hours = Math.floor(time / 3600);
    	var mins  = Math.floor((time % 3600) / 60);
    	var secs  = Math.floor(time % 60);
	
    	if (secs < 10) {
        	secs = "0" + secs;
    	}
	
    	if (hours) {
        	if (mins < 10) {
            	mins = "0" + mins;
        	}
		
        	return hours + ":" + mins + ":" + secs; // hh:mm:ss
    	} else {
    	    return mins + ":" + secs; // mm:ss
    	}
	}

	/*function duree(idPlayer) // doit fonctionner avec l'évènement timeupdate pour automatiser !!!
	{
		var player = document.querySelector('#' + idPlayer),
		dureeEcoulee = document.getElementById('dureeEcoulee'),
		time = player.currentTime, //temps écoulée
		min,
		sec;

		min = Math.floor((time % 3600) / 60);
		if(min < 10)
		{
			min = '0' + min;
		}
		sec = Math.floor(time % 60);
		if(sec < 10)
		{
			sec = '0' + sec;
		}
		//dureeEcoulee.textContent = min + ':' + sec;
		return min + ':' + sec;
		
	}*/

	function timerF(idPlayer) // function affichant le temps total de la vidéo
	{
		var player = document.querySelector('#' + idPlayer),
		time = document.getElementById('time'),
		sec,
		min,
		heure = '00',
		duree = player.duration;

		min = Math.floor((duree % 3600)/ 60);
		if(min < 10){
			min = '0' + min;
		}
		sec = Math.floor(duree % 60);
		if(sec < 10){
			sec = '0' + sec;
		}
		time.textContent = heure + ':' + min + ':' + sec;
		//return heure + ':' + min + ':' + sec;
		//faire en sorte d'afficher le temps soit en 00:00:00 ou 00:00 selon la durée
	}

	function volume(idPlayer, vol)
	{
		var player = document.querySelector('#' + idPlayer);

		player.volume = vol;
	}
	
	function reculer(idPlayer, duree)
	{
		var player = document.querySelector('#' + idPlayer);

		player.currentTime -= parseInt(duree);
	}

	function avancer(idPlayer, duree)
	{
		var player = document.querySelector('#' + idPlayer);

		player.currentTime += parseInt(duree);
	}

	function repeter(idPlayer)
	{
		var player = document.querySelector('#' + idPlayer),
		loop = document.getElementById('loop');

		if(loop.checked){
			player.setAttribute('loop', '');
		}else{
			player.removeAttribute('loop');
		}

	}
//})();