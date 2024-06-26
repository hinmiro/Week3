'use strict';

const restaurantRow = (restaurant) => {
  const {address, name} = restaurant;
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${name}</td><td>${address}</td>`;

  return tr;
};

const restaurantModal = (restaurant, menu) => {
  const {name, company, address, postalCode, city, phone} = restaurant;
  const tr = document.createElement('tr');
  const table = document.createElement('table');
  const {courses} = menu;
  let menuHtml = '';

  tr.innerHTML = `
    <h1>${name}</h1>
    <p>${company}</p>
    <p>${address}</p>
    <p>${postalCode}</p>
    <p>${city}</p>
    <p>${phone}</p>`;

  menuHtml += tr.outerHTML;

  tr.innerHTML = `
    <h3>D41LY M3NU</h3>`;
  menuHtml += tr.outerHTML;

  courses.length === 0
    ? (menuHtml += `<td>Menu not available today.</td>`)
    : courses.forEach(({name, price}) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${name} ${price}</td>`;
        table.innerHTML += tr.outerHTML;
        menuHtml += table.outerHTML;
      });
  return menuHtml;
};

export {restaurantRow, restaurantModal};
