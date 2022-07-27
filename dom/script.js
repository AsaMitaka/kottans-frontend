let content = document.querySelector('.content');

let aside = document.createElement('aside');
aside.classList.add('asideBlock');
content.append(aside);

let main = document.createElement('main');
main.classList.add('mainBlock');
content.append(main);

let arrOfDatas = [
    {
        title: '1',
        dataName: '1',
        description: '11111111111111111111111111111111111111111',
        img: '',
        alt: ''
    },
    {
        title: '2',
        dataName: '2',
        description: '222222222222222222222222222222222222222222',
        img: '',
        alt: ''
    },
    {
        title: '3',
        dataName: '3',
        description: `3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333`,
        img: '',
        alt: ''
    },
    {
        title: '4',
        dataName: '4',
        description: '4444444444444444444444444444444444444444444',
        img: '',
        alt: ''
    }
];

arrOfDatas.forEach(item => {
    renderAsideItems(item);
});

function renderAsideItems(item) {
    aside.innerHTML += `
        <aside class='asideBlock' data-attribute='${item.dataName}'>
            <button class='asideBtn' data-attribute='${item.dataName}'>${item.title}</button>
        <aside/>
    `;
}

let asideBtn = document.querySelectorAll('.asideBtn');
asideBtn.forEach( el => {
    el.addEventListener('click', renderMain);
});

function renderMain(event) {
    if (!event) {
        main.innerHTML = `
            <div class='mainHeader'>${arrOfDatas[0].title}</div>
            <div class='mainContent'>
                <div class='mainDescr'>${arrOfDatas[0].description}</div>
                <img class='mainImg' src='${arrOfDatas[0].img}' alt='${arrOfDatas[0].alt}' />
            </div>
        `
    }

    console.log(event.target, event.target.dataset.attribute);
    let thatTarget = event.target.dataset.attribute;
    main.innerHTML = '';
    
    let mainItem = arrOfDatas.find(function({dataName}) {
        return dataName === thatTarget;
    });
    console.log(mainItem);

    main.innerHTML = `
        <div class='mainHeader'>${mainItem.title}</div>
        <div class='mainContent'>
            <div class='mainDescr'>${mainItem.description}</div>
            <img class='mainImg' src='${mainItem.img}' alt='${mainItem.alt}' />
        </div>
    `;
}
renderMain();