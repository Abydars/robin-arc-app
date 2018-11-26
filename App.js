import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SearchForm from './app/components/SearchForm.js';
import SearchResults from './app/components/SearchResults.js';
import SingleProduct from './app/components/SingleProduct.js';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const Navigation = createStackNavigator({
    SearchForm: {screen: SearchForm},
    SearchResults: {screen: SearchResults},
    SingleProduct: {screen: SingleProduct},
});
const App = createAppContainer(Navigation);

export default App;