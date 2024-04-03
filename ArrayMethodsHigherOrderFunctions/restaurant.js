'use strict';
import {
  restaurantRow,
  restaurantModal,
} from '/advancedJavaScriptConcepts/components.js';
import {
  getRestaurants,
  getRestaurantMenu,
} from '/advancedJavaScriptConcepts/utils.js';

const table = document.querySelector('table');

async function renderRestaurants() {
  const restaurants = await getRestaurants();

  const sortedRest = [...restaurants].sort((a, b) =>
    a.name.toLowerCase().trim().localeCompare(b.name.toLowerCase().trim())
  );
  console.log(sortedRest);

  sortedRest.forEach((r) => {
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

renderRestaurants();
