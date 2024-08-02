import View from '../views/View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parce2 파일의 url.. 해당 이미지 파일의 경로를 문자열로 가져온다.

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = '해당 레시피를 찾을 수 없습니다.';
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
