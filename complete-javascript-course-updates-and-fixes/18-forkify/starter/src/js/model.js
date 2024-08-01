import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from '../js/views/config.js';
import { getJSON } from '../js/views/helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

// 레시피 정보
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    console.log(data);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      // some = 주어진 요소중 하나라도 함수 통과 하면 true
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    console.log(state.recipe);
  } catch (err) {
    console.error(`${err} 에렁러러러`);
    throw err;
  }
};

//검색
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 에렁러러러`);
    throw err;
  }
};
//현재 페이지
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9
  return state.search.results.slice(start, end);
};

//레시피 업데이트
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // 새수량 = 이전 수량에 * 새 제공량을 이전 제공량으로 나눈 값과 같다?
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });
  state.recipe.servings = newServings;
};

// 북마크 추가
export const addBookmark = function (recipe) {
  // 북마크 추가
  state.bookmarks.push(recipe);
  // 현재 레시피 북마크 추가
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
};

//북마크 해제
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  // 현재 레시피 북마크 해제

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
};
