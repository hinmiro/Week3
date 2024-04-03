'use strict';
import {baseURL} from '/Assignments/variables.js';

const getRestaurants = async () => {
  const response = await fetch(baseURL + 'restaurants');
  if (!response.ok) throw new Error('Bad response');
  try {
    const data = await response.json();
    return await data;
  } catch (e) {
    console.error('Parsing error, ', e);
  }
};

const getRestaurantMenu = async (id) => {
  const response = await fetch(baseURL + `restaurants/daily/${id}/fi`);
  if (!response.ok) throw new Error(`Http error: ${response.status}`);
  try {
    return await response.json();
  } catch (e) {
    console.error('Parsing error: ', e);
  }
};

export {getRestaurants, getRestaurantMenu};
