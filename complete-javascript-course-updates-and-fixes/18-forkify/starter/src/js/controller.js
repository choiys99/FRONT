import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './views/config.js';
import recipeView from './views/recipwView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

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
    recipeView.renderSpinner();

    // 0 선택한 검색 결과
    resultsView.update(model.getSearchResultsPage());

    // 1) 업데이트 북마크
    bookmarksView.update(model.state.bookmarks);

    // 2 레시피
    await model.loadRecipe(id);

    // 3) 렌더링 레시피
    recipeView.render(model.state.recipe);

    // controlServings();
  } catch (err) {
    recipeView.renderErrorMessage();
    console.error(err);
  }
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
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

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) 북마크 추가/ 제거
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // 2) 레시피 업데이트
  recipeView.update(model.state.recipe);

  // 3) 북마크
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading

    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //레시피 업데이트
    recipeView.render(model.state.recipe);

    // 성공 메시지
    addRecipeView.renderMessage();

    // 북마크 등록
    bookmarksView.render(model.state.bookmarks);

    // url 변경
    // 페이지 로드하지않고 가능
    window.history.pushState(null, '', `${model.state.recipe.id}`);
    // window.history.back();

    //창 닫기
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('a', err, 'a');
    addRecipeView.renderErrorMessage(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks); //  북마크 정보
  recipeView.addHandlerRender(controlRecipes); // 레시피 정보
  recipeView.addHandlerUpdateServings(controlServings); // 레시피 정보 업데이트
  recipeView.addHandlerAddBokmark(controlAddBookmark); // 북마크 추가
  searchView.addHandlerSearch(controlSearchResults); // 검색 정보
  paginationView.addHandlerClick(controlPagination); // 버튼
  addRecipeView.addHandlerUpload(controlAddRecipe); // 레시피 작성
};

init(); // 실행
