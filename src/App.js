import React,{useEffect,lazy,Suspense} from 'react'
import './App.css';
import {Switch, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { currentUser } from './functions/auth';
import {useDispatch} from 'react-redux'

import { auth } from './firebase';
import { LoadingOutlined } from '@ant-design/icons';
// import Home from './pages/Home';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Header from './components/nav/Header';

// import 'react-toastify/dist/ReactToastify.css'
// import RegisterComplete from './pages/auth/RegisterComplete';

// import ForgotPassword from './pages/auth/ForgotPassword';

// import UserRoute from './components/routes/UserRoute';
// import AdminRoute from './components/routes/AdminRoute';

// import History from './pages/user/History';
// import PasswordChange from './pages/user/PasswordChange';
// import Whishlist from './pages/user/Whishlist';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import CategoryCreate from './pages/admin/category/CategoryCreate';
// import CategoryUpdate from './pages/admin/category/CategoryUpdate';
// import SubCreate from './pages/admin/subcategory/SubCreate';
// import SubUpdate from './pages/admin/subcategory/SubUpdate';
// import ProductCreate from './pages/admin/product/ProductCreate';
// import AllProducts from './pages/admin/product/AllProducts';
// import ProductUpdate from './pages/admin/product/ProductUpdate';
// import SingleProduct from './pages/SingleProduct';
// import CategoryHome from './pages/category/CategoryHome';
// import Payment from './pages/Payment';
// import SubHome from './pages/sub/SubHome';
// import Shop from './pages/Shop';
// import Cart from './pages/Cart';
// import Sidedraw from './components/drawer/Sidedraw';
// import Checkout from './pages/Checkout';
// import CreateCouponPage from './pages/admin/coupon/CreateCouponPage';

//using lazy
const Home = lazy(()=>import('./pages/Home')) ;
const Login =lazy(()=>import('./pages/auth/Login')) ;
const Register =lazy(()=>import( './pages/auth/Register'));
const Header =lazy(()=>import( './components/nav/Header'));
const RegisterComplete =lazy(()=>import('./pages/auth/RegisterComplete')) ;

const ForgotPassword =lazy(()=>import('./pages/auth/ForgotPassword')) ;

const UserRoute =lazy(()=>import('./components/routes/UserRoute')) ;
const AdminRoute =lazy(()=>import('./components/routes/AdminRoute')) ;

const History =lazy(()=>import('./pages/user/History')) ;
const PasswordChange =lazy(()=>import('./pages/user/PasswordChange')) ;
const Whishlist =lazy(()=>import('./pages/user/Whishlist')) ;
const AdminDashboard =lazy(()=>import('./pages/admin/AdminDashboard')) ;
const CategoryCreate =lazy(()=>import('./pages/admin/category/CategoryCreate')) ;
const CategoryUpdate =lazy(()=>import('./pages/admin/category/CategoryUpdate')) ;
const SubCreate =lazy(()=>import('./pages/admin/subcategory/SubCreate')) ;
const SubUpdate =lazy(()=>import('./pages/admin/subcategory/SubUpdate')) ;
const ProductCreate =lazy(()=>import('./pages/admin/product/ProductCreate')) ;
const AllProducts =lazy(()=>import('./pages/admin/product/AllProducts')) ;
const ProductUpdate =lazy(()=>import('./pages/admin/product/ProductUpdate')) ;
const SingleProduct =lazy(()=>import('./pages/SingleProduct')) ;
const CategoryHome =lazy(()=>import('./pages/category/CategoryHome')) ;const Payment =lazy(()=>import('./pages/Payment')) ;
const SubHome =lazy(()=>import('./pages/sub/SubHome')) ;
const Shop =lazy(()=>import('./pages/Shop')) ;
const Cart =lazy(()=>import('./pages/Cart')) ;
const Sidedraw =lazy(()=>import('./components/drawer/Sidedraw')) ;
const Checkout =lazy(()=>import( './pages/Checkout'));
const CreateCouponPage =lazy(()=>import('./pages/admin/coupon/CreateCouponPage')) ;


function App() {
  const dispatch = useDispatch()
  // to check auth state firebase
useEffect(()=>{
const unsubscribe = auth.onAuthStateChanged(async (user)=>{
  if(user){
    const idTokenResult = await user.getIdTokenResult()
    //console.log("User", user);
    currentUser(idTokenResult.token)
    .then(res=>{
dispatch({type:"LOGGED_IN_USER",payload:{
  name:res.data.name, 
  email:res.data.email,
  role:res.data.role,
  _id:res.data._id,
  token:idTokenResult.token
}})
    })
    .catch((error)=>console.log("CURRENT USER ERROR", error));
  }
})
//cleanup 
return ()=> unsubscribe()
},[])
  return (<Suspense fallback={
    <div className="col tex-center p-5">
     React Redux EC<LoadingOutlined/>MMERCE__
    </div>
  }>
  <Header/>
  <Sidedraw/>
  <ToastContainer/>
  <Switch>
{/* routes */}
    <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/register/complete" component={RegisterComplete}/>
    <Route exact path="/forgot/password" component={ForgotPassword}/>
    <UserRoute exact path="/user/history" component={History}/>
    <UserRoute exact path="/user/password" component={PasswordChange}/>
    <UserRoute exact path="/user/whishlist" component={Whishlist}/>
    <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
    <AdminRoute exact path="/admin/category" component={CategoryCreate}/>
    <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate}/>
    <AdminRoute exact path="/admin/sub" component={SubCreate}/>
    <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate}/>
    <AdminRoute exact path="/admin/product" component={ProductCreate}/>
    <AdminRoute exact path="/admin/products" component={AllProducts}/>
    <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate}/>
    <AdminRoute exact path="/admin/coupon" component={CreateCouponPage}/>
  </Switch>
   <Route exact path="/product/:slug" component={SingleProduct}/>
   <Route exact path="/category/:slug" component={CategoryHome}/>
   <Route exact path="/sub/:slug" component={SubHome}/>
   <Route exact path="/shop" component={Shop}/>
   <Route exact path="/cart" component={Cart}/>
   <UserRoute exact path="/checkout" component={Checkout}/>
   <UserRoute exact path="/payment" component={Payment}/>
   
  </Suspense>);
}

export default App;
