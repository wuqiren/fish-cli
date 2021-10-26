import '../css/index.css';
import '../css/index.less';
function login() {
  const oH2 = document.createElement('h2');
  oH2.innerHTML = 'fish-cli';
  oH2.className = 'title';
  return oH2;
}
document.body.appendChild(login());
