import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getRecipesWithIngredient } from '../store';

import RecipeCards from '../components/RecipeCards';

class RecipeScreen extends Component {
  async componentDidMount() {
    await this.props.getRecipes('apple');
  }
  render() {
    const recipes = this.props.allRecipes;

    return recipes ? <RecipeCards recipes={recipes} /> : <View />;
  }
}

RecipeScreen.navigationOptions = {
  title: 'My Recipes',
};

const mapStateToProps = state => ({
  allRecipes: state.recipe,
});

const mapDispatchToProps = dispatch => ({
  getRecipes: ingredient => dispatch(getRecipesWithIngredient(ingredient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeScreen);
