import { Route, Routes } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Success from "./routes/success/Success";
import Failure from "./routes/failure/Failure";
import useUserStore from "./stores/userStore";
import ProtectedRoute from "./components/protected-route/protected-route.component";

const App = () => {
  useUserStore.getState().initializeListener();
  
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/shop/*' element={<Shop />} />
        <Route path='/auth' element={<Authentication />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/success' element={<Success />} />
          <Route path='/failure' element={<Failure />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;