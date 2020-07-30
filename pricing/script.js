const SVG = document.getElementById('svg');

let timeLine = anime.timeline({
  easing: 'easeInOutSine',
  autoplay: true });


timeLine.add({
  targets: '.vordergrund',
  opacity: [0, 1],
  translateY: [250, 0],
  duration: 250 }).
add({
  targets: '.elm',
  opacity: [0, 1],
  translateY: [300, 0],
  duration: 500,
  delay: anime.stagger(150) }).
add({
  targets: '.sun',
  opacity: [0, 1],
  rx: [0, 300],
  ry: [0, 300],
  duration: 500 }).
add({
  targets: '.clouds path',
  opacity: [0, 0.5],
  duration: 700,
  delay: anime.stagger(150) });


let sunAnimation = anime({
  targets: '.sun-glow',
  opacity: [0, anime.random(0.05, 0.1)],
  rx: [300, 550],
  ry: [300, 550],
  easing: 'easeInOutSine',
  autoplay: false,
  loop: true,
  direction: 'alternate' });


const cloudAnimation = anime({
  targets: '.clouds path',
  translateX: [0, anime.random(20, 100)],
  duration: 6000,
  delay: anime.stagger(150),
  autoplay: false,
  loop: true,
  easing: 'easeInOutSine',
  direction: 'alternate' });


SVG.addEventListener('mouseenter', function () {
  console.log('enter');
  sunAnimation.play();
  cloudAnimation.play();
});

SVG.addEventListener('mouseleave', function () {
  console.log('leave');
  sunAnimation.pause();
  cloudAnimation.pause();
});