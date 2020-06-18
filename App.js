import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, LayoutAnimation, Platform, TouchableOpacity, UIManager, } from 'react-native';
import { AppStyles } from './App.styles'
import DItemInput from './components/d-item-input/d-item-input'
import DListItem from './components/d-list-item/d-list-item';
import DModal from './components/d-items-modal/d-items-modal';
import DItemsEditModal from './components/d-edit-items-modal/d-edit-items-modal';
import ShopsListComp from './components/d-shops-list/d-shops-list'
import moment from 'moment';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import shopsListReducer from './store/reducers/shopList';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const rootReducer = combineReducers({
  shopsList: shopsListReducer
})

const store = createStore(rootReducer);


export default function App() {
  return (
    <Provider store={store}>
      <ShopsListComp />
    </Provider>
  );
}