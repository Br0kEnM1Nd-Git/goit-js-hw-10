import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_TEgVK7vcb6pmo2q7rX8jIzUZ1fTW7HZzDFyR6QNKO0buvxuaRrAxaLOW7kyVCiUt';
const refs = {
  select: document.querySelector('.breed-select'),
  infoDiv: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.error.setAttribute('hidden', 'true');
refs.select.setAttribute('hidden', 'true');

fetchBreeds()
  .then(response => {
    return response.data.map(({ id, name }) => {
      refs.loader.setAttribute('hidden', 'true');
      return { id, name };
    });
  })
  .then(result => {
    const markup = result
      .map(({ name, id }) => {
        return `<option value="${id}">${name}</option>`;
      })
      .join('');
    refs.select.insertAdjacentHTML('beforeend', markup);
    const selector = new SlimSelect({
      select: refs.select,
    });
    refs.select.removeAttribute('hidden');
  })
  .catch(error => {
    console.log('Error: ', error.message);
    refs.loader.setAttribute('hidden', 'true');
    refs.error.removeAttribute('hidden');
  });

refs.select.addEventListener('change', onChange);
function onChange(event) {
  refs.error.setAttribute('hidden', 'true');
  refs.infoDiv.innerHTML = '';
  const selectedBreed = event.target.options[event.target.selectedIndex].value;
  fetchCatByBreed(selectedBreed)
    .then(response => {
      const { name, reference_image_id, description, temperament } = response;
      const catInfo = {
        breedName: name,
        description,
        temperament,
      };
      axios
        .get(`https://api.thecatapi.com/v1/images/${reference_image_id}`)
        .then(response => {
          refs.infoDiv.insertAdjacentHTML(
            'beforeend',
            `<img src="${response.data.url}" width="300px" height="300px"><h3>${catInfo.breedName}</h3><p>${catInfo.description}</p><p><b>Temperament:</b>${catInfo.temperament}</p>`
          );
        });
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
      refs.error.removeAttribute('hidden');
    });
}
