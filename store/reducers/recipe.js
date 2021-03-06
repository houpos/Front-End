import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BACK_END_SERVER, SPOONACULAR_API_KEY } from '../../config/secrets.js';

const initialState = {
  recipes: [],
  favoriteRecipes: [],
};

const GOT_RECIPES_WITH_INGREDIENT = 'GOT_RECIPES_WITH_INGREDIENT';
const GOT_FAVORITE_RECIPES = 'GOT_FAVORITE_RECIPES';
const ADDED_FAVORITE_RECIPE = 'ADDED_FAVORITE_RECIPE';
const DELETED_FAVORITE_RECIPE = 'REMOVED_FAVORITE_RECIPE';

const gotRecipesWithIngredient = allRecipes => ({
  type: GOT_RECIPES_WITH_INGREDIENT,
  allRecipes,
});

const gotFavoriteRecipes = favoriteRecipes => ({
  type: GOT_FAVORITE_RECIPES,
  favoriteRecipes,
});

const addedFavoriteRecipe = recipe => ({
  type: ADDED_FAVORITE_RECIPE,
  recipe,
});

const deletedFavoriteRecipe = apiId => ({
  type: DELETED_FAVORITE_RECIPE,
  apiId,
});

export const getRecipesWithIngredient = ingredient => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&includeIngredients=${ingredient}&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&limitLicense=true&number=5&apiKey=${SPOONACULAR_API_KEY}`
      );

      const recipes = data.results.map(_recipe => {
        const instructions = _recipe.analyzedInstructions[0].steps.map(
          instruction => instruction.step
        );
        const ingredients = [
          ..._recipe.usedIngredients,
          ..._recipe.missedIngredients,
        ].map(ingred => ingred.original);

        return {
          title: _recipe.title,
          image: _recipe.image,
          readyInMinutes: _recipe.readyInMinutes,
          servings: _recipe.servings,
          instructions,
          ingredients,
          apiId: _recipe.id,
        };
      });
      dispatch(gotRecipesWithIngredient(recipes));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getFavoriteRecipes = () => {
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const { data } = await axios.get(`${BACK_END_SERVER}/api/recipe`, {
        params: {
          userId,
        },
      });
      dispatch(gotFavoriteRecipes(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addFavoriteRecipe = recipe => {
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const { data } = await axios.post(
        `${BACK_END_SERVER}/api/recipe`,
        recipe,
        {
          params: {
            userId,
          },
        }
      );
      dispatch(addedFavoriteRecipe(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFavoriteRecipe = apiId => {
  return async dispatch => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await axios.delete(`${BACK_END_SERVER}/api/recipe/`, {
        params: {
          userId,
          apiId,
        },
      });
      dispatch(deletedFavoriteRecipe(apiId));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_RECIPES_WITH_INGREDIENT:
      return { ...state, recipes: action.allRecipes };
    case GOT_FAVORITE_RECIPES:
      return { ...state, favoriteRecipes: action.favoriteRecipes };
    case ADDED_FAVORITE_RECIPE: {
      return {
        ...state,
        favoriteRecipes: [...state.favoriteRecipes, action.recipe],
      };
    }
    case DELETED_FAVORITE_RECIPE: {
      const favoriteRecipes = [...state.favoriteRecipes].filter(
        recipe => action.apiId !== recipe.apiId
      );
      return { ...state, favoriteRecipes };
    }
    default:
      return state;
  }
}
