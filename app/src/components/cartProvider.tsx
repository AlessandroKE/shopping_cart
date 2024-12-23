
import { Provider } from 'react-redux'
import { store } from '../store/store'

export const CartProvider = ({ children }:Readonly<{
  children: React.ReactNode;
}>) => {
  return <Provider store={store}>{children}</Provider>
}