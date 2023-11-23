const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));

if (selectedMovie) {
  document.querySelector('.poster-img').src = selectedMovie.image;
  document.querySelector('.movie-title').textContent = selectedMovie.title;
  document.querySelector('.movie-rating').textContent = selectedMovie.rating !== null ? selectedMovie.rating : 'N/A';
  document.querySelector('.movie-genre').textContent = selectedMovie.genre;
  document.querySelector('.movie-year').textContent = selectedMovie.year;
}

const ticketButton = document.getElementById('ticket-button');
const movieForm = document.getElementById('movieForm');
const studioSelection = document.getElementById('studioSelection');
const nextButton = document.getElementById('next-button');
const progressBar = document.getElementById('progress-bar');
const chairButton = document.getElementById('chair-button');
const checkoutButton = document.getElementById('checkout-button');
const checkoutSelection = document.getElementById('checkoutSelection');
const chairSelection = document.getElementById('chairSelection');

ticketButton.addEventListener('click', function () {
  studioSelection.classList.add('hidden');
  movieForm.classList.remove('hidden');
  progressBar.style.width = '25%';
  progressBar.textContent = '25%';
});

nextButton.addEventListener('click', function () {
  const nama = document.getElementById('nama').value;
  const telepon = document.getElementById('telepon').value;
  const email = document.getElementById('email').value;

  if (nama && telepon && email) {
    movieForm.classList.add('hidden');
    studioSelection.classList.remove('hidden');
    progressBar.style.width = '50%';
    progressBar.textContent = '50%';
  } else {
    alert('Harap isi semua kolom pada form!');
  }
});

chairButton.addEventListener('click', function () {
  studioSelection.classList.add('hidden');
  chairSelection.classList.remove('hidden');
  progressBar.style.width = '75%';
  progressBar.textContent = '75%';
});

const seats = document.querySelectorAll('.row .seat:not(.sold)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".baris .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

chairSelection.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('sold')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.container .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

checkoutButton.addEventListener('click', function () {
  // Mengambil nilai input
  const nama = document.getElementById('nama').value;
  const telepon = document.getElementById('telepon').value;
  const email = document.getElementById('email').value;

  // Mengambil informasi film yang dipilih
  const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
  const movieTitle = selectedMovie ? selectedMovie.title : '';

  // Mengambil kursi yang dipilih
  const selectedSeats = document.querySelectorAll('.container .seat.selected');
  const seats = [...selectedSeats].map(seat => seat.textContent);

  // Menghitung total harga berdasarkan jumlah kursi yang dipilih
  const ticketPrice = +movieSelect.value;
  const totalHarga = selectedSeats.length * ticketPrice;

  // Menampilkan informasi ringkasan pesanan di checkoutSelection
  document.getElementById('checkout-nama').textContent = nama;
  document.getElementById('checkout-telepon').textContent = telepon;
  document.getElementById('checkout-email').textContent = email;
  document.getElementById('checkout-title').textContent = movieTitle;
  document.getElementById('checkout-seats').textContent = seats.join(', ');
  document.getElementById('checkout-total').textContent = totalHarga;

  // Mengubah tampilan ke checkoutSelection
  chairSelection.classList.add('hidden');
  checkoutSelection.classList.remove('hidden');
  progressBar.style.width = '100%';
  progressBar.textContent = '100%';
});

// Mendapatkan tombol "Selesai"
const paymedButton = document.getElementById('paymed-button');

// Event saat tombol "Selesai" ditekan
paymedButton.addEventListener('click', function () {
  // Mengambil modal dengan ID "paymentModal"
  const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));

  // Menampilkan modal
  paymentModal.show();
});