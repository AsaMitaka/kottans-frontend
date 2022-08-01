const url = 'https://randomuser.me/api/?results=12';
let aToZLast = document.querySelector('.sortedAtoZLast');
let zToALast = document.querySelector('.sortedZtoALast');
let atoZFirst = document.querySelector('.sortedAtoZFirst');
let ztoAFirst = document.querySelector('.sortedZtoAFirst');
let content = document.querySelector('.articleBlock');
let reset = document.querySelector('.reset');
let basicArr1 = [];
// let basicArr2 = [];
let resultArr = [];

async function getResponse(url) {
    let response = await fetch(url);
    let friendsArr = await response.json();

    saveUsers(friendsArr.results, resultArr);

    renderAllItemsToPage(resultArr);
}


function saveUsers(arr, resArr) {
    for (let i = 0; i < arr.length; i++) {
        resArr.push(arr[i]);
    }
    basicArr1 = resultArr.slice();
    // basicArr2 = JSON.parse(JSON.stringify(resultArr));
}

function renderItem(item) {
    return `
        <div class='content__item'>
            <img class='content__item-img' src='${item.picture.medium}'>
            <div class='content__item-name'>${item.name.title} ${item.name.first} ${item.name.last}</div>
            <p class='content__item-email'>${item.email}</p>
            <p>Age: ${item.dob.age}</p>
            <a href='${item.phone}'>${item.phone}</a>
            <p class='content__item-country'>${item.location.country}, ${item.location.city}</p>
            <div class='content__item-gender'>${item.gender}</div>
        </div>
    `;
}
aToZLast.addEventListener('click', sortedAtoZLast);
zToALast.addEventListener('click', sortedZtoALast);
atoZFirst.addEventListener('click', sortedAtoZFirst);
ztoAFirst.addEventListener('click', sortedZtoAFirst);
reset.addEventListener('click', resetPage);

function sortedAtoZLast() {
    resultArr.sort((a, b) => a.name.last !== b.name.last ? a.name.last < b.name.last ? -1 : 1 : 0);
    renderAllItemsToPage(resultArr);
}

function sortedZtoALast() {
    resultArr.sort((a, b) => a.name.last !== b.name.last ? a.name.last > b.name.last ? -1 : 1 : 0);
    renderAllItemsToPage(resultArr);
}

function sortedAtoZFirst() {
    resultArr.sort((a, b) => a.name.first !== b.name.first ? a.name.first < b.name.first ? -1 : 1 : 0);
    renderAllItemsToPage(resultArr);
}

function sortedZtoAFirst() {
    resultArr.sort((a, b) => a.name.first !== b.name.first ? a.name.first > b.name.first ? -1 : 1 : 0);
    renderAllItemsToPage(resultArr);
}

function resetPage() {
    resultArr = basicArr1.slice();
    // console.log(JSON.parse(JSON.stringify(basicArr2)));
    renderAllItemsToPage(resultArr);
}


function renderAllItemsToPage(arr) {
    content.innerHTML = '';
    arr.forEach(el => {
        content.innerHTML += renderItem(el);
    });
}


getResponse(url);

