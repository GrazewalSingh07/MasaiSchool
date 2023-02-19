import { combineReducers,applyMiddleware, legacy_createStore} from "redux"
import thunk from "redux-thunk"

import {reducer as AuthReducer} from "./auth/reducer"
import {reducer as carReducer} from "./cars/reducer"
import {reducer as MycarReducer} from "./userCars/reducer"
const rootReducer=combineReducers({
 carReducer,MycarReducer, AuthReducer
})

export const store=legacy_createStore(rootReducer, applyMiddleware(thunk))
