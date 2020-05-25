(function(){

	function Player(videoContainer){

		this.video = videoContainer.querySelector("video");
		this.playPause = videoContainer.querySelector(".playPause");

		this.progressBar = videoContainer.querySelector(".progressBar");
		this.playBar = videoContainer.querySelector(".playBar");
		this.loadedBar = videoContainer.querySelector(".loadedBar");

		this.volumeStatus = videoContainer.querySelector(".volumeStatus");
		this.fullVolume = videoContainer.querySelector(".fullVolume");
		this.currentVolume = videoContainer.querySelector(".currentVolume");

		this.currentTime = videoContainer.querySelector(".currentTime");
		this.totalTime = videoContainer.querySelector(".totalTime");

		this.assignEventListeners();

	}

	Player.prototype.assignEventListeners = function(){

		this.playPause.onclick = this.play.bind(this);
		this.video.onended = this.reset.bind(this);

		this.video.onprogress = this.updateLoadedBar.bind(this);
		this.video.addEventListener("timeupdate", this.updatePlayBar.bind(this), false);
		this.progressBar.onclick = this.rewind.bind(this);

		this.fullVolume.onclick = this.adjustVolume.bind(this);
		this.video.onvolumechange = this.setVolume.bind(this);
		this.volumeStatus.onclick = this.mute.bind(this);

		this.video.ondurationchange = this.setDuration.bind(this);
		this.video.addEventListener("timeupdate", this.updateCurrentTime.bind(this), false);
	};

	/* Play, reset */

	Player.prototype.play = function(e){
		if(this.video.paused){
			this.video.play();
			e.target.classList.remove("showPlay");
			e.target.classList.add("showPause");
		}else{
			this.video.pause();
			e.target.classList.remove("showPause");
			e.target.classList.add("showPlay");
		}
	};

	Player.prototype.reset = function(){
		this.playPause.classList.remove("showPause");
		this.playPause.classList.add("showPlay");
	};

	/* UpdateLoadedBar, updatePlayBar, rewind */

	Player.prototype.updateLoadedBar = function(){
		if(this.video.buffered.length > 0){
			this.loadedBar.style.width = (this.video.buffered.end(0) / this.video.duration) * 100 + "%";
		}
	};

	Player.prototype.updatePlayBar = function(){
		this.playBar.style.width = (this.video.currentTime / this.video.duration) * 100 + "%";
	};

	Player.prototype.rewind = function(e){
		var barEdge = this.progressBar.getBoundingClientRect().left,
			clickedX = e.pageX,
			barClickedX = clickedX - barEdge,
			currentTime = this.video.duration * (barClickedX / this.progressBar.offsetWidth);
		this.video.currentTime = currentTime;
	};

	/* AdjustVolume, setVolume, mute */

	Player.prototype.adjustVolume = function(e){
		var barEdge = this.fullVolume.getBoundingClientRect().left,
			clickedX = e.pageX,
			barClickedX = clickedX - barEdge,
			currentVolume = (barClickedX / this.fullVolume.offsetWidth);
		this.video.volume = currentVolume;
		if(this.video.volume != 0){
			this.volumeStatus.classList.remove("showMuteIcon");
			this.volumeStatus.classList.add("showVolumeIcon");
		}
	}

	Player.prototype.setVolume = function(){
		this.currentVolume.style.width = (this.video.volume * 100) + "%";
	}

	Player.prototype.mute = function(e){
		if(this.video.volume == 0){
			this.video.volume = 0.5;
			e.target.classList.remove("showMuteIcon");
			e.target.classList.add("showVolumeIcon");
		}else{
			this.video.volume = 0;
			e.target.classList.add("showMuteIcon");
			e.target.classList.remove("showVolumeIcon");
		}
	}

	/* FormatTime, updateCurrentTime, setDuration */

	Player.prototype.formatTime = function(durations){
		var durations = Math.round(durations),
			minutes = Math.floor(durations / 60),
			seconds = durations - minutes * 60;

		if(seconds == 0)
			seconds = "00";
		else if(seconds < 10)
			seconds = "0" + seconds;

		return minutes + ":" + seconds;
	}

	Player.prototype.updateCurrentTime = function(){
		this.currentTime.innerHTML = this.formatTime(this.video.currentTime);
	}

	Player.prototype.setDuration = function(){
		this.totalTime.innerHTML = this.formatTime(this.video.duration);
	}

	new Player(document.querySelector("#videoPlayer1"));


})();
