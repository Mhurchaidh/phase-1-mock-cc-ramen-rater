const URL = 'http://localhost:3000/ramens';
let currRamen;

const ramenMenu = document.querySelector('#ramen-menu');
const ramenName = document.querySelector('.name');
const ramenRestaurant = document.querySelector('.restaurant');
const ramenRating = document.querySelector('#rating-display');
const ramenComment = document.querySelector('#comment-display');
const ramenDetailImage = document.querySelector('.detail-image');
const updateRamenRating = document.querySelector('#new-rating');
const updateRamenComment = document.querySelector('#new-comment');
const form = document.querySelector('#new-ramen');
const updateForm = document.querySelector('#edit-ramen');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRamen = {
        name: form['new-name'].value,
        image: form['new-image'].value,
        restaurant: form['new-restaurant'].value,
        rating: form['new-rating'].value,
        comment: form['new-comment'].value,
    };
    addRamenItems(newRamen);
    form.reset();
})

updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currRamen.rating = updateForm['update-rating'].value;
    currRamen.comment = updateForm['update-comment'].value;
    renderRamenItems(currRamen);
    form.reset();
})

function getAllRamen(url){
    return fetch(url)
        .then(resp => resp.json());
}

function iterateRamen(ramenArr){
    ramenArr.forEach(addRamenItems);
}

function addRamenItems(ramenObj){
    const ramenItem = document.createElement('img');
    ramenItem.setAttribute('src', ramenObj.image);
    ramenMenu.append(ramenItem);
    ramenItem.addEventListener('click', () => renderRamenItems(ramenObj));
}

function renderRamenItems(ramenObj){
    currRamen = ramenObj;
    ramenName.textContent = ramenObj.name;
    ramenRestaurant.textContent = ramenObj.restaurant;
    ramenRating.textContent = ramenObj.rating;
    ramenComment.textContent = ramenObj.comment;
    ramenDetailImage.src = ramenObj.image;
}

getAllRamen(URL).then(ramenArray => {
    iterateRamen(ramenArray);
    renderRamenItems(ramenArray[0]);
})