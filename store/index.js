import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import user from './reducers/user'
import food from './reducers/food'

const reducer = combineReducers({user, food})
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default store
export * from './reducers/user'
export * from './reducers/food'
