document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('open-inserimento');
  if (btn) {
    btn.addEventListener('click', () => {
      window.location.href = 'inserimento.html';
    });
  }
});
