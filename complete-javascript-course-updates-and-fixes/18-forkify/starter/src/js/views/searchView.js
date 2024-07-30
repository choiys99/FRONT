class SearchView {
  _parenEl = document.querySelector('.search');

  getQuery() {
    const query = this._parenEl.querySelector('.search__field').value; // 검색창
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parenEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parenEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
