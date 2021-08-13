import {combineReducers} from 'redux'
import { userReducer } from './userReducer'
import {searchReducer} from './searchReducer'
import {cartReducers} from './cartReducers'
import { drawerReducers } from './drawerReducer'
import { couponReducer } from './couponReducer'
import { CODreducer } from './CODreducer'









 const rootReducer = combineReducers({
user:userReducer,
search:searchReducer,
cart:cartReducers,
drawer:drawerReducers,
coupon:couponReducer,
COD:CODreducer

})

export default rootReducer