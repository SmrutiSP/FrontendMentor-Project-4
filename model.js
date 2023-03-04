export default class StorageService {

    storeLatestRating(rating) {
        localStorage.setItem('LatestRatingProject4',JSON.stringify(rating));
    }

    getLatestRating() {
        return JSON.parse(localStorage.getItem('LatestRatingProject4'));
    }

}