'use strict';
import { restaurantRow, restaurantModal } from "/Assignments/components.js";

const table = document.querySelector('table');

async function renderRestaurants() {
  const restaurants = await getRestaurants();

  const sortedRest = [...restaurants].sort((a, b) =>
    a.name.toLowerCase().trim().localeCompare(b.name.toLowerCase().trim())
  );
  console.log(sortedRest);

  sortedRest.forEach((r) => {
    const  {_id  } = r;
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
        console.log(_id);
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

const getRestaurants = async() => {
  const response = await fetch(
    'https://10.120.32.94/restaurant/api/v1/restaurants'
  );
  if (!response.ok) throw new Error('Bad response');
  try {
    const data = await response.json();
    return await data;
  } catch (e) {
    console.error('Parsing error, ', e);
  }
}

const getRestaurantMenu = async(id) => {
  const response = await fetch(
    `https://10.120.32.94/restaurant/api/v1/restaurants/daily/${id}/fi`
  );
  if (!response.ok) throw new Error(`Http error: ${response.status}`);
  try {
    return await response.json();
  } catch (e) {
    console.error('Parsing error: ', e);
  }
}

renderRestaurants();