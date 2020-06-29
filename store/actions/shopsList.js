export const ADD_NEW_SHOP = 'ADD_NEW_SHOP';
export const ADD_SHOPPING_LIST = 'ADD_SHOPPING_LIST'
export const EDIT_SHOPPING_LIST = 'EDIT_SHOPPING_LIST';
export const EDIT_SHOP = 'EDIT_SHOP';
export const SET_SHOPS_LIST = 'SET_SHOPS_LIST';

export const fetchShopsList = () => {
    return async dispatch => {
        const response = await fetch('https://rn-dinsi-app.firebaseio.com/shops.json');

        const resData = await response.json();

        const loadedShopsList = [];

        for(key in resData) {
            loadedShopsList.push({id: key, shopName: resData[key].shopName, timeStamp: resData[key].timeStamp})
        };

        // console.log(loadedShopsList);

        dispatch({type: SET_SHOPS_LIST, listOfShops: loadedShopsList})
    }
}

export const addNewShop = (newShop) => {
    return async dispatch => {
        const response = await fetch('https://rn-dinsi-app.firebaseio.com/shops.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shopName: newShop.shopName,
                timeStamp: newShop.timeStamp
            })
        });

        const resData = await response.json();

        newShop.id = resData.name;
        dispatch({
            type: ADD_NEW_SHOP, newShop: newShop
        })

        dispatch(addShoppingList({ shopId: newShop.id, shopName: newShop.shopName, shoppingList: newShop.shoppingList }))
    }
}

export const addShoppingList = (shoppingList) => {
    return async dispatch => {
        const response = await fetch('https://rn-dinsi-app.firebaseio.com/shoppingList.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shoppingList)
        });

        dispatch({ type: ADD_SHOPPING_LIST, shoppingList: shoppingList })
    }
}

export const editShoppingList = (editedList) => {
    return { type: EDIT_SHOPPING_LIST, editedList }
}