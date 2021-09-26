import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { actionTypes } from "./actions/types";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth";

import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";

// using lazy
const Login = lazy(() => import("./pages/auth/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const CreateCoupon = lazy(() => import("./pages/admin/coupon/CreateCoupon"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const Register = lazy(() => import("./pages/auth/Register"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const Cart = lazy(() => import("./pages/Cart"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const Checkout = lazy(() => import("./pages/Checkout"));
const SideDrawer = lazy(() => import("./pages/components/drawer/SideDrawer"));
const FloatingButton = lazy(() =>
  import("./pages/components/FloatingButton/FloatingButton")
);
const Header = lazy(() => import("./pages/components/nav/Header"));
const AdminRoute = lazy(() => import("./pages/components/routes/AdminRoute"));
const UserRoute = lazy(() => import("./pages/components/routes/UserRoute"));
const Home = lazy(() => import("./pages/Home"));
const Payment = lazy(() => import("./pages/Payment"));
const Product = lazy(() => import("./pages/Product"));
const Shop = lazy(() => import("./pages/Shop"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));

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
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <SideDrawer />
      <FloatingButton />
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
        <AdminRoute exact path="/admin/coupon" component={CreateCoupon} />

        {/* Category */}
        <Route exact path="/category/:slug" component={CategoryHome} />

        {/* Sub Category */}
        <Route exact path="/sub/:slug" component={SubHome} />

        {/* Cart */}
        <Route exact path="/cart" component={Cart} />

        {/* Checkout */}
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />
      </Switch>
    </Suspense>
  );
};

export default App;
