import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyInit } from './notify';
import { getGallery } from './axios';
import { createMarkup } from './morkup';

class GalleryApp {
    constructor() {
        this.formSearch = document.querySelector('.search-form');
        this.btnLoadMore = document.querySelector('.load-more');
        this.gallery = document.querySelector('.gallery');
        
        this.word = '';
        this.perPage = 40;
        this.page = 1;
        this.totalPages = 0;
        
        this.formSearch.addEventListener('submit', this.handleForm.bind(this));
        this.btnLoadMore.addEventListener('click', this.onLoad.bind(this));
        
        this.resetGallery();
    }
    
    handleForm(evt) {
        evt.preventDefault();
        this.resetGallery();

        const data = new FormData(evt.currentTarget);
        this.word = data.get("searchQuery").trim();

        if (this.word !== '') {
            this.loadGallery(this.word, this.page);
        } else {
            Notify.warning('Please enter a search query.', notifyInit);
        }
    }
    
    resetGallery() {
        this.gallery.innerHTML = '';
        this.page = 1;
        this.totalPages = 0;
        document.querySelector('.footer').classList.remove('open');
        document.querySelector('.message').textContent = '';
        this.btnLoadMore.style.opacity = 0;
    }

    async loadGallery(searchWord, pageNumber) {
        try {
            const data = await getGallery(searchWord, pageNumber);
            this.totalPages = Math.ceil(data.totalHits / this.perPage);

            if (this.page === 1) {
                document.querySelector('.footer').classList.remove('open');
                this.btnLoadMore.style.opacity = 0;
            }

            const arr = data.hits;
            createMarkup(arr);

            if (this.page < this.totalPages) {
                document.querySelector('.footer').classList.add('open');
                this.btnLoadMore.style.opacity = 1;
                document.querySelector('.message').textContent = `Hooray! We found ${data.totalHits} images.`;
            } else {
                document.querySelector('.footer').classList.remove('open');
                this.btnLoadMore.style.opacity = 0;
            }
        } catch (error) {
            console.log(error);
        }
    }

    onLoad() {
        this.page += 1;
        this.loadGallery(this.word, this.page);
    }
}

const galleryApp = new GalleryApp();
