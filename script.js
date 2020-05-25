(function(){

	function Player(videoContainer){

		this.video = videoContainer.querySelector("video");
		this.playPause = videoContainer.querySelector(".playPause");

		this.progressBar = videoContainer.querySelector(".progressBar");
		this.playBar = videoContainer.querySelector(".playBar");
		this.loadedBar = videoContainer.querySelector(".loadedBar");

		this.assignEventListeners();

	}

	Player.prototype.assignEventListeners = function(){

		this.playPause.onclick = this.play.bind(this);
		this.video.onended = this.reset.bind(this);

		this.video.onprogress = this.updateLoadedBar.bind(this);
		this.video.addEventListener("timeupdate", this.updatePlayBar.bind(this), false);
		this.progressBar.onclick = this.rewind.bind(this);

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



	new Player(document.querySelector("#videoPlayer1"));


})();
