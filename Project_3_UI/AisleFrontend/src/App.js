import { BrowserRouter, Route} from "react-router-dom";
import AuthorizeOtp from "./components/Authentication/AuthorizeOtp";
import SignUp from "./components/Authentication/SignUp";
import WelcomePage from "./components/Welcome/Welcomepage";

function App() {
  return (
    <div className="App">
      {/* This is used to route to a different page. App consists of 3 pages totally. */}
      <BrowserRouter>
      {/* exact path used to match the path only if equal to string value given */}
        <Route exact path="/">
          <SignUp />
        </Route>
        <Route exact path="/AuthorizeOTP">
          <AuthorizeOtp />
        </Route>
        <Route exact path="/profileHome">
          <WelcomePage />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
