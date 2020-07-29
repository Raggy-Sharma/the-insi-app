import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import DItemsEditModalStyles from '../d-edit-items-modal/d-edit-items-modal.styles'



const UpdatePrice = props => {
    const [itemPrice, setItemPrice] = useState('');
    const setPriceHandler = (item) => {
        if (itemPrice) {
            props.updatePriceItems.find(ele => ele.id === item.id).price = itemPrice;
            setItemPrice('');
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                <View style={{ width: '70%' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>Item</Text>
                </View>
                <View style={{ width: '20%' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>Price</Text>
                </View>
            </View>
            <FlatList style={DItemsEditModalStyles.ItemsList} keyExtractor={(item) => item.id} data={props.updatePriceItems} renderItem={itemData =>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginVertical: 5 }}>
                    <Text style={{ width: '70%', paddingVertical: 10, paddingHorizontal: 10, borderWidth: 0.25, marginRight: 2 }}>{itemData.item.value}</Text>
                    <TextInput placeholder='--' style={{ width: '20%', borderWidth: 0.25, paddingVertical: 10, textAlign: 'center' }} keyboardType='number-pad' onEndEditing={() => setPriceHandler(itemData.item)} onChangeText={text => setItemPrice(text)} />
                </View>
            }
            />
        </View>
    )
}

export default UpdatePrice;