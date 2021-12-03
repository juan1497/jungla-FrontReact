import './App.css';
import React, { useState } from "react";
import {Link,Switch,Route,BrowserRouter as Router} from 'react-router-dom'
import Nav from "./components/Nav"
import Home from "./pages/Home/Home"
import Animals from "./pages/Animals/Animals"
import Habitats from "./pages/Habitats/Habitats"
import Login from "./pages/Login/Login"
import AddAnimals from "./pages/Create/AddAnimals"
import AuthRoute from "./components/AuthRoute"
import AnimalsDetail from "./pages/Animals/components/AnimalsDetail"
import AddFamily from './pages/Create/AddFamily';
import AddHabitat from './pages/Create/AddHabitat';

export const UserContext = React.createContext("");
function App() {
  const [user, setUser] = useState(null);
  const saveUser = (user) => {
    setUser(user);
  };
  const authenticated = user!=null?user:null;

  

  return (
    <Router>
      
      <UserContext.Provider value={{ user, saveUser }}>
      <Nav/>
      
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/user/login" component={Login}/>
          
          <AuthRoute
              authenticated={authenticated}
              path="/animals"
              render={(props) => <Animals user={user} {...props} />}
          />
          
          <AuthRoute
              authenticated={authenticated}
              exact path="/animal/:id"
              render={(props) => <AnimalsDetail user={user} {...props} />}
          />
          <AuthRoute
              authenticated={authenticated}
              path="/habitats"
              render={(props) => <Habitats user={user} {...props} />}
          />          
          <AuthRoute
              authenticated={authenticated}
              path="/add/animal"
              render={(props) => <AddAnimals user={user} {...props} />}
          />
          <AuthRoute
              authenticated={authenticated}
              path="/add/family"
              render={(props) => <AddFamily user={user} {...props} />}
          />
          <AuthRoute
              authenticated={authenticated}
              path="/add/habitat"
              render={(props) => <AddHabitat user={user} {...props} />}
          />
        </Switch>          
      </UserContext.Provider>
    </Router>
  );
}

export default App;
