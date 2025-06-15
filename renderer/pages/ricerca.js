document.addEventListener('DOMContentLoaded', () => {
  const btnSearch = document.getElementById('btn-search');
  const btnAdd = document.getElementById('btn-add');

  btnSearch?.addEventListener('click', () => {
    window.location.href = 'ricerca.html';
  });

  btnAdd?.addEventListener('click', () => {
    window.location.href = 'inserimento.html';
  });
});
