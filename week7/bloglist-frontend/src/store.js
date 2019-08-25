import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import messagesReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  messageState: messagesReducer,
  blogState: blogReducer,
  userState: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
