
const track = document.getElementById("image-track");

// 마우스가 클릭한 순간의 coordinate을 저장
const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
  
}

//클릭을 땔때 다시 초기화
const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
  
}

const handleOnMove = e => {
  //클릭을 땔때 더이상 function이 작동하지 않게 바로 return 시켜줌
  if(track.dataset.mouseDownAt === "0") return;
  
  // parseFloat은 string을 float로 type 변환 시켜주는 built-in function
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX

  //maxDelta값을 정해줌, window의 width 가 곧 max값
  const maxDelta = window.innerWidth;
  //현재 내가 끌어온 거리가 max까지 몇퍼센트인지 
  const percentage = (mouseDelta / maxDelta) * -100
  
  const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage

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
  // const scrollableElement = document.getElementById("image-track");
  // const scrollValue = scrollableElement.scroll;
  // console.log(scrollValue);
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);


// window.addEventListener('scrollX', () => {
//   const maxScroll = document.documentElement.scrollHeight - innerHeight;
//   var scrolled = parseFloat(window.scrollY);
//   let percentage = scrolled / maxScroll * 100 ;

//   console.log(scrolled);
//   console.log(`${Math.round(percentage)}%`);
// })