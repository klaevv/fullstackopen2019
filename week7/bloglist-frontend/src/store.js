import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import messagesReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  messageState: messagesReducer,
  blogState: blogReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
