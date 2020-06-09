import { StyleSheet } from 'react-native';

export const DModalStyles = StyleSheet.create ({
    modalContainer: {
        justifyContent: 'flex-start',
        backgroundColor: '#e1faea', 
        flex: 1, 
        paddingVertical: 50, 
        paddingHorizontal: 20
    },
    modalHeader: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: "700"
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