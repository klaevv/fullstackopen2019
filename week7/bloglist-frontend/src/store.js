import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import messagesReducer from './reducers/messageReducer'

const reducer = combineReducers({
  messages: messagesReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
