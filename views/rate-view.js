export default class RateView {
    constructor(options) {
        this._passRatingToController = options.passRatingToController;
        this._doc = options.document;
        this._rating = options.rating  ? options.rating : null;
        this._maxRating = options.maxRating;
        let domRoot = this._doc.querySelector('.container');
        this._createViews();
        this._populateViews();
        this._registerEvents();
        this._clearPreviousRenderedViews(domRoot)
        this._renderViews(domRoot);
        this._activateStyleSheet();
    }

    _activateStyleSheet() {
        for(let child of this._doc.head.children) {
            child.hasAttribute('rel') && 
            child.getAttribute('rel') === 'stylesheet' &&  
            child.setAttribute('href',"./stylesheets/rate-view-style.css");
        }
    }

    _clearPreviousRenderedViews(domRoot) {
        while(domRoot.childNodes.length) {
            domRoot.childNodes[0].remove();
        }
    }

    _renderViews(domRoot) {
        domRoot.appendChild(this.docFragment);
    }

    _populateViews() {
        this.imageWithinHeaderElement.src = "./assets/images/icon-star.svg";
        this.imageWithinHeaderElement.alt = "star icon";
        this.hOneTagWithinHeaderElement.textContent = "How did we do ?";

        this.pTagWithinSectionElement.textContent = "Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!";

        for(let index = 1 ; index <= this._maxRating ; index++) { 
            this['liTagWithinUlTag'+index].textContent = (""+index);
            if(this._rating && index == this._rating) {
                this['liTagWithinUlTag'+index].setAttribute('id','selected-rating');
                this._rating = this['liTagWithinUlTag'+index].textContent;
            }
        }

        this.buttonTagWithinFooterElement.textContent = "Submit";
    }

    _createViews() {
        this.docFragment = this._doc.createDocumentFragment();

        this.headerElement = this._doc.createElement('header');
        this.imageWithinHeaderElement = this._doc.createElement('img');
        this.hOneTagWithinHeaderElement = this._doc.createElement('h1');
        this.headerElement.append(this.imageWithinHeaderElement,this.hOneTagWithinHeaderElement);
        
        this.sectionElement = this._doc.createElement('section');
        this.pTagWithinSectionElement = this._doc.createElement('p');
        this.sectionElement.appendChild(this.pTagWithinSectionElement);

        this.mainElement = this._doc.createElement('main');
        this.ulTagWithinMainElement = this._doc.createElement('ul');
        for(let index = 1 ; index <= this._maxRating ; index++) {
            this['liTagWithinUlTag'+index] = this._doc.createElement('li');
            this.ulTagWithinMainElement.appendChild(this['liTagWithinUlTag'+index]);
        }
        this.mainElement.appendChild(this.ulTagWithinMainElement);

        this.footerElement = this._doc.createElement('footer');
        this.buttonTagWithinFooterElement = this._doc.createElement('button');
        this.footerElement.appendChild(this.buttonTagWithinFooterElement);

        this.docFragment.append(this.headerElement, this.sectionElement, this.mainElement, this.footerElement);
    }

    _updateRating(event) {
        if(this._rating) {
            this['liTagWithinUlTag'+this._rating].removeAttribute('id');
        }
        this._rating = event.target.textContent;
        event.target.setAttribute('id','selected-rating');
    }

    _publishUpdate() {
        this._passRatingToController(this._rating);
    }

    _registerEvents() {
        this.ulTagWithinMainElement.addEventListener('click',this._updateRating.bind(this));
        this.buttonTagWithinFooterElement.addEventListener('click',this._publishUpdate.bind(this));
    }

}