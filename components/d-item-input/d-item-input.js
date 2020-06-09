import React, {useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { DItemInputStyle } from './d-item-input.styles';
// import DModal from './components/d-item-input/d-item-input'


const DItemInput = props => {
    const [enteredShopName, setEnteredText] = useState('');

    const enteredTextHandler = (enteredTxt) => {
        setEnteredText(enteredTxt);
    }

    const AddPressHandler = () => {
        props.addShop(enteredShopName);
        props.onAddPress();
    }

    return (
        <View style={DItemInputStyle.dInputContainer}>
            <TextInput placeholder='Enter shop name' placeholderTextColor='#525050' style={DItemInputStyle.dItemInput} onChangeText={enteredTextHandler} value={enteredShopName} />
            <Button title='Add' onPress={AddPressHandler}/>
        </View>
    )
}

export default DItemInput;