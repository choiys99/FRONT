import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from '../js/views/config.js';
import { AJAX } from '../js/views/helpers.js';
// import { getJSON, sendJSON } from '../js/views/helpers.js';
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

const createRecipeObject = function (data) {
  if (!data || !data.data) {
    throw new Error('Invalid dd: data or data.data is undefined');
  }

  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), // 레시피 키가존재할경우  key: recipe.key 생성 없으면 false 반환
    // && 논리 연산자 사용 왼쪽 조건이 참일경우 오른쪽 반환 아닐경우 왼쪽 반환
  };
};

// 레시피 정보
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);

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

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
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

//로컬스토리지 저장
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// 북마크 추가
export const addBookmark = function (recipe) {
  // 북마크 추가
  state.bookmarks.push(recipe);
  // 현재 레시피 북마크 추가
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;

    persistBookmarks();
  }
};

//북마크 해제
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  // 현재 레시피 북마크 해제

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;

    persistBookmarks();
  }
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
// console.log(state.bookmarks);

// const clearBookmarks = function () {
//   localStorage.clear('bookmarks');
// };
// clearBookmarks();

//레시피 업로드
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');

        if (ingArr.length !== 3) {
          throw new Error('형식이 잘못 되었습니다 다시 시도해 주세요 :)');
        }
        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    console.log(data);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
