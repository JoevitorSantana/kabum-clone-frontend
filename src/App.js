import { Login } from "./pages/Login";
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Profile } from "./pages/Profile";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/Product";
import { Cart } from "./pages/Cart";
import { UserDetails } from "./pages/UserDetails";
import { PaymentMethod } from "./pages/PaymentMethod";
import { OrderDetails } from "./pages/OrderInfo";
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import { Payment } from "./pages/Payment";
import axios from "axios";
import { Success } from "./pages/Success";
import { MyOrders } from "./pages/MyOrders";
import { Dashboards } from "./Admin/pages/Dashboard";
import { AdminLogin } from "./Admin/pages/Login";
import { CreateProduct } from "./Admin/pages/CreateProduct";
import { ProductsList } from "./Admin/pages/Products";
import { UserList } from "./Admin/pages/UsersList";
import { CreateUser } from "./Admin/pages/CreateUser";
import { UpdateProduct } from "./Admin/pages/UpdateProduct";
// import { OrdersTable } from "./Admin/components/OrderTable";
import { Orders } from "./Admin/pages/Orders";

// const stripePromise = loadStripe('pk_test_51LLUArIsEqwuAs3z70CJx0Lg6fVZXnSDcf8dbHB73W1ykbJ9dGjlJNJVvDhEkDeBaknMrfM7E98xaP3c1ucl0ZBG00jNTYhLZm');


function App() {  

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get('/api/v2/stripeapikey');

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {  
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (    
      <Router>
        <GlobalStyle />    
        { stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment}/>
          </Elements>
        )} 
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path='/product/:id' component={ProductDetails} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/cart" component={Cart}/>
          <ProtectedRoute exact path="/me" component={Profile}/>
          <ProtectedRoute exact path="/me/details" component={UserDetails}/>
          <ProtectedRoute exact path="/paymentmethod" component={PaymentMethod} />
          <ProtectedRoute exact path="/orderdetails" component={OrderDetails} />
          <ProtectedRoute exact path="/success" component={Success} />
          <ProtectedRoute exact path="/orders" component={MyOrders} />     
          <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboards} />     
          <ProtectedRoute isAdmin={true} exact path="/admin/login" component={AdminLogin} />     
          <ProtectedRoute isAdmin={true} exact path="/admin/product" component={CreateProduct} />     
          <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductsList} />     
          <ProtectedRoute isAdmin={true} exact path="/admin/edit/product/:id" component={UpdateProduct} />
          <ProtectedRoute isAdmin={true} exact path="/admin/edit/user/:id" component={CreateUser} />
          <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UserList} />     
          <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={Orders} />     

        </Switch>
      </Router>
                
  );
}

export default App;
