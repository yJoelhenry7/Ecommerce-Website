let searchForm = document.querySelector('.search-form');
let navBar = document.querySelector('.navbar');


document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
}

document.querySelector('#menu-btn').onclick = () =>{
    navBar.classList.toggle('actives');
}
