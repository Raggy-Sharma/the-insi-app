import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, LayoutAnimation, Platform, TouchableOpacity, UIManager, ActivityIndicator, Alert } from 'react-native';
import { AppStyles } from '../../App.styles'
import DItemInput from '../d-item-input/d-item-input'
import DListItem from '../d-list-item/d-list-item';
import DItemsEditModal from '../d-edit-items-modal/d-edit-items-modal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShopsList, fetchShoppingList, deleteShopWithItems } from '../../store/actions/shopsList';


if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const ShopsListComp = props => {

  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [shopDetails, setShopDetails] = useState()
  const availableShops = useSelector(state => state.shopsList.listOfShops);
  const availableShoppingList = useSelector(state => state.shopsList.shoppingList)
  const dispatch = useDispatch();

  useEffect(() => {
    const loadShopsAndItems = async () => {
      setIsLoading(true);
      await dispatch(fetchShopsList());
      await dispatch(fetchShoppingList());
      setIsLoading(false);
    }
    loadShopsAndItems()
  }, [dispatch])
  const expandList = (item) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setExpanded(!expanded);
    setExpanded(!expanded)
    item.expanded = expanded
  }

  const editItemsModalHandler = (item) => {
    setShopDetails({ shopId: item.id, shopName: item.shopName })
    setTimeout(() => setShowEditModal(true), 100)
  }

  const closeEditModalHandler = () => {
    setShopDetails();
    setShowEditModal(false)
  }

  const deleteShopHandler = shop => {
    Alert.alert(
      "Alert!!",
      `Are you sure you want to delete ${shop.shopName}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            dispatch(deleteShopWithItems(shop.id));
            dispatch(fetchShopsList());
            dispatch(fetchShoppingList());
          }
        }
      ],
      { cancelable: false }
    );
  }

  if (isLoading) {
    return (
      <View style={AppStyles.loadingSpinner}>
        <ActivityIndicator size="large" color="#d11b1b" />
      </View>
    )
  }

  return (
    <View style={AppStyles.screen}>
      <DItemInput />
      <FlatList keyExtractor={(item) => item.id} data={availableShops} renderItem={itemData => <View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => expandList(itemData.item)} onLongPress={() => editItemsModalHandler(itemData.item)}>
          <DListItem listItem={itemData.item} deleteShop={() => deleteShopHandler(itemData.item)} />
        </TouchableOpacity>
        {itemData.item.expanded && (<FlatList style={{ padding: 5, backgroundColor: '#35b5ff', borderBottomLeftRadius: 20 }} data={availableShoppingList.find(ele => ele.shopId === itemData.item.id && ele.shopName === itemData.item.shopName).shoppingList} keyExtractor={ele => ele.id} renderItem={element => <View style={{ padding: 10, borderBottomColor: '#000', borderBottomWidth: 0.25, flexDirection: 'row', justifyContent: "space-between" }}><Text>{element.item.value}</Text><Text>{element.item.quantity}</Text></View>} />)}
        {/* {itemData.item.initEditModal && <DItemsEditModal isModalShow={showEditModal} itemsToEdit={itemData.item} closeEditModal={() => { closeModalHandler(itemData.item) }} />} */}
      </View>} style={AppStyles.listContainer} />
      {shopDetails !== undefined && <DItemsEditModal isModalShow={showEditModal} closeEditModal={closeEditModalHandler} shpDetails={shopDetails} />}

    </View>
  )
}

export default ShopsListComp;