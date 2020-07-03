import { ADD_NEW_SHOP, ADD_SHOPPING_LIST, EDIT_SHOPPING_LIST, SET_SHOPS_LIST, SET_SHOPPING_LIST , DELETE_SHOP } from '../actions/shopsList';

const initialState = {
    listOfShops: [],
    shoppingList: []
}

const shopsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOPS_LIST: {
            return {
                ...state, listOfShops: action.listOfShops
            }
        }
        case SET_SHOPPING_LIST: {
            return {
                ...state, shoppingList: action.shoppingList
            }
        }
        case ADD_NEW_SHOP: {
            return { ...state, listOfShops: [...state.listOfShops, action.newShop] }
        };
        case ADD_SHOPPING_LIST: {
            return { ...state, shoppingList: [...state.shoppingList, action.shoppingList] }
        };
        case EDIT_SHOPPING_LIST: {
            var itemsList = state.shoppingList.find(ele => ele.shopId === action.editedList.shopId && ele.shopName === action.editedList.shopName).shoppingList
            action.editedList.shoppingList.filter(ele => {
                var index = itemsList.indexOf(itemsList.find(el => el.id === ele.id));
                itemsList.splice(index, 1, ele)
            })
            state.shoppingList.shoppingList = itemsList
            return { ...state, shoppingList: [...state.shoppingList] }
        }
        case DELETE_SHOP: {
            var index = state.listOfShops.indexOf(state.listOfShops.find(ele => ele.id === action.shopId));
            state.listOfShops.splice(index, 1);
            // index = state.shoppingList.indexOf(state.shoppingList.find(ele => ele.shopId === action.shopId));
            // state.shoppingList.splice(index, 1);
            return { ...state }
        }
        default: {
            return state
        };
    }
}

export default shopsListReducer;