const axios = require('axios').default;

let page = 1;

export async function getGallery(word, page) {
    
    const response = await axios.get('https://pixabay.com/api/',
        {
            params: {
                key: '38659360-bc0842e55c2c51de5ea7c36c0',
                q: `${word}`,
                image_type: 'photo',
                orientation: ' horizontal',
                safesearch: true,
                page: `${page}`,
                per_page: 40,
            }
        })
    const data = response.data
    console.log(response)
    return data
};