import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { addFavoriteRecipe } from '../store';
import SingleRecipeCard from '../components/Recipes/SingleRecipeCard';
class SingleRecipeScreen extends React.Component {
  render() {
    const recipe = this.props.navigation.getParam('recipe').recipe;

    return (
      <View style={styles.container}>
        <ScrollView>
          <SingleRecipeCard
            recipe={recipe}
            addFavoriteRecipe={addFavoriteRecipe}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipe.recipes.results,
  favoriteRecipes: state.recipe.favoriteRecipes,
});

const mapDispatchToProps = dispatch => ({
  addFavoriteRecipe: recipe => dispatch(addFavoriteRecipe(recipe)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
});
