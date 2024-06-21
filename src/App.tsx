import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import DetailProduct from './components/DetailProduct/[id]';
import Cart from './components/Cart/Cart';
import CheckoutProduct from './components/Checkout';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/detail/:id',
    element: <DetailProduct />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/checkout',
    element: <CheckoutProduct />
  },
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
