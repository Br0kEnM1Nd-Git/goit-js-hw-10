import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response)
    .catch(error => {
      console.log('Помилка:', error.message);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search1?breed_ids=${breedId}`)
    .then(response => response.data[0].breeds[0]);
}

export { fetchBreeds, fetchCatByBreed };
