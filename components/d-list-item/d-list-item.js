import React, { useState } from 'react';
import { View, Text } from 'react-native';
// import {} from './d-list-item.styles';

const DListItem = props => {
    return (
        <View style={{backgroundColor: '#69c8ff', padding: 15, marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text>{props.listItem.value}</Text>
            <Text style={{fontSize: 10}}>{props.listItem.timeStamp}</Text>
        </View>
    )
}

export default DListItem;