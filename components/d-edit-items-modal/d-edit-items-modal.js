import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Modal, Share, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DItemsEditModalStyles from './d-edit-items-modal.styles'
import { useSelector, useDispatch } from 'react-redux';
import { editShoppingList, fetchShoppingList } from '../../store/actions/shopsList'
import UpdatePrice from '../update-price/update-price'

const DItemsEditModal = props => {
    const [itemsToEdit, setItemsToEdit] = useState();
    const [modalAction, setModalAction] = useState('Edit')
    const [submitIcon, setSubmitIcon] = useState('share-alt');
    const [submitText, setSubmitText] = useState('Share')
    const [updatePrice, setUpdatePrice] = useState(false)
    const [editableItem, setEditableItem] = useState('');
    const [editableQuantity, setEditableQuantity] = useState('');
    const [editedItems, setEdittedItems] = useState([]);
    const [editIcon, setEditIcon] = useState(true);
    const [saveIcon, setSaveIcon] = useState(false);
    const shoppingList = useSelector(state => state.shopsList.shoppingList);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.isModalShow) {
            const tempShoppingBuffer = shoppingList.find(ele => ele.shopName === props.shpDetails.shopName && ele.shopId === props.shpDetails.shopId)
            if (!tempShoppingBuffer.hasOwnProperty('hasPrice')) {
                setTimeout(() => {
                    triggerUpdatePriceAlert()
                }, 500);
            }
        }
        if (shoppingList) {
            if (shoppingList.length > 0) {
                setItemsToEdit(shoppingList.find(ele => ele.shopName === props.shpDetails.shopName && ele.shopId === props.shpDetails.shopId).shoppingList)
            }
        }
    }, [shoppingList, props.isModalShow])

    const triggerUpdatePriceAlert = () => {
        Alert.alert(
            "Update Price?",
            "Do you want to update price for the items added?",
            [
                {
                    text: "Maybe, later",
                    onPress: () => console.log("Ask me later pressed")
                },
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Sure", onPress: () => {
                        setUpdatePrice(true);
                        setModalAction('Update price for');
                        setSubmitIcon('floppy-o');
                        setSubmitText('Save');
                    }
                }
            ],
            { cancelable: false }
        );
    }

    const onSubmitHandler = () => {
        if (submitIcon === 'share-alt')
            onShare();
        if (submitIcon === 'floppy-o')
            SavePricesHandlesr();
    }
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: itemsToEdit.map(ele => ele.value + ' - ' + ele.quantity).join('\n')
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    props.closeEditModal()
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const onEditPressHandler = () => {
        setEditIcon(false);
        setSaveIcon(true)
    }

    const onSavePressHandler = () => {
        setSaveIcon(false);
        setEditIcon(true);
        dispatch(editShoppingList({ shopId: props.shpDetails.shopId, shopName: props.shpDetails.shopName, shoppingList: editedItems }))
    }

    const onDeletePressHandler = (deleteItem) => {
        var index = itemsToEdit.indexOf(itemsToEdit.find(ele => ele.id === deleteItem.id));
        itemsToEdit.splice(index, 1);
        dispatch(editShoppingList({ shopId: props.shpDetails.shopId, shopName: props.shpDetails.shopName, shoppingList: itemsToEdit }))
    }

    const closeEditModalHandler = () => {
        if (submitIcon === 'floppy-o') {
            setSubmitIcon('share-alt');
            setUpdatePrice(false);
            setSubmitText('Share');
            setModalAction('Edit');
        }
        else
            props.closeEditModal()
    }

    const ItemValueChangedHandler = (event) => {
        const { eventCount, target, text } = event.nativeEvent;
        setEditableItem(text);
    };

    const ItemQuantityChangedHandler = (event) => {
        const { eventCount, target, text } = event.nativeEvent;
        setEditableQuantity(text);
    }

    const InputValueBlurHandler = (item) => {
        if (editableItem) {
            if (editedItems.length) {
                var exisistingItem = editedItems.find(ele => ele.id === item.id);
                if (exisistingItem) {
                    exisistingItem.value = editableItem;
                } else {
                    setEdittedItems([...editedItems, { id: item.id, quantity: item.quantity, value: editableItem }]);

                }
            } else {
                setEdittedItems([...editedItems, { id: item.id, quantity: item.quantity, value: editableItem }]);
            }
            setEditableItem('');
        }

    }

    const InputQuantityBlurHandler = (item) => {
        if (editableQuantity) {
            if (editedItems.length) {
                var exisistingItem = editedItems.find(ele => ele.id === item.id);
                if (exisistingItem) {
                    exisistingItem.quantity = editableQuantity;
                } else {
                    setEdittedItems([...editedItems, { id: item.id, quantity: editableQuantity, value: item.value }]);
                }
            } else {
                setEdittedItems([...editedItems, { id: item.id, quantity: editableQuantity, value: item.value }]);
            }
            setEditableQuantity('')
        }
    }

    const SavePricesHandlesr = () => {
        dispatch(editShoppingList({ shopId: props.shpDetails.shopId, shopName: props.shpDetails.shopName, shoppingList: itemsToEdit, hasPrice: true }))
        dispatch(fetchShoppingList())
        Alert.alert(
            "Success!",
            "Item prices have been successfully updated.",
            [
                {
                    text: "Ok", onPress: () => props.closeEditModal()
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <Modal visible={props.isModalShow} animationType='slide'>
            <View style={DItemsEditModalStyles.ModalContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '90%' }}>
                        <Text style={DItemsEditModalStyles.ModalHeader}>{modalAction} items from {props.shpDetails.shopName}</Text>
                    </View>
                    {(editIcon && !updatePrice) &&
                        <TouchableOpacity style={{ width: '10%', marginVertical: 15 }} activeOpacity={0.8} onPress={onEditPressHandler}>
                            <Icon name="pencil" size={15} color="#696b6a" />
                        </TouchableOpacity>
                    }
                    {(saveIcon && !updatePrice) &&
                        <TouchableOpacity style={{ width: '10%', marginVertical: 15 }} activeOpacity={0.8} onPress={onSavePressHandler}>
                            <Icon name="floppy-o" size={15} color="#696b6a" />
                        </TouchableOpacity>}
                </View>
                {updatePrice ?
                    <UpdatePrice updatePriceItems={itemsToEdit} onSavePress={SavePricesHandlesr} />
                    :
                    <View style={{ flex: 1 }}>
                        <FlatList style={DItemsEditModalStyles.ItemsList} keyExtractor={(item) => item.id} data={itemsToEdit} renderItem={itemData =>
                            <View>
                                <View style={{ flexDirection: 'row', backgroundColor: '#ffff80', justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 10, borderBottomColor: '#000', borderBottomWidth: 0.25 }}>
                                    <TextInput style={{ width: '70%' }} placeholder={itemData.item.value} placeholderTextColor='#000' onChange={ItemValueChangedHandler} editable={saveIcon} onEndEditing={() => InputValueBlurHandler(itemData.item)} />
                                    <TextInput style={{ width: '20%' }} placeholder={itemData.item.quantity} placeholderTextColor='#000' onChange={ItemQuantityChangedHandler} editable={saveIcon} onEndEditing={() => InputQuantityBlurHandler(itemData.item)} />
                                    <TouchableOpacity style={{ width: '10%' }} activeOpacity={0.8} onPress={() => onDeletePressHandler(itemData.item)}>
                                        <Icon name="minus" size={15} color="#696b6a" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        />
                    </View>}
                <View style={DItemsEditModalStyles.btnContainer}>
                    <View style={DItemsEditModalStyles.modalBtn}><Button title={submitText} icon={<Icon name={submitIcon} size={10} color="#fff" style={{ marginRight: 20 }} />} onPress={onSubmitHandler} /></View>
                    <View style={DItemsEditModalStyles.modalBtn}><Button title='Cancel' icon={<Icon name="times" size={10} color="#fff" style={{ marginRight: 20 }} />} onPress={closeEditModalHandler} color="#f00" buttonStyle={{ backgroundColor: 'red' }} /></View>
                </View>

            </View>
        </Modal >
    )

}
export default DItemsEditModal;

// ffff80