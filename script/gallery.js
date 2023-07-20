const track = document.getElementById("image-track");

// 마우스가 클릭한 순간의 coordinate을 저장
const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
  
}

//클릭을 땔때 다시 초기화
const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage; // 얘가 전에 스크롤에서 멈춘 지점을 못읽음.
  // console.log(track.dataset.prevPercentage);

}

const handleOnMove = e => {
  //클릭을 땔때 더이상 function이 작동하지 않게 바로 return 시켜줌
  if(track.dataset.mouseDownAt === "0") return;
  
  // parseFloat은 string을 float로 type 변환 시켜주는 built-in function
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX

  //maxDelta값을 정해줌, window의 width 가 곧 max값
  const maxDelta = window.innerWidth; // maxScroll in scroll
  
  //현재 내가 끌어온 거리가 max까지 몇퍼센트인지 
  const percentage = (mouseDelta / maxDelta) * -100 // percentage in scroll
  
  const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;

  // nextPercentage가 전체에서 지금까지 몇퍼센트 왔는지 0 부터 -100
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
      
  track.dataset.percentage = nextPercentage;

  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
  
}


//Makes scroll work in horizontally 얘는 전에 마우스가 어디서 멈췄는지 그 퍼센트를 읽어
// window.addEventListener('wheel', (event) => {
//   event.preventDefault();

//   window.scrollBy({
//     left: event.deltaY < 0 ? -20 : 20, 
    
//   });


//   const maxScroll = document.documentElement.scrollHeight - innerHeight;
//   const scrolled = parseFloat(window.scrollX);
//   const scrollPercentage = (scrolled / maxScroll); 
  
//   const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + scrollPercentage;

//   // nextPercentage가 전체에서 지금까지 몇퍼센트 왔는지 0 부터 -100
//   const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
//   console.log(nextPercentage);
//   track.dataset.prevPercentage = nextPercentage;
  
// });

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("explanation").classList.toggle('show');
  document.querySelector(".arrowImg").classList.toggle('show');

  setTimeout(function(){
    document.getElementById("explanation").classList.remove('show');
    document.querySelector(".arrowImg").classList.remove('show');
  },3000);
});

