import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { DItemInputStyle } from './d-item-input.styles';
// import DModal from './components/d-item-input/d-item-input'


const DItemInput = props => {
    const [enteredShopName, setEnteredText] = useState('');

    const enteredTextHandler = (enteredTxt) => {
        setEnteredText(enteredTxt);
    }

    const AddPressHandler = () => {
        props.addShop(enteredShopName);
        if (enteredShopName) {
            props.onAddPress();
            props.setModalHeader(enteredShopName);
        }
        setEnteredText('')
    }

    return (
        <View style={DItemInputStyle.dInputContainer}>
            <TextInput placeholder='Enter shop name' placeholderTextColor='#525050' style={DItemInputStyle.dItemInput} onChangeText={enteredTextHandler} value={enteredShopName} />
            <Button icon={
                <Icon
                    name="plus"
                    size={20}
                    // color="#424543"
                    color='#696b6a'
                />
            }
            type='clear' onPress={AddPressHandler} />
        </View>
    )
}

export default DItemInput;