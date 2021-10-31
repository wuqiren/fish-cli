import ImgSrc from './img/fish.jpeg';
function login() {
  const IMG = document.createElement('img');
  IMG.src = ImgSrc;
  return IMG;
}
document.body.appendChild(login());

console.log('222233322');
