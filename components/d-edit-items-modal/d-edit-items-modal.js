import React, { useState } from 'react';
import { View, FlatList, Text, Modal, Share } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DItemsEditModalStyles from './d-edit-items-modal.styles'

const DItemsEditModal = props => {
    const [shareData, setShareData] = useState('');
    // const onShareHandler = () => {
    //     setShareData(props.itemsToEdit.savedItems.map(ele => ele.value + ' - ' + ele.quantity).join('\n'));
    //     onShare();
    // }
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: props.itemsToEdit.savedItems.map(ele => ele.value + ' - ' + ele.quantity).join('\n')
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
    return (
        <Modal visible={props.isModalShow} animationType='slide'>
            <View style={DItemsEditModalStyles.ModalContainer}>
                <View ><Text style={DItemsEditModalStyles.ModalHeader}>{props.itemsToEdit.value}</Text></View>
                <FlatList style={DItemsEditModalStyles.ItemsList} keyExtractor={(item) => item.id} data={props.itemsToEdit.savedItems} renderItem={itemData =>
                    <View style={{ flexDirection: 'row', backgroundColor: '#ffff80', justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 40, borderBottomColor: '#000', borderBottomWidth: 0.25 }}>
                        <Text >{itemData.item.value}</Text>
                        <Text >{itemData.item.quantity}</Text>
                    </View>}
                />
                <View style={DItemsEditModalStyles.btnContainer}>
                    <View style={DItemsEditModalStyles.modalBtn}><Button title='Share' icon={<Icon name="share-alt" size={10} color="#fff" style={{marginRight: 20}}/>} onPress={onShare} /></View>
                    <View style={DItemsEditModalStyles.modalBtn}><Button title='Cancel' icon={<Icon name="times" size={10} color="#fff" style={{marginRight: 20}}/>} onPress={props.closeEditModal} color="#f00" buttonStyle={{ backgroundColor: 'red' }} /></View>
                    <View style={DItemsEditModalStyles.modalBtn}><Button title='Editt' icon={<Icon name="pencil" size={10} color="#fff" style={{marginRight: 20}}/>} color="#f00" buttonStyle={{ backgroundColor: 'red' }} /></View>
                </View>

            </View>

        </Modal >
    )
}

export default DItemsEditModal;
// ffff80