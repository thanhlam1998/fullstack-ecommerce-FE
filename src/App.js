import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-quill/dist/quill.snow.css";
import { actionTypes } from "./actions/types";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Header from "./pages/components/nav/Header";
import UserRoute from "./pages/components/routes/UserRoute";
import Home from "./pages/Home";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./pages/components/routes/AdminRoute";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SideDrawer from "./pages/components/drawer/SideDrawer";
import Checkout from "./pages/Checkout";

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // To check firebase auth state
  useEffect(() => {
    setLoading(true);
    const unsubscibe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            const { name, email, role, _id } = res.data;
            dispatch({
              type: actionTypes.LOGGED_IN_USER,
              payload: {
                name,
                email,
                token: idTokenResult.token,
                role,
                _id,
              },
            });
          })
          .catch((err) => console.log(err));
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    // cleanup
    return () => {
      unsubscibe();
    };
  }, [dispatch]);

  if (loading)
    return (
      <div className="vw-100 vh-100 position-relative">
        <div className="loader"></div>
      </div>
    );

  return (
    <>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/product/:slug" component={Product} />

        {/* User */}
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />

        {/* Admin */}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <AdminRoute exact path="/admin/products" component={AllProducts} />

        {/* Category */}
        <Route exact path="/category/:slug" component={CategoryHome} />

        {/* Sub Category */}
        <Route exact path="/sub/:slug" component={SubHome} />

        {/* Cart */}
        <Route exact path="/cart" component={Cart} />

        {/* Checkout */}
        <UserRoute exact path="/checkout" component={Checkout} />
      </Switch>
    </>
  );
};

export default App;
