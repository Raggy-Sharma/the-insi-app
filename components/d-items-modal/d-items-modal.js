import React, { useState } from 'react';
import { View, Modal, TextInput, Button, Text, FlatList } from 'react-native';
import { DModalStyles } from './d-litems-modal.styles'
import DListItem from '../d-list-item/d-list-item';

const DItemsModal = props => {

    const [dItem, setDItem] = useState('');
    const [dQty, setDQty] = useState('');
    const [dItemList, setDItemList] = useState([]);
    const [savedItemsList, setSavedItemsList] = useState('')
    const addIemHandler = () => {
        if (dItem && dQty)
            setDItemList(dItemList => [...dItemList, { id: dItemList.length.toString(), value: dItem + ' - ' + dQty }])
    }

    const saveItemsListHandler = () => {
        if(dItemList.length) {
            setSavedItemsList(dItemList.map(ele => ele.value).join('\n'))
        }
    }

    return (
        <Modal visible={props.showInputModal} animationType='slide'>
            <View style={DModalStyles.modalContainer}>
                <Text style={DModalStyles.modalHeader}>Items from {props.modalTitle}</Text>
                <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
                    <TextInput placeholder='Enter Item' placeholderTextColor='#525050' style={{ flex: 0.8, borderColor: '#000', borderWidth: 1, padding: 10, marginHorizontal: 5 }} onChangeText={setDItem} value={dItem} />
                    <TextInput placeholder='qty' placeholderTextColor='#525050' style={{ flex: 0.2, borderColor: '#000', borderWidth: 1, padding: 10, marginHorizontal: 5 }} onChangeText={setDQty} value={dQty} />
                    <Button title='Add' style={{ flex: 0.2 }} onPress={addIemHandler} />
                </View>
                <View style={DModalStyles.btnContainer}>
                    <View style={DModalStyles.modalBtn}><Button title='Save' onPress={saveItemsListHandler}/></View>
                    <View style={DModalStyles.modalBtn}><Button title='Cancel' color="#f00" onPress={props.onCancel}/></View>
                </View>
                <View>
                    <FlatList keyExtractor={(item) => item.id} data={dItemList} renderItem={itemData => <View><DListItem listItem={itemData.item} /></View>} />
                </View>
                <View style={{marginVertical: 20, padding: 5}}><Text style={{fontSize: 16, lineHeight: 40}} selectable={true}>{savedItemsList}</Text></View>
            </View>

        </Modal>
    )
}

export default DItemsModal;