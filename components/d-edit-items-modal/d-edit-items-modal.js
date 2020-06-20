import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Modal, Share, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DItemsEditModalStyles from './d-edit-items-modal.styles'
import { useSelector, useDispatch } from 'react-redux';
import { editShoppingList } from '../../store/actions/shopsList'

const DItemsEditModal = props => {
    const [shareData, setShareData] = useState('');
    const [itemsToEdit, setItemsToEdit] = useState();
    const shoppingList = useSelector(state => state.shopsList.shoppingList);
    const dispatch = useDispatch();
    const state = useSelector(state => state.shopsList);
    useEffect(() => {
        if (shoppingList.length > 0) {
            setItemsToEdit(shoppingList.find(ele => ele.shopName === props.shpDetails.shopName && ele.shopId === props.shpDetails.shopId).shoppingList)
        }
    }, [shoppingList])
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: props.itemsToEdit.shoppingList.map(ele => ele.value + ' - ' + ele.quantity).join('\n')
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    props.closeEditModal()
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const onEditPressHandler = (editItem) => {
        dispatch(editShoppingList({ shopId: props.shpDetails.shopId, shopName: props.shpDetails.shopName, shoppingList: [{ id: '0', quantity: '2 kgs', value: 'Ragi' }] }))
    }

    const closeEditModalHandler = () => {
        props.closeEditModal()
    }

    return (
        <Modal visible={props.isModalShow} animationType='slide'>
            <View style={DItemsEditModalStyles.ModalContainer}>
                <View ><Text style={DItemsEditModalStyles.ModalHeader}>Items from {props.shpDetails.shopName}</Text></View>
                <FlatList style={DItemsEditModalStyles.ItemsList} keyExtractor={(item) => item.id} data={itemsToEdit} renderItem={itemData =>
                    <View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#ffff80', justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 40, borderBottomColor: '#000', borderBottomWidth: 0.25 }}>
                            <Text >{itemData.item.value}</Text>
                            <Text >{itemData.item.quantity}</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => onEditPressHandler(itemData.item)}>
                                <Icon name="pencil" size={15} color="#696b6a" />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                />
                <View style={DItemsEditModalStyles.btnContainer}>
                    <View style={DItemsEditModalStyles.modalBtn}><Button title='Share' icon={<Icon name="share-alt" size={10} color="#fff" style={{ marginRight: 20 }} />} onPress={onShare} /></View>
                    <View style={DItemsEditModalStyles.modalBtn}><Button title='Cancel' icon={<Icon name="times" size={10} color="#fff" style={{ marginRight: 20 }} />} onPress={closeEditModalHandler} color="#f00" buttonStyle={{ backgroundColor: 'red' }} /></View>
                </View>

            </View>

        </Modal >
    )

}
export default DItemsEditModal;

// ffff80