import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import {  HYDRATE, createWrapper } from 'next-redux-wrapper'
import rootReducer from "./reducers/rootReducer";

// const middleware = [thunk];

// const makeStore = () => createStore(rootReducer, compose(applyMiddleware(...middleware)));

// export const wrapper = createWrapper(makeStore);

const combineMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== "production") {
      const { composeWithDevTools } = require("redux-devtools-extension")
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
  }
  
const reducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state,
        ...action.payload,
      }
      return nextState
    } else {
      return rootReducer(state, action)
    }
  }
  
  const initStore = () => {
    return createStore(reducer, combineMiddleware([thunk]))
  }
  
  export const wrapper = createWrapper(initStore)
  