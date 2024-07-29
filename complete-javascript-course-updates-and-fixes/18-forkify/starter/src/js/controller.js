import * as model from './model.js';
import recipwView from './views/recipwView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// 레시피
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // 주소창 #뒤에 오는 부분

    if (!id) return;

    // recipwView.renderSpinner();

    // 로딩 레시피
    await model.loadRecipe(id);

    //2) 렌더링 레시피
    recipwView.render(model.state.recipe);
    // const recipeView = new recipwView(model.state.recipe)
  } catch (err) {
    alert(err);
  }
};
// controlRecipes();

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
