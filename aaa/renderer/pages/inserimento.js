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


document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#materiali-container");
  if (!container) return;

  try {
    const response = await fetch("/api/materiali");

    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status}`);
    }

    const materiali = await response.json();

    if (!Array.isArray(materiali)) {
      throw new Error("Risposta non valida dal server");
    }

    materiali.forEach(materiale => {
      const nomeOriginale = materiale.nome;
      const nomeFormattato = nomeOriginale.replace(/_/g, " ");

      const label = document.createElement("label");
      label.className = "cursor-pointer";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = "materiale";
      input.value = nomeOriginale;
      input.className = "peer hidden";

      const pill = document.createElement("div");
      pill.className = "px-4 py-2 rounded-full border border-custom-100 text-neutral-600 peer-checked:bg-custom-300 peer-checked:text-white transition peer-hover:text-white transition";
      pill.textContent = nomeFormattato;

      label.appendChild(input);
      label.appendChild(pill);
      container.appendChild(label);
    });
  } catch (error) {
    console.error("Errore durante il caricamento dei materiali:", error);
    container.innerHTML = `<p class="text-red-500">Errore: ${error.message}</p>`;
  }
});
