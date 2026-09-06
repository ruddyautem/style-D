import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster, toast } from "sonner";
import ConfirmDeleteModal from "./components/confirm-delete-modal/confirm-delete-modal.component";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Success from "./routes/success/Success";
import Failure from "./routes/failure/Failure";
import useUserStore from "./stores/userStore";
import ProtectedRoute from "./components/protected-route/protected-route.component";
import Orders from "./routes/orders/orders.component";

const App = () => {
  useUserStore.getState().initializeListener();

  useEffect(() => {
    const handleToastClick = (e) => {
      const toastElement = e.target.closest("[data-sonner-toast]");
      if (toastElement) {
        toast.dismiss();
      }
    };

    document.addEventListener("click", handleToastClick);
    return () => document.removeEventListener("click", handleToastClick);
  }, []);
  
  return (
    <>
      <Toaster
        position="top-center"
        offset="20px"
        theme="light"
        duration={2500}
        toastOptions={{
          style: {
            background: "#fcfbf9",
            color: "#2c2623",
            border: "1px solid #eae5dc",
            fontFamily: "var(--font-sans)",
            fontSize: "0.82rem",
            boxShadow: "0 12px 30px rgba(44, 38, 35, 0.08)",
          },
        }}
      />
      <ConfirmDeleteModal />
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='/shop/*' element={<Shop />} />
          <Route path='/auth' element={<Authentication />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/success' element={<Success />} />
            <Route path='/failure' element={<Failure />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;