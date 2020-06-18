import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, Text, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { DModalStyles } from './d-litems-modal.styles'
import DListItem from '../d-list-item/d-list-item';
import { useSelector, useDispatch } from 'react-redux';
import { addNewShop, addShoppingList } from '../../store/actions/shopsList'
import moment from 'moment';

const DItemsModal = props => {

    const [dItem, setDItem] = useState('');
    const [dQty, setDQty] = useState('');
    const [dItemList, setDItemList] = useState([]);  
    const availableShops = useSelector(state => state.shopsList.listOfShops)
    const dispatch = useDispatch()



    const addIemHandler = () => {
        if (dItem && dQty)
            setDItemList(dItemList => [...dItemList, { id: dItemList.length.toString(), value: dItem, quantity: dQty }])
    }

    const saveItemsListHandler = () => {
        var shpid = availableShops.length.toString()
        dispatch(addNewShop({ id: shpid, shopName: props.modalHeader, timeStamp: moment().format('DD MMM, YYYY hh:mm')}))
        dispatch(addShoppingList({ shopId: shpid, shopName: props.modalHeader, shoppingList: dItemList }));
        setDItem('');
        setDQty('');
        setDItemList([])
        props.onCancel();
    }

    return (
        <Modal visible={props.showModal} animationType='slide'>
            <View style={DModalStyles.modalContainer}>
                <Text style={DModalStyles.modalHeader}>Items from {props.modalHeader}</Text>
                <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
                    <TextInput placeholder='Enter Item' placeholderTextColor='#525050' style={{ flex: 0.8, borderColor: '#000', borderWidth: 1, padding: 10, marginHorizontal: 5 }} onChangeText={setDItem} value={dItem} />
                    <TextInput placeholder='qty' placeholderTextColor='#525050' style={{ flex: 0.2, borderColor: '#000', borderWidth: 1, padding: 10, marginHorizontal: 5 }} onChangeText={setDQty} value={dQty} />
                    <Button onPress={addIemHandler} icon={
                        <Icon
                            name="plus"
                            size={20}
                            // color="#424543"
                            color='#696b6a'
                        />
                    }
                        type='clear'
                    />
                </View>
                <View style={DModalStyles.btnContainer}>
                    <View style={DModalStyles.modalBtn}><Button title='Save' onPress={saveItemsListHandler} /></View>
                    <View style={DModalStyles.modalBtn}><Button title='Cancel' color="#f00" onPress={props.onCancel} buttonStyle={{ backgroundColor: 'red' }} /></View>
                </View>
                <FlatList keyExtractor={(item) => item.id} data={dItemList} renderItem={itemData => <View><DListItem listItem={itemData.item} /></View>} />
            </View>
        </Modal>
    )
}

export default DItemsModal;