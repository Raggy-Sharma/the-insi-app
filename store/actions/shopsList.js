export const ADD_NEW_SHOP = 'ADD_NEW_SHOP';
export const ADD_SHOPPING_LIST = 'ADD_SHOPPING_LIST';

export const addNewShop = (newShop) => {
    return {type: ADD_NEW_SHOP, newShop: newShop}
}

export const addShoppingList = (shopDetails, newList) => {
    return {type: ADD_SHOPPING_LIST, shopDetails: shopDetails, shoppingList: newList}
} 