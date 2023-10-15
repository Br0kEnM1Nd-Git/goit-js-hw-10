import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0].breeds[0]);
}

export { fetchBreeds, fetchCatByBreed };
