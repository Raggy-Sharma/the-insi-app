import { ADD_NEW_SHOP, ADD_SHOPPING_LIST } from '../actions/shopsList';

const initialState = {
    listOfShops: []
}

const shopsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_SHOP: {
            return { ...state, listOfShops: [...state.listOfShops, action.newShop] }
        };
        case ADD_SHOPPING_LIST: {
            var shop = state.listOfShops.find((element => {
                element.id === action.shopDetails.id && element.value === shopDetails.shopName
            }));
            shop.savedItems = action.newList;
            return {...state}
        }
        default: {
            return state
        };
    }
}

export default shopsListReducer;