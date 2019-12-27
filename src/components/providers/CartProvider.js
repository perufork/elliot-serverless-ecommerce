import React, { useReducer, useContext, createContext } from 'react'

const CartContext = createContext()
const CartDispatchContext = createContext()

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        data: action.payload
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        data: action.payload
      }
    case 'CLEAR_CART':
      return initialState
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, 0)

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartContext.Provider value={state}>
        {children}
      </CartContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export const useDispatchCart = () => useContext(CartDispatchContext)