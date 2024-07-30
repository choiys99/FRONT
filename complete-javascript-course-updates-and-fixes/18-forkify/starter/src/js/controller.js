import * as model from './model.js';
import recipwView from './views/recipwView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// 레시피
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // 주소창 #뒤에 오는 부분

    if (!id) return;
    recipwView.renderSpinner();

    // 레시피
    await model.loadRecipe(id);

    //2) 렌더링 레시피
    recipwView.render(model.state.recipe);
    // const recipeView = new recipwView(model.state.recipe)
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
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipwView.addHandlerRender(controlRecipes); // 레시피 정보
  searchView.addHandlerSearch(controlSearchResults); //검색 정보
};

init(); // 실행
