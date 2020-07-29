import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, UIManager, LayoutAnimation, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DItemsEditModal from '../d-edit-items-modal/d-edit-items-modal'
import { useSelector, useDispatch } from 'react-redux';
import { addNewShop } from '../../store/actions/shopsList';
import moment from 'moment';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DShopTile = props => {
    const dispatch = useDispatch();
    const [shopDetails, setShopDetails] = useState();
    const [shoppingList, seShoppingList] = useState();
    const [expanded, setExpanded] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [totalAmount, setTotalAmt] = useState();
    const availableShoppingList = useSelector(state => state.shopsList.shoppingList)

    useEffect((
    ) => {
        if (availableShoppingList) {
            const shoppedItems = availableShoppingList.find(ele => ele.shopId === props.listItem.id && ele.shopName === props.listItem.shopName)
            if (shoppedItems) {
                const totalAmountTobeSet = shoppedItems.shoppingList.reduce((a, b) => a + (Number(b.price || 0)), 0);
                setTotalAmt(totalAmountTobeSet);
            }
        }
    }, [availableShoppingList])

    const editItemsModalHandler = (item) => {
        setShopDetails({ shopId: item.id, shopName: item.shopName })
        setTimeout(() => setShowEditModal(true), 100)
    }

    const closeEditModalHandler = () => {
        setShopDetails();
        setShowEditModal(false)
    }

    const openMeuHandler = () => {
        setMenuOpen(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setExpanded(!expanded);
    }

    const deletePressHandler = () => {
        props.deleteShop();
        setMenuOpen(false);
    }

    const viewPressHandler = (itemList) => {
        editItemsModalHandler(itemList);
        setMenuOpen(false);
    }

    const copyPressHandler = () => {
        Alert.alert(
            "Reorder?",
            `Out of supplies? Do you want to copy items for another order?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Go", onPress: () => {
                        copyShopsWithItems()
                    }
                }
            ],
            { cancelable: false }
        );
        setMenuOpen(false);
    }

    const copyShopsWithItems = () => {
        const shoppedItems = availableShoppingList.find(ele => ele.shopId === props.listItem.id && ele.shopName === props.listItem.shopName).shoppingList
        dispatch(addNewShop({ shopName: props.listItem.shopName, timeStamp: moment().format('DD MMM, YYYY hh:mm'), shoppingList: shoppedItems }));
    }

    const background = { backgroundColor: props.bgColor }
    return (
        <TouchableOpacity activeOpacity={0.8} style={{ ...styles.shopTile, ...background }} onLongPress={() => editItemsModalHandler(props.listItem)} onPress={() => setMenuOpen(false)}>
            <View style={styles.tileHeader}>
                <Text style={styles.tileTitle}>{props.listItem.shopName}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={props.deleteShop}>
                    <Icon name="times" size={15} color="#696b6a" />
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.totalAmt}>Total: {totalAmount}</Text>
                {!menuOpen &&
                    <TouchableOpacity activeOpacity={0.8} onPress={openMeuHandler}>
                        <Icon name="ellipsis-h" size={15} color="#696b6a" />
                    </TouchableOpacity>
                }
                {
                    menuOpen &&
                    <View style={styles.tileMenu}>
                        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8} onPress={copyPressHandler}><Text style={styles.menuItemText}>Copy Items</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8} onPress={() => viewPressHandler(props.listItem)}><Text style={styles.menuItemText}>View items</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8} onPress={deletePressHandler}><Text style={styles.menuItemText}>Delete shop</Text></TouchableOpacity>
                    </View>
                }
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
        shadowOpacity: 0.5,
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
        flex: 1
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalAmt: {
        fontSize: 15,
        fontWeight: '500',
        color: '#6e6c6b'
    },
    tileMenu: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        right: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    menuItem: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderTopWidth: 0.1,
        borderBottomWidth: 0.1
    },
    menuItemText: {
        fontSize: 15,
    }
})


export default DShopTile;