import './sass/index.scss'
import Header from './components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Category from './pages/Category';
import { Product } from './pages/Product';
import {  useStateValue } from './store/StateProvider';
import Register from './components/Register';
import {useEffect} from 'react'
import {firebase} from './store/FireBase'
import { Favorite } from './pages/Favorite';
import { Login } from './components/Login';
import { ShoppingCart } from './pages/ShoppingCart';
import { Shipping } from './pages/Shipping';
function App() {
   const [{},dispatch] = useStateValue()
  useEffect(() => {
     firebase.auth().onAuthStateChanged((user)=>{
       if(user){
        const {displayName,email} = user
        //  SET USER IN STATE GLOCAL
         dispatch({
           type:'SET_USER',
           data:{
             displayName:displayName,
             email:email
           }
         })
       }else{

         dispatch({
          type:'SET_USER',
          data:{
          
          }
        })
       }
     })
    return () => {
      
    }
  }, [])
  return (
  
      <Router>
      <div className="App ">
        <Header />
  
          <Switch>
            <Route  path="/yodyshop">
            <Home />
            </Route>
            <Route  path="/shipping">
              <Shipping />
            </Route>
            <Route  path="/shopping-cart">
              <ShoppingCart />
            </Route>
            <Route  path="/login">
              <Login />
            </Route>
            <Route  path="/favorite">
              <Favorite />
            </Route>
            <Route  path="/register">
              <Register />
            </Route>
            <Route  path="/san-pham/:id">
              <Product />
            </Route>
            <Route  path="/:id">
              <Category />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
           
          </Switch>
  
      </div>
    </Router>
 
  );
}

export default App;
