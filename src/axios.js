import axios from 'axios';

class PixabayGallery {
    constructor(apiKey) {
        this.API_KEY = apiKey;
        this.BASE_URL = 'https://pixabay.com/api/';
    }

    async getGallery(word, page) {
        try {
            const response = await axios.get(this.BASE_URL, {
                params: {
                    key: this.API_KEY,
                    q: word,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: true,
                    page: page,
                    per_page: 40,
                }
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

(async () => {
    try {
        const apiKey = '38659360-bc0842e55c2c51de5ea7c36c0';
        const pixabayGallery = new PixabayGallery(apiKey);

        const word = 'landscape';
        const page = 1;
        
        const galleryData = await pixabayGallery.getGallery(word, page);
        console.log(galleryData);
    } catch (error) {
        console.error('Error fetching gallery:', error);
    }
})();
