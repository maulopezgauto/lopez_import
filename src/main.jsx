import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './public/App.jsx'
import CatalogoCarnes from './public/catalogue.jsx'
import ContactPage from './public/contactPage.jsx'
import Login from './public/login.jsx'
import Register from "./public/register.jsx"
import ProtectedRoute from './components/protectedRoute.jsx'
import AppLobby from './private/lobby.jsx'
import PublicLayout from './public/publicLayout.jsx'
import PrivateLayout from './private/privateLayout.jsx'
import LuxuryCart from './private/shopCart.jsx'
import PrivateCatalogue from './private/privateCatalogue.jsx'
import PrivateOrders from './private/orders.jsx'
import Profile from './private/profile.jsx'
import Checkout from './private/checkout'
import Success from './private/success'
import Failed from './private/failed'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { RoleProvider } from './context/RoleContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      
        <CartProvider>
          <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />}/>
          <Route path="register" element={<Register />} />
          <Route path="/landingpage" element={<App />} />
          <Route path="/catalogue" element={<CatalogoCarnes />} />
          <Route path="/contactPage" element={<ContactPage />} />
        </Route>
          <Route path="/private" 
            element={
              <ProtectedRoute>
                <PrivateLayout/>
              </ProtectedRoute>
            }>
          <Route path="/private/lobby" element={<AppLobby/>}/>
          <Route path="/private/privateCatalogue" element={<PrivateCatalogue/>}/>
          <Route path="/private/shopCart" element={<LuxuryCart/>}/>
          <Route path="/private/orders" element={<PrivateOrders />}/> 
          <Route path="/private/profile" element={<Profile/>} />
          <Route path="/private/checkout" element={<Checkout />}/>
          <Route path="/private/success" element={<Success />}/>
          <Route path="/private/failed" element={<Failed />}/>

          </Route>
      </Routes>
    </BrowserRouter>
        </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
