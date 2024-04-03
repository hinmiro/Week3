'use strict';

const restaurantRow = (restaurant) => {
    const { address, name } = restaurant;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${name}</td><td>${address}</td>`;

    return tr;
}

const restaurantModal = (restaurant, menu) => {
    const { name, address, postalCode, city, phone } = restaurant;
    const tr = document.createElement('tr');
    const table = document.createElement('table');
    const { courses } = menu;
    let menuHtml = '';

    tr.innerHTML = `
    <h2>${name}</h2>
    <p>${address}</p>
    <p>${postalCode}</p>
    <p>${city}</p>
    <p>${phone}</p>`;

    menuHtml += tr.outerHTML;

    tr.innerHTML = `
    <h2>D41LY M3NU</h2>`;
    menuHtml += tr.outerHTML;

    courses.length === 0 ? menuHtml += `<td>Menu not available today.</td>` : courses.forEach(({ name, price }) => {
        const tr = document.createElement('tr');
        table.innerHTML = `<td>${name} ${price}</td>`;
        menuHtml += table.outerHTML;
    });
    return menuHtml;
}

export { restaurantRow, restaurantModal }