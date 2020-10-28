let term = '';
const songContainer = document.getElementById('songs');


const updateTerm = () => {
    term = document.getElementById('searchInput').value;

    if (!term || term.trim() === '') {
        alert('please enter a search term');
    } else {

        // loop remove song in container
        while (songContainer.firstChild) {
            songContainer.removeChild(songContainer.firstChild);
        }


        const url = `https://itunes.apple.com/search?term=${term}&limit=12`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.results);
                const artists = data.results;
                return artists.map(result => {
                    const article = document.createElement('article'),
                        artist = document.createElement('p'),
                        song = document.createElement('p'),
                        img = document.createElement('img'),
                        audio = document.createElement('audio'),
                        // line = document.createElement('hr'),
                        audioSource = document.createElement('source');

                    artist.innerHTML = result.artistName;
                    artist.className = 'artistName';
                    song.innerHTML = result.trackName;
                    song.className = 'songName';
                    img.src = result.artworkUrl100;
                    audioSource.src = result.previewUrl;
                    audio.setAttribute('controls', '');

                    // append each element to article
                    article.appendChild(img);
                    article.appendChild(artist);
                    article.appendChild(song);
                    // article.appendChild(element);
                    article.appendChild(audio);
                    audio.appendChild(audioSource);
                    songContainer.appendChild(article);


                })

            })
            .catch(error => console.log('Request failed:', error));
    }
}

//Press Enter to do search
const searchBtn = document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        // alert('Enter');
        updateTerm();
    }
});

// console.log(songContainer);

document.addEventListener('play', event => {
        const audio = document.getElementsByTagName('audio');
        for (let i = 0; i < audio.length; i++) {
            //pause when play other song
            if (audio[i] != event.target) {
                audio[i].pause();
                console.log(event);
            }
        }
    }, true) // event capture and bubbling