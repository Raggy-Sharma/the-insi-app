import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { AppStyles } from './App.styles'
import DItemInput from './components/d-item-input/d-item-input'
import DListItem from './components/d-list-item/d-list-item';
import DModal from './components/d-items-modal/d-items-modal'
import moment from 'moment';

export default function App() {
  const [shopsList, setShopsList] = useState([]);
  const [showModal, setShowModal] = useState(false)

  const addShopHandler = (shopName) => {
    if (shopName)
      setShopsList(shopsList => [...shopsList, { id: shopsList.length.toString(), value: shopName, timeStamp: moment().format('DD MMM, YYYY hh:mm')}]);
      console.log()
  }

  const showModalHandler = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <View style={AppStyles.screen}>
      <DItemInput addShop={addShopHandler} onAddPress={showModalHandler}/>
      <FlatList keyExtractor={(item) => item.id} data={shopsList} renderItem={itemData => <View>
          <DListItem listItem={itemData.item}/>
          <DModal showInputModal={showModal} onCancel={closeModal} modalTitle={itemData.item.value}/>
        </View>} style={AppStyles.listContainer}/>
    </View>
  );
}