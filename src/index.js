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
let counterHits = 0;

function handleForm(evt) {
    evt.preventDefault();
    resetGallery();

    const data = new FormData(evt.currentTarget);
    word = data.get("searchQuery").trim();
    console.log(word);

    loadGallery(word, page);
}

function resetGallery() {
    gallery.innerHTML = '';
    page = 1;
    counterHits = perPage;
    document.querySelector('.footer').classList.remove('open');
    document.querySelector('.message').textContent = '';
}

async function loadGallery(searchWord, pageNumber) {
    try {
        const data = await getGallery(searchWord, pageNumber);

        if (data.total === 0) {
            Notify.warning('Sorry, there are no images matching your search query. Please try again.', notifyInit);
        } else {
            const arr = data.hits;
            createMarkup(arr); 

            if (arr.length < data.totalHits) {
                setTimeout(() => {
                    document.querySelector('.footer').classList.add('open');
                    btnLoadMore.style.opacity = 1;
                    document.querySelector('.message').textContent = `Hooray! We found ${data.totalHits} images.`;
                    formSearch.reset();
                }, 3000);
            }
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
