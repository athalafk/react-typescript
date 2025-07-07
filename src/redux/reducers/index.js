import { combineReducers } from 'redux';
import cartReducer from 'src/redux/reducers/cartReducer';
import productReducer from 'src/redux/reducers/productReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
});

export default rootReducer;