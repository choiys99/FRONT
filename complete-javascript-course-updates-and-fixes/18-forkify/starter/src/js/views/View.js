import icons from 'url:../../img/icons.svg'; // Parce2 파일의 url.. 해당 이미지 파일의 경로를 문자열로 가져온다.

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();
    // 데이터가 있지만 배열이면서 안에 배열의 길이가 0이라면 종료하면서 에러 호출

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();
    // 데이터가 있지만 배열이면서 안에 배열의 길이가 0이라면 종료하면서 에러 호출

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // createRange = range 객체 생성 = dom 특정 부분정의 조작
    // createContextualFragment = range객체에서 사용할 수 있는 메서드 = html 문자열 파싱 하여 DOM 변환

    const newElements = Array.from(newDOM.querySelectorAll('*')); //  Array.from 배열로
    const curElemens = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElemens[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      //updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) && // 비교 대상이 다르면 true 실행
        newEl.firstChild?.nodeValue.trim() !== ''
        // newEl의 첫번째 자식노드의 nodevalue가져와서 공백제거.. 노드의 값이 비어있지 않을경우 true
      ) {
        // console.log(newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      //updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  // 로딩 스피너
  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
