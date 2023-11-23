// Memuat data film dari file JSON menggunakan fetch API
fetch('movies.json')
  .then(response => response.json()) // Mengubah respons menjadi objek JSON
  .then(movies => {
    const moviesGrid = document.getElementById('movies-grid');
    const movieTemplate = document.getElementById('movie-template');

    // Menampilkan setiap film dalam elemen HTML
    movies.forEach(movie => {
      // Mengkloning template
      const movieClone = movieTemplate.content.cloneNode(true);

      // Mengisi data ke dalam template
      const cardImg = movieClone.querySelector('.card-img');
      const cardRating = movieClone.querySelector('.rating span');
      const cardTitle = movieClone.querySelector('.card-title');
      const cardGenre = movieClone.querySelector('.genre');
      const cardYear = movieClone.querySelector('.year');

      cardImg.src = movie.image;
      cardImg.alt = movie.title;
      cardRating.textContent = movie.rating !== null ? movie.rating : 'N/A';
      cardTitle.textContent = movie.title;
      cardGenre.textContent = movie.genre;
      cardYear.textContent = movie.year;

      // Mendapatkan link judul film dan ikon play
      const movieLink = movieClone.querySelector('.movie-link');
      const playIcon = movieClone.querySelector('.play-icon');

      // Menambahkan event listener untuk setiap judul film
      movieLink.addEventListener('click', (event) => {
        event.preventDefault();
        // Menemukan informasi film yang sesuai dari data JSON
        const selectedMovie = movies.find(item => item.title === movie.title);
        localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));
        // Arahkan pengguna ke halaman detail film
        window.location.href = './detail.html';
      });

      // Menambahkan event listener untuk ikon play
      playIcon.addEventListener('click', (event) => {
        event.preventDefault();
        const selectedMovie = movies.find(item => item.title === movie.title);
        localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));
        window.location.href = './detail.html';
      });

      // Menambahkan elemen film ke dalam wadah di HTML
      moviesGrid.appendChild(movieClone);
    });
  })
  .catch(error => {
    console.error('Error fetching or parsing data:', error);
  });