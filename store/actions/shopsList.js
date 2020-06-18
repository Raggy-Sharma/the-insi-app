export const ADD_NEW_SHOP = 'ADD_NEW_SHOP';
export const ADD_SHOPPING_LIST ='ADD_SHOPPING_LIST'
export const EDIT_SHOPPING_LIST = 'EDIT_SHOPPING_LIST';
export const EDIT_SHOP = 'EDIT_SHOP'

export const addNewShop = (newShop) => {
    return {type: ADD_NEW_SHOP, newShop: newShop}
}

export const addShoppingList = (shoppingList) => {
    return {type: ADD_SHOPPING_LIST, shoppingList: shoppingList}
}

export const editShoppingList = (editedList) => {
    return {type: EDIT_SHOPPING_LIST, editedList}
}