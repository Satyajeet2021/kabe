import "./App.css";
import AppRouter from "./pages/AppRouter";
import AppStyle from "../src/Sass/App.scss";
import ContextFile, { useConsumeContext } from "./context/ContextFile";
import { StripeContextProvider } from "./context/stripeContext";
import { Provider } from 'react-redux';
import { store, persistor } from "redux/store";
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  // if(navigator.online == true){
  // setState(!state)
  // if(state) return <NoConnection />
  // }
  return (
    <StripeContextProvider>
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          <ContextFile>
            <AppRouter />
          </ContextFile>
        </PersistGate>
      </Provider>
    </StripeContextProvider>
  );
}

export default App;
