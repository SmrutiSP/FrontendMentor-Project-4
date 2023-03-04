import StorageService from './model.js';
import RateView from './views/rate-view.js';
import RatedView from './views/rated-view.js';

class RatingController {
    constructor(document) {
        this._document = document;
        this._storageService = new StorageService();
        this._checkStoredRating();
    }

    _checkStoredRating() {
        let availableRating = this._storageService.getLatestRating();
        if(availableRating) {
            this._renderRateView(availableRating);
        } else {
            this._renderRateView();
        }
    }

    _renderRateView(availableRating) {
        let options = {
            document: this._document,
            rating: availableRating,
            maxRating: 5,
            passRatingToController: (newAvailableRating) => {
                if(!newAvailableRating) return;
                this._storageService.storeLatestRating(newAvailableRating);
                new RatedView({
                    document: this._document,
                    rating: newAvailableRating,
                    maxRating: 5
                });
            }
        }
        new RateView(options);
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    new RatingController(document);
})