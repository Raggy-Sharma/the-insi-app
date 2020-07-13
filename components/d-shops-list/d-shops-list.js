import React, { useState, useEffect } from 'react';
import { View, FlatList, LayoutAnimation, Platform, TouchableOpacity, UIManager, ActivityIndicator, Alert } from 'react-native';
import { AppStyles } from '../../App.styles'
import DItemInput from '../d-item-input/d-item-input'
import DShopTile from '../d-shop-tile/d-shop-tile'
import { useSelector, useDispatch } from 'react-redux';
import { fetchShopsList, fetchShoppingList, deleteShopWithItems } from '../../store/actions/shopsList';


if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const ShopsListComp = props => {

  const [isLoading, setIsLoading] = useState(false);
  const availableShops = useSelector(state => state.shopsList.listOfShops);
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

  const editItemsModalHandler = (item) => {
    setShopDetails({ shopId: item.id, shopName: item.shopName })
    setTimeout(() => setShowEditModal(true), 100)
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
  const bgColors = [
    '#7afcff',
    '#feff9c',
    '#ffd4e7',
    '#ffff80',
    '#69c8ff',
    '#99ffbe'
  ]
  const randomiseNum = (min, max) => Math.random() * (max - min) + min;

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
      <FlatList numColumns='2' keyExtractor={(item) => item.id} data={availableShops} renderItem={itemData => <View style={{flex: 1}}>
          <DShopTile bgColor={bgColors[Math.floor(randomiseNum(0, 6))]} listItem={itemData.item} deleteShop={() => deleteShopHandler(itemData.item)} onTileLongPress={() => editItemsModalHandler(itemData.item)}/>
      </View>} style={AppStyles.listContainer} />
    </View>
  )
}

export default ShopsListComp;