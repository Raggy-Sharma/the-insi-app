import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, LayoutAnimation, Platform, TouchableOpacity, UIManager, } from 'react-native';
import { AppStyles } from '../../App.styles'
import DItemInput from '../d-item-input/d-item-input'
import DListItem from '../d-list-item/d-list-item';
import DModal from '../d-items-modal/d-items-modal';
import DItemsEditModal from '../d-edit-items-modal/d-edit-items-modal';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { addNewShop } from '../../store/actions/shopsList'

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ShopsListComp = props => {

  const [showModal, setShowModal] = useState(false);
  const [modalHeader, setModalTitle] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const availableShops = useSelector(state => state.shopsList.listOfShops)
  const dispatch = useDispatch()

  const addShopHandler = (shopName) => {
    if (shopName){
      dispatch(addNewShop({ id: availableShops.length.toString(), value: shopName, timeStamp: moment().format('DD MMM, YYYY hh:mm') }))
    }
  }

  const showModalHandler = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const modalTitleHandler = (title) => {
    setModalTitle(title)
  }

  const savePressHandler = (sItemsList, shpName) => {
    availableShops.filter(element => {
      if (element.value === shpName)
        element.savedItems = sItemsList;
    })
  }

  const expandList = (item) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setExpanded(!expanded);
    setExpanded(!expanded)
    item.expanded = expanded
  }

  const editItemsModalHandler = (item) => {
    item.initEditModal = true;
    setShowEditModal(true);
  }

  const closeModalHandler = (item) => {
    item.initEditModal = false;
    setShowEditModal(false)
  }

  return (
    <View style={AppStyles.screen}>
      <DItemInput addShop={addShopHandler} onAddPress={showModalHandler} setModalHeader={modalTitleHandler} />
      <FlatList keyExtractor={(item) => item.id} data={availableShops} renderItem={itemData => <View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => expandList(itemData.item)} onLongPress={() => editItemsModalHandler(itemData.item)}>
          <DListItem listItem={itemData.item} />
        </TouchableOpacity>
        <DModal showInputModal={showModal} onCancel={closeModal} modalTitle={modalHeader} onSavePress={savePressHandler} />
        {itemData.item.expanded && (<FlatList style={{ padding: 5, backgroundColor: '#35b5ff', borderBottomLeftRadius: 20 }} data={itemData.item.savedItems} keyExtractor={ele => ele.id} renderItem={element => <View style={{ padding: 10, borderBottomColor: '#000', borderBottomWidth: 0.25, flexDirection: 'row', justifyContent: "space-between" }}><Text>{element.item.value}</Text><Text>{element.item.quantity}</Text></View>} />)}
        {itemData.item.initEditModal && <DItemsEditModal isModalShow={showEditModal} itemsToEdit={itemData.item} closeEditModal={() => { closeModalHandler(itemData.item) }} />}
      </View>} style={AppStyles.listContainer} />
    </View>
  )
}

export default ShopsListComp;