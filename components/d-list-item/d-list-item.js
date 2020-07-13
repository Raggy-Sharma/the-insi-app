import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import {} from './d-list-item.styles';

const DListItem = props => {
    return (
        <View style={{ backgroundColor: '#69c8ff', padding: 15, marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopRightRadius: 20 }}>
            <Text>{props.listItem.value}</Text>
            <Text>{props.listItem.quantity}</Text>
        </View>
    )
}

export default DListItem;