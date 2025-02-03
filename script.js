const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    // Requisição para pegar todos os artistas, sem filtro no backend
    const url = `http://localhost:3000/artists`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm));
}

function displayResults(result, searchTerm) {
    resultPlaylist.classList.add("hidden");
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    // Filtrando os artistas que possuem o nome correspondente
    const filteredResults = result.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredResults.length > 0) {
        filteredResults.forEach(element => {
            artistName.innerText = element.name;
            artistImage.src = element.urlImg;
        });
        resultArtist.classList.remove('hidden');
    } else {
        resultArtist.classList.add('hidden');
    }
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value;

    // Verificando se o campo de pesquisa está vazio
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return;
    }

    requestApi(searchTerm);
});
