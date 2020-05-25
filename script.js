(function(){

	function Player(videoContainer){

		this.video = videoContainer.querySelector("video");
		this.playPause = videoContainer.querySelector(".playPause");

		this.assignEventListeners();

	}

	Player.prototype.assignEventListeners = function(){

		this.playPause.onclick = this.play.bind(this);
		this.video.onended = this.reset.bind(this);

	};

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
	}

	Player.prototype.reset = function(){
		this.playPause.classList.remove("showPause");
		this.playPause.classList.add("showPlay");
	}

	new Player(document.querySelector("#videoPlayer1"));


})();
