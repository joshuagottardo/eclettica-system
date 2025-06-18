export function createHeader() {
  return `
    <header class="h-14 flex items-center px-4 bg-gray-800 text-gray-300 border-b border-gray-700">
      <div class="flex gap-4">
        <button id="btn-search" title="Ricerca" class="hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z" />
          </svg>
        </button>
        <button id="btn-add" title="Aggiungi" class="hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </header>
  `;
}