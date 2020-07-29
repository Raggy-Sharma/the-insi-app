import React, { useState } from 'react';
import { Platform, UIManager } from 'react-native';
import ShopsListComp from './components/d-shops-list/d-shops-list';
import ReduxThunk from 'redux-thunk';

import { createStore, combineReducers, applyMiddleware } from 'redux';
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

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


export default function App() {
  return (
    <Provider store={store}>
      <ShopsListComp />
    </Provider>
  );
}