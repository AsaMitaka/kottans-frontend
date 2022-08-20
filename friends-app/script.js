const url = 'https://randomuser.me/api/?results=12';
const form = document.forms;
const content = document.querySelector('.articleBlock');

let friendsCopy = [];
let friends = [];

async function getResponse(url) {
    let response = await fetch(url);
    let jsonData = await response.json();

    friendsCopy = jsonData.results;
    friends = jsonData.results;

    renderAllItemsToPage(friends);
}

function creatingDivItem(item) {
    return `
        <div class='content__item'>
            <img class='content__item-img' src='${item.picture.medium}'>
            <div class='content__item-name'>${item.name.title} ${item.name.first} ${item.name.last}</div>
            <p class='content__item-email'>
                <a href="mailto:  ${item.email}"   target="_blank"> ${item.email}</a>
            </p>
            <p>Age: ${item.dob.age}</p>
            <a href='${item.phone}'>${item.phone}</a>
            <p class='content__item-country'>${item.location.country}, ${item.location.city}</p>
            <div class='content__item-gender'>${item.gender}</div>
        </div>
    `;
}

form.first.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('first')) {
        checkedFirstSort(e);
    }
});

function checkedFirstSort(event) {
    form.age.reset();
    form.last.reset();
    switch(event.target.value) {
        case "firstAToZ":
            sortedAtoZFirst();
            break;
        case "firstZtoA":
            sortedZtoAFirst();
            break;
    }
}

form.last.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('last')) {
        checkLastSort(e);
    }
});

function checkLastSort(event) {
    form.first.reset();
    form.age.reset();
    switch(event.target.value) {
        case "lastAToZ":
            sortedAtoZLast();
            break;
        case "lastZToA":
            sortedZtoALast();
            break;
    }
}

form.reset.reset.addEventListener('click', resetPage);

form.age.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('age')) {
        sortByAge(e);
    }
});

function sortByAge(event) {
    form.first.reset();
    form.last.reset();
    switch(event.target.value) {
        case "ageMore":
            sortedAgeMore();
            break;
        case "ageLess":
            sortedAgeLess();
            break;
    }
}

function sortedAgeMore() {
    friends.sort((a, b) => a.dob.age - b.dob.age);
    renderAllItemsToPage(friends);
}

function sortedAgeLess() {
    friends.sort((a, b) => b.dob.age - a.dob.age);
    renderAllItemsToPage(friends);
}

function sortedAtoZLast() {
    friends.sort((a, b) => a.name.last !== b.name.last ? a.name.last < b.name.last ? -1 : 1 : 0);
    renderAllItemsToPage(friends);
}

function sortedZtoALast() {
    friends.sort((a, b) => a.name.last !== b.name.last ? a.name.last > b.name.last ? -1 : 1 : 0);
    renderAllItemsToPage(friends);
}

function sortedAtoZFirst() {
    friends.sort((a, b) => a.name.first !== b.name.first ? a.name.first < b.name.first ? -1 : 1 : 0);
    renderAllItemsToPage(friends);
}

function sortedZtoAFirst() {
    friends.sort((a, b) => a.name.first !== b.name.first ? a.name.first > b.name.first ? -1 : 1 : 0);
    renderAllItemsToPage(friends);
}

form.gender.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('gender')) {
        checkedGender(e);
    }
});

function checkedGender(event) {
    switch (event.target.value) {
        case 'male':
            renderMale();
            break;
        case 'female':
            renderFemale();
            break;
        case 'all':
            renderAll();
            break;
    }
}

function renderMale() {
    friends = friendsCopy.slice();
    friends = friends.filter(item=> item.gender === 'male');
    ages();
    renderAllItemsToPage(friends);
}

function renderFemale() {
    friends = friendsCopy.slice();
    friends = friends.filter(item=> item.gender === 'female');
    ages();
    renderAllItemsToPage(friends);
}

function renderAll() {
    friends = friendsCopy.slice();
    ages();
    renderAllItemsToPage(friends);
}

[minNumber, maxNumber].forEach(el => el.addEventListener('change', checkNumber));

function checkNumber() {
    if (minNumber.value < 10) {
        minNumber.value = 10
        return;
    } 
    
    if (maxNumber.value > 100 && minNumber.value < 10) {
        maxNumber.value = 100;
        minNumber.value = 10;
        return;
    } 
    
    if (maxNumber.value > 100) {
        maxNumber.value = 100;
        return;
    } 
    
    ages();
    renderAllItemsToPage(friends);
}

function ages() {
    friends = friends.filter(item => {
        if (item.dob.age > minNumber.value && item.dob.age <= maxNumber.value) {
            return item;
        }
    });
}

form.search.search.addEventListener('input', searchFunc);

function searchFunc() {
    let val = form.search.search.value.toLowerCase();
    if (val && val.length > 0) {
        content.innerHTML = '';

        let acc = '';
        friends.forEach(item=> {
            if(item.name.first.toLowerCase().includes(val) || item.name.last.toLowerCase().includes(val)) {
                acc += creatingDivItem(item);
            }
        });
        content.innerHTML = acc;
    } else {
        renderAllItemsToPage(friends);
    }
}

function resetPage() {
    minNumber.value = 10;
    maxNumber.value = 100;
    friends = friendsCopy.slice();

    renderAllItemsToPage(friends);
}

function renderAllItemsToPage(arr) {
    content.innerHTML = '';

    let acc = '';
    arr.forEach(el => {
        acc += creatingDivItem(el);
    });
    content.innerHTML = acc;
}

getResponse(url);
