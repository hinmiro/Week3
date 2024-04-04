'use strict';
import {restaurantRow, restaurantModal} from './components.js';
import {
  getRestaurants,
  getRestaurantMenu,
  nameSort,
  sortFilter,
  clearTable,
} from './utils.js';

const restaurants = [];

const table = document.querySelector('table');
const filterButton = document.querySelector('#filterButton');
const showAllButton = document.querySelector('#showAll');
const filterModal = document.querySelector('.filterModal');
const closeButtonFilter = document.createElement('span');
const submitFilter = document.querySelector('#filter');

closeButtonFilter.setAttribute('id', 'closeButtonFilter');
closeButtonFilter.innerHTML = '&times;';
filterModal.prepend(closeButtonFilter);

showAllButton.addEventListener('click', (event) => {
  event.preventDefault();
  clearTable(table);
  renderRestaurants(restaurants);
});

filterButton.addEventListener('click', (event) => {
  event.preventDefault();
  filterModal.style.display = 'flex';
});

closeButtonFilter.addEventListener('click', () => {
  filterModal.style.display = 'none';
});

submitFilter.addEventListener('click', async (event) => {
  event.preventDefault();
  const restaurants = await getRestaurants();
  const input = document.querySelector('#filterInput').value;
  const option = document.querySelector('#filterSelect').value;
  const filtered = sortFilter(restaurants, option, input);

  clearTable(table);

  renderRestaurants(filtered);
  filterModal.style.display = 'none';
});

async function renderRestaurants(sortedRestaurants) {
  console.log(sortedRestaurants);
  if (!sortedRestaurants.length) {
    const restaurants = await getRestaurants();
    sortedRestaurants = nameSort(restaurants);
  }
  console.log(sortedRestaurants);

  sortedRestaurants.forEach((r) => {
    const {_id} = r;
    const modal = document.querySelector('.modal');
    const form = document.querySelector('#form');
    const closeButton = document.querySelector('#closeButton');
    const newRestaurantRow = restaurantRow(r);

    closeButton.addEventListener('click', () => {
      newRestaurantRow.classList.remove('highlight');
      modal.close();
    });

    newRestaurantRow.addEventListener('click', restaurantClick());

    function restaurantClick() {
      return async function (event) {
        const menu = await getRestaurantMenu(_id);
        const newModal = restaurantModal(r, menu);
        form.innerHTML = '';
        newRestaurantRow.classList.toggle('highlight');
        newRestaurantRow.style.cursor = 'pointer';

        form.innerHTML = newModal;

        modal.showModal();
      };
    }

    table.append(newRestaurantRow);
  });
}

await renderRestaurants(restaurants);
