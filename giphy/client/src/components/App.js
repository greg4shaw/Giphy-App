import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ProvideAuth } from "./ProvideAuth";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import LoginPage from "./LoginPage";
import CreateAccount from "./CreateAccount";
import DepositPage from "./DepositPage";
import WithdrawPage from "./WithdrawPage";
import DeleteAccount from "./DeleteAccount";
import Navi from "./Navi";
import SearchPage from "./SearchPage";
//import SavedPage from "./SavedPage";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <Navi />
          <Switch>
            {/* <PrivateRoute path='/saved'>              
                            <SavedPage />
                        </PrivateRoute> */}

            <PrivateRoute path="/search">
              <SearchPage />
            </PrivateRoute>

            <PrivateRoute path="/deposit">
              <DepositPage />
            </PrivateRoute>

            <PrivateRoute path="/withdraw">
              <WithdrawPage />
            </PrivateRoute>

            <PrivateRoute path="/delete">
              <DeleteAccount />
            </PrivateRoute>

            <Route path="/login" exact>
              <LoginPage />
            </Route>

            <Route path="/signup" exact>
              <CreateAccount />
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
