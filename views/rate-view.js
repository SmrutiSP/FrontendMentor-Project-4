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
        this._clearPreviousRenderedViews(domRoot);
        this._renderViews(domRoot);
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
        this.imageWithinHeaderElement.src = "./images/icon-star.svg";
        this.imageWithinHeaderElement.alt = "star icon";
        this.hOneTagWithinHeaderElement.textContent = "How did we do ?";

        this.pTagWithinSectionElementOne.textContent = "Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!";

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
        this.headerElement.classList.add('rate-view-header-element');
        
        this.sectionElementOne = this._doc.createElement('section');
        this.pTagWithinSectionElementOne = this._doc.createElement('p');
        this.sectionElementOne.appendChild(this.pTagWithinSectionElementOne);
        this.sectionElementOne.classList.add('rate-view-section-element-one');

        this.sectionElementTwo = this._doc.createElement('section');
        this.ulTagWithinSectionElementTwo = this._doc.createElement('ul');
        for(let index = 1 ; index <= this._maxRating ; index++) {
            this['liTagWithinUlTag'+index] = this._doc.createElement('li');
            this.ulTagWithinSectionElementTwo.appendChild(this['liTagWithinUlTag'+index]);
        }
        this.sectionElementTwo.appendChild(this.ulTagWithinSectionElementTwo);
        this.sectionElementTwo.classList.add('rate-view-section-element-two');


        this.footerElement = this._doc.createElement('footer');
        this.buttonTagWithinFooterElement = this._doc.createElement('button');
        this.footerElement.appendChild(this.buttonTagWithinFooterElement);
        this.footerElement.classList.add('rate-view-footer-element');

        this.docFragment.append(this.headerElement, this.sectionElementOne, this.sectionElementTwo, this.footerElement);
    }

    _updateRating(event) {
        if(event.target.nodeName === 'LI') {
            if(this._rating) {
                this['liTagWithinUlTag'+this._rating].removeAttribute('id');
            }
            this._rating = event.target.textContent;
            event.target.setAttribute('id','selected-rating');
        }
    }

    _publishUpdate() {
        this._passRatingToController(this._rating);
    }

    _registerEvents() {
        this.ulTagWithinSectionElementTwo.addEventListener('click',this._updateRating.bind(this));
        this.buttonTagWithinFooterElement.addEventListener('click',this._publishUpdate.bind(this));
    }

}