// Drag & drop immagini + gestione eliminazione
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.image-drop').forEach(dropZone => {
    const originalText = dropZone.textContent.trim();

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('ring-2', 'ring-blue-500');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('ring-2', 'ring-blue-500');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('ring-2', 'ring-blue-500');

      const file = e.dataTransfer.files[0];
      if (!file || !file.type.startsWith('image/')) {
        alert("Trascina un'immagine valida.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        dropZone.innerHTML = `
          <img src="${event.target.result}" class="object-cover w-full h-full rounded opacity-100 hover:opacity-60 transition-opacity" />
          <button class="delete-btn absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow hover:bg-red-700">Elimina</button>
        `;

        const deleteBtn = dropZone.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          dropZone.innerHTML = originalText;
          dropZone.classList.remove('ring-2', 'ring-blue-500');
        });
      };

      reader.readAsDataURL(file);
    });
  });
});
