import axios from 'axios';

const API_KEY = '38659360-bc0842e55c2c51de5ea7c36c0';
const BASE_URL = 'https://pixabay.com/api/';

export async function getGallery(word, page) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
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


(async () => {
    try {
        const word = 'landscape';
        const page = 1;
        
        const galleryData = await getGallery(word, page);
        console.log(galleryData);
    } catch (error) {
        console.error('Error fetching gallery:', error);
    }
})();
