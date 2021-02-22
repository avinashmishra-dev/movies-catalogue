const addMovieModal = document.getElementById("add-modal");
const startAddMovie = document.querySelector("header button");
const addBackdrop = document.getElementById("backdrop");
const cancelButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelButton.nextElementSibling;
const userInput = addMovieModal.querySelectorAll("input");
const entryTextSelection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const Movies = [];

const updateUI = () => {
  if (Movies.length === 0) {
    entryTextSelection.style.display = "block";
  } else {
    entryTextSelection.style.display = "none";
  }
};

const cancelMovieDeletion = () => {
  backdropToggle();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of Movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  Movies.splice(movieIndex, 1);
  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex]);
  cancelMovieDeletion();
  updateUI();
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  backdropToggle();
  const cancelDeletion = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletion = deleteMovieModal.querySelector(".btn--danger");

  confirmDeletion.replaceWith(confirmDeletion.cloneNode(true));
  confirmDeletion = deleteMovieModal.querySelector(".btn--danger");

  // confirmDeletion.removeEventListener("click", deleteMovie.bind(null, movieId));  //this will not work because there are different function and different object
  cancelDeletion.removeEventListener("click", cancelMovieDeletion);

  cancelDeletion.addEventListener("click", cancelMovieDeletion);
  confirmDeletion.addEventListener("click", deleteMovie.bind(null, movieId));
  // deleteMovie(movieId);
};

const renderNewMovieElements = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class ="movie-element__image">
      <img src="${imageUrl}" alt ="${title}">
    </div>
    <div class = "movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
    </div> 
  `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  listRoot.append(newMovieElement);
};

const backdropToggle = () => {
  //creating function
  addBackdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  backdropToggle();
};

const cancelMovieButton = () => {
  closeMovieModal();
  backdropToggle();
  clearMovieInput();
};

const clearMovieInput = () => {
  for (const usrInput of userInput) {
    usrInput.value = "";
  }
};

const addMovieHandler = () => {
  const titleValue = userInput[0].value; //.value is mandatory for taking the input from user
  const imageValue = userInput[1].value;
  const ratingValue = userInput[2].value;

  if (
    titleValue.trim() === "" ||
    imageValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue > 5 || //we can write praseInt or + as its alternative
    +ratingValue < 1
  ) {
    alert("Please Enter the valid values (rating between 1 to 5)");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue,
  };
  Movies.push(newMovie);
  console.log(Movies);
  closeMovieModal();
  backdropToggle();
  clearMovieInput();
  renderNewMovieElements(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

const backdropClickHandlerToggle = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearMovieInput();
};

startAddMovie.addEventListener("click", showMovieModal);
addBackdrop.addEventListener("click", backdropClickHandlerToggle);
cancelButton.addEventListener("click", cancelMovieButton);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
