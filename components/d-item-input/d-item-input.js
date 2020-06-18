import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { DItemInputStyle } from './d-item-input.styles';
import DModal from '../d-items-modal/d-items-modal'

const DItemInput = props => {
    const [enteredShopName, setEnteredText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalHeader, setModalHeader] = useState('');

    const enteredTextHandler = (enteredTxt) => {
        setEnteredText(enteredTxt);
    }

    const AddPressHandler = () => {
        if (enteredShopName) {
            setModalHeader(enteredShopName);
            setShowModal(true);
        }
    }

    const closeModalHandler = () => {
        setEnteredText('');
        setShowModal(false)
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
            <DModal showModal={showModal} modalHeader={modalHeader} onCancel={closeModalHandler}/>
        </View>
    )
}

export default DItemInput;