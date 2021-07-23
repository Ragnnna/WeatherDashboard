import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers/rootReducer'

const store = createStore(rootReducer, applyMiddleware(thunk))

export { store }

export type RootState = ReturnType<typeof rootReducer>