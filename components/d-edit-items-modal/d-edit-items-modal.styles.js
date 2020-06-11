import { StyleSheet } from 'react-native';

const DItemsEditModalStyles = StyleSheet.create({
    ModalContainer: {
        justifyContent: 'flex-start',
        backgroundColor: '#ffffcc',
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 20
    },
    ModalHeader: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: "700"
    },
    ItemsList: {
        marginVertical: 20,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalBtn: {
        marginHorizontal: 5,
        flex: 1
    }
})

export default DItemsEditModalStyles;