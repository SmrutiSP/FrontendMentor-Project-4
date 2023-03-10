export default class RatedView {
    constructor(options) {
        this._doc = options.document;
        this._rating = options.rating  ? options.rating : null;
        this._maxRating = options.maxRating;
        let domRoot = this._doc.querySelector('.container');
        this._createViews();
        this._populateViews();
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
        this.imageWithinHeaderElement.src = "./images/illustration-thank-you.svg";
        this.imageWithinHeaderElement.alt = "thank you image";

        this.pTagWithinSectionElement.textContent = `You selected ${this._rating} out of ${this._maxRating}`;

        this.pTagOneWithinFooterElement.textContent = 'Thank You!';
        this.pTagTwoWithinFooterElement.textContent = 'We appreciate you taking the time to give a rating. If you ever need more support, don\'t hesitate to get in touch!';

    }

    _createViews() {
        this.docFragment = this._doc.createDocumentFragment();

        this.headerElement = this._doc.createElement('header');
        this.imageWithinHeaderElement = this._doc.createElement('img');
        this.headerElement.append(this.imageWithinHeaderElement);
        this.headerElement.classList.add('rated-view-header-element');
        
        this.sectionElement = this._doc.createElement('section');
        this.pTagWithinSectionElement = this._doc.createElement('p');
        this.sectionElement.appendChild(this.pTagWithinSectionElement);
        this.sectionElement.classList.add('rated-view-section-element');

        this.footerElement = this._doc.createElement('footer');
        this.pTagOneWithinFooterElement = this._doc.createElement('p');
        this.pTagTwoWithinFooterElement = this._doc.createElement('p');
        this.footerElement.append(this.pTagOneWithinFooterElement,this.pTagTwoWithinFooterElement);
        this.footerElement.classList.add('rated-view-footer-element');


        this.docFragment.append(this.headerElement, this.sectionElement, this.footerElement);
    }
}