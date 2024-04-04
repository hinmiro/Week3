'use strict';
import {baseURL} from './variables.js';

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

const nameSort = (restaurants) => {
  return [...restaurants].sort((a, b) =>
    a.name.toLowerCase().trim().localeCompare(b.name.toLowerCase().trim())
  );
};

const sortFilter = (restaurants, option, value) => {
  const filtered =
    option === 'company'
      ? restaurants.filter(({company}) => company === value)
      : restaurants.filter(({city}) => city === value);
  filtered.length === 0
    ? (() => {
        throw new Error(`No restaurants found with ${option} "${value}"`);
      })()
    : null;
  return filtered;
};

function clearTable(table) {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

export {getRestaurants, getRestaurantMenu, nameSort, sortFilter, clearTable};
