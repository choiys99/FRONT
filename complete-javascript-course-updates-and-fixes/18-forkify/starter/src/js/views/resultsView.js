import View from '../views/View.js';
import icons from 'url:../../img/icons.svg'; // Parce2 파일의 url.. 해당 이미지 파일의 경로를 문자열로 가져온다.

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    return `
      <li class="preview">
        <a class="preview__link " href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}}</h4>
            <p class="preview__publisher">${result.publisher}</p>            
          </div>
        </a>
      </li>
    `;
  }
}

export default new ResultsView();
