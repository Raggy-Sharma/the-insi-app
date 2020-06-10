import React, { useState } from 'react';
import {View, FlatList, Text, Modal, ScrollView} from 'react-native';

const DShoppingList = props => {
    console.l
    console.log(props.shoppingItems)
    return (
        // <FlatList style={{height: 100, backgroundColor:'#fff'}} data={props.shoppingItems} keyExtractor={item=>item.id} renderItem={itemData => {
            <ScrollView>
                {props.shoppingItems.map(ele => {
                    <View>
                <Text>Coming Soon...</Text>
            </View>
                })}
            </ScrollView>
            
        // }} />
    )
}

export default DShoppingList;