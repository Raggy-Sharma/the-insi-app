import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DItemsEditModal from '../d-edit-items-modal/d-edit-items-modal'
import { useSelector } from 'react-redux';

const DShopTile = props => {
    const [shopDetails, setShopDetails] = useState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [totalAmount, setTotalAmt] = useState();
    const availableShoppingList = useSelector(state => state.shopsList.shoppingList)

    useEffect((
    )=>{
        const shoppedItems = availableShoppingList.find(ele => ele.shopId === props.listItem.id && ele.shopName === props.listItem.shopName).shoppingList
        const totalAmountTobeSet = shoppedItems.reduce((a, b) => a + (Number(b.price || 0)), 0);
        setTotalAmt(totalAmountTobeSet);
    }, [availableShoppingList])

    const editItemsModalHandler = (item) => {
        setShopDetails({ shopId: item.id, shopName: item.shopName })
        setTimeout(() => setShowEditModal(true), 100)
    }

    const closeEditModalHandler = () => {
        setShopDetails();
        setShowEditModal(false)
    }

    const background = { backgroundColor: props.bgColor }
    return (
        <TouchableOpacity activeOpacity={0.8} style={{ ...styles.shopTile, ...background }} onLongPress={() => editItemsModalHandler(props.listItem)}>
            <View style={styles.tileHeader}>
                <Text style={styles.tileTitle}>{props.listItem.shopName}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={props.deleteShop}>
                    <Icon name="times" size={15} color="#696b6a" />
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.totalAmt}>Total: {totalAmount}</Text>
                <TouchableOpacity activeOpacity={0.8} >
                    <Icon name="ellipsis-h" size={15} color="#696b6a" />
                </TouchableOpacity>
            </View>
            {shopDetails !== undefined && <DItemsEditModal isModalShow={showEditModal} closeEditModal={closeEditModalHandler} shpDetails={shopDetails} />}

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shopTile: {
        justifyContent: 'space-between',
        height: 200,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    tileHeader: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    tileTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalAmt: {
        fontSize: 15,
        fontWeight: '500',
        color: '#6e6c6b'
    }
})


export default DShopTile;