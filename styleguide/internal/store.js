import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

function configureStore (initialState = {}, history) {
  // Compose final middleware and use devtools in debug environment
  let middleware = applyMiddleware(thunk)

  // Create final store and subscribe router in debug env ie. for devtools
  const store = createStore(state => state, initialState, middleware)

  return store
}

export default configureStore({
  locale: 'de'
})
