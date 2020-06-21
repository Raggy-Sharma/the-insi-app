import { ADD_NEW_SHOP, ADD_SHOPPING_LIST, EDIT_SHOPPING_LIST } from '../actions/shopsList';

const initialState = {
    listOfShops: [],
    shoppingList: []
}

const shopsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_SHOP: {
            return { ...state, listOfShops: [...state.listOfShops, action.newShop] }
        };
        case ADD_SHOPPING_LIST: {
            return { ...state, shoppingList: [...state.shoppingList, action.shoppingList] }
        };
        case EDIT_SHOPPING_LIST: {
            var itemsList = state.shoppingList.find(ele => ele.shopId === action.editedList.shopId && ele.shopName === action.editedList.shopName).shoppingList
            action.editedList.shoppingList.filter(ele => {
                itemsList.find(el => el.id === ele.id).value = ele.value
            })
            state.shoppingList.shoppingList = itemsList
            return {...state, shoppingList: [...state.shoppingList]}
        }
        default: {
            return state
        };
    }
}

export default shopsListReducer;