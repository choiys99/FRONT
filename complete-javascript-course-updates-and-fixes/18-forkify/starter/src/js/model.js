import { async } from 'regenerator-runtime';
import { API_URL } from '../js/views/config.js';
import { getJSON } from '../js/views/helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

// 레시피 정보
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredints: recipe.ingredients,
    };
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
  } catch (err) {
    console.error(`${err} 에렁러러러`);
    throw err;
  }
};
