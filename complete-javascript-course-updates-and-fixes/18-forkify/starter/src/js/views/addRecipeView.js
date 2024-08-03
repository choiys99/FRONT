import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parce2 파일의 url.. 해당 이미지 파일의 경로를 문자열로 가져온다.

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = '성공적으로 업로드 했슴다';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this)); //현재 객체를 가르키는 bind this
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this)); //현재 객체를 가르키는 bind this
    this._overlay.addEventListener('click', this.toggleWindow.bind(this)); //현재 객체를 가르키는 bind this
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      // fromEntries = 배열을 객체로 묶어주는.. 객체를 배열로 만들어주는 entries()의반대
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
