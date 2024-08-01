import * as model from './model.js';
import recipwView from './views/recipwView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// 레시피
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // 주소창 #뒤에 오는 부분

    if (!id) return;
    recipwView.renderSpinner();

    // 0 선택한 검색 결과
    resultsView.update(model.getSearchResultsPage());

    //1 레시피
    await model.loadRecipe(id);

    //2) 렌더링 레시피
    recipwView.render(model.state.recipe);

    // controlServings();
  } catch (err) {
    recipwView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) 검색어
    const query = searchView.getQuery();
    if (!query) return;

    // 2) 검색 성공
    await model.loadSearchResults(query);

    // 3) 성공 결과
    console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(2)); //페이징
    // resultsView.render(model.state.search.results);

    // 4 ) 페이지 버튼
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

//버튼
const controlPagination = function (goToPage) {
  //성공시
  resultsView.render(model.getSearchResultsPage(goToPage));

  //페이지 변경 버튼
  paginationView.render(model.state.search);
};

//레시피 성분 조절? 제공량 업데이트
const controlServings = function (newServings) {
  // 기본데이터 업데이트
  model.updateServings(newServings);

  // 레시피보기 업데이트 why? 제공량 영향받음
  // recipwView.render(model.state.recipe);

  recipwView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  model.addBookmark(model.state.recipe);
  console.log(model.state.bookmarks);
  recipwView.update(model.state.recipe);
};

const init = function () {
  recipwView.addHandlerRender(controlRecipes); // 레시피 정보
  recipwView.addHandlerUpdateServings(controlServings); // 레시피 정보 업데이트
  recipwView.addHandlerAddBokmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults); // 검색 정보
  paginationView.addHandlerClick(controlPagination); // 버튼
};

init(); // 실행
