import axios from 'axios';

const API_KEY = '38659360-bc0842e55c2c51de5ea7c36c0';

export async function getGallery(word, page) {
    try {
        const response = await axios.get('https://pixabay.com/api/', {
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
