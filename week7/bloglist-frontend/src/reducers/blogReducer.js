const initialState = {
  blogs: []
}

export const setBlogs = (blogs) => {
  return dispatch => dispatch({
    type: 'SET_BLOGS',
    blogs
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_BLOGS':
    return {
      blogs: action.blogs
    }
  default:
    return state
  }
}

export default reducer
