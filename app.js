class DrumKit{
  constructor(){
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.beatPerMin = 30;
    this.isPlaying = null;
  }

  active() {
    this.classList.toggle("active");
  }

  repeat(){
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.beat${step}`);
    activeBars.forEach(bar => {
      bar.style.animation = `playTrack 0.5s alternate ease-in-out`;
      if(bar.classList.contains('active')){
        if(bar.classList.contains('kick-pad')){
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if(bar.classList.contains('snare-pad')){
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if(bar.classList.contains('hihat-pad')){
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    })
    this.index ++
  }
  start(){
    const interval = (60/this.beatPerMin) * 100;
    if(!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null
    }
  }
  updateButton(){
    if(!this.isPlaying){
      this.playButton.innerText = 'STOP';
    } else {
      this.playButton.innerText = "Play";
    }
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
  pad.addEventListener("click", drumKit.active);
  pad.addEventListener("animationend", function() {
    this.style.animation = "";
  });
});

drumKit.playButton.addEventListener("click", () => {
  drumKit.updateButton();
  drumKit.start();
});