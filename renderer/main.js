import { createHeader } from './components/header.js';
document.getElementById('header-container').innerHTML = createHeader();

const path = window.location.pathname;

if (path.endsWith('index.html')) {
  import('./pages/home.js');
} else if (path.endsWith('inserimento.html')) {
  import('./pages/inserimento.js');
} else if (path.endsWith('ricerca.html')) {
  import('./pages/ricerca.js');
}
