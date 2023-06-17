import "./App.css";
import Routing from "./frontend/components/Routing";
import logo from "./logo.svg";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import {} from "primereact/resources/themes/saga-green/theme.css";
// import {} from "primereact/resources/themes/vela-green/theme.css";
// import {} from "primereact/resources/themes/arya-green/theme.css";

function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
