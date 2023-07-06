import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-green/theme.css";
import "./App.css";
import Routing from "./frontend/components/Routing";
import { useAppContext } from "./frontend/context/AppContext";
import { useAuthentication } from "./frontend/context/AuthContext";
import "/node_modules/primeflex/primeflex.css";

// import {} from "primereact/resources/themes/vela-green/theme.css";
// import {} from "primereact/resources/themes/arya-green/theme.css";

function App() {
  console.log("authData", useAuthentication());
  console.log("appData", useAppContext());
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
