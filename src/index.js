import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyInit } from './notify';
import { getGallery } from './axios';
import { createMarkup } from './morkup';

const formSearch = document.querySelector('.search-form');
formSearch.addEventListener('submit', handleForm);

const btnLoadMore = document.querySelector('.load-more');
btnLoadMore.addEventListener('click', onLoad);

const gallery = document.querySelector('.gallery');

let word = '';
let perPage = 40;
let page = 1;
let totalPages = 0;

function handleForm(evt) {
    evt.preventDefault();
    resetGallery();

    const data = new FormData(evt.currentTarget);
    word = data.get("searchQuery").trim();

    if (word !== '') {
        loadGallery(word, page);
    } else {
        Notify.warning('Please enter a search query.', notifyInit);
    }
}

function resetGallery() {
    gallery.innerHTML = '';
    page = 1;
    totalPages = 0;
    document.querySelector('.footer').classList.remove('open');
    document.querySelector('.message').textContent = '';
    btnLoadMore.style.opacity = 0;
}

async function loadGallery(searchWord, pageNumber) {
    try {
        const data = await getGallery(searchWord, pageNumber);
        totalPages = Math.ceil(data.totalHits / perPage);

        if (page === 1) {
            document.querySelector('.footer').classList.remove('open');
            btnLoadMore.style.opacity = 0;
        }

        const arr = data.hits;
        createMarkup(arr);

        if (page < totalPages) {
            document.querySelector('.footer').classList.add('open');
            btnLoadMore.style.opacity = 1;
            document.querySelector('.message').textContent = `Hooray! We found ${data.totalHits} images.`;
        } else {
            document.querySelector('.footer').classList.remove('open');
            btnLoadMore.style.opacity = 0;
        }
    } catch (error) {
        console.log(error);
    }
}

function onLoad() {
    page += 1;
    loadGallery(word, page);
}



resetGallery();