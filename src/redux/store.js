import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { orderReducer, checkoutCartReducer } from "./reducers/checkoutSessionReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { addToCartReducer, getUserCartReducer, removeItemFromCartReducer } from "./reducers/cartReducer";

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: hardSet, // autoMergeLevel1 : default (overwrirtes on init state) // autoMergeLevel2 (merges init and incoming state)
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    checkoutSession: orderReducer,
    cartCheckoutSession: checkoutCartReducer,

    addedToCart: addToCartReducer,
    getUserCart: getUserCartReducer,
    removedFromCart: removeItemFromCartReducer
}));

export const store = createStore(persistedReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);