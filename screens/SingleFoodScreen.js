import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, ButtonGroup } from 'react-native-elements';
import NutritionInfo from '../components/NutritionInfo';

import RecipeComponent from '../components/RecipeComponent';

export default class SingleItemScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
    this.updateSelectedIndex = this.updateSelectedIndex.bind(this);
  }
  updateSelectedIndex(index) {
    this.setState({ selectedIndex: index });
  }
  render() {
    const navigation = this.props.navigation;
    const food = {
      id: navigation.getParam('id'),
      expiresIn: navigation.getParam('expiresIn'),
      imageUrl: navigation.getParam('imageUrl'),
      name: navigation.getParam('name'),
    };
    const buttons = ['Recipes', 'Nutrition'];
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            size="xlarge"
            rounded
            source={
              food.imageUrl === null
                ? require('../assets/images/food-placeholder.jpg')
                : { uri: food.imageUrl }
            }
          />
          <Text style={styles.title}>{food.name}</Text>
          <Text style={styles.subTitle}>{food.expiresIn}</Text>
        </View>
        <View>
          <ButtonGroup
            style={styles.buttonGroup}
            onPress={this.updateSelectedIndex}
            selectedButtonStyle={{ backgroundColor: '#ED6A5A' }}
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 25 }}
          />
          {this.state.selectedIndex === 0 ? (
            <RecipeComponent food={food} navigation={navigation} />
            ) : (
            <NutritionInfo food={food} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingTop: 5,
    margin: 0,
    fontSize: 30,
    color: 'black',
  },
  subTitle: {
    paddingTop: 5,
    margin: 0,
    fontSize: 20,
    color: 'gray',
  },
  buttonGroup: {
    borderRadius: 5,
    margin: 15,
    width: '50%',
    backgroundColor: '#035640',
    alignSelf: 'center',
    fontSize: 20,
  },
});
