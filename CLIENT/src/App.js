import { AppRouter } from "./router/AppRouter";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import "./styles/app.scss";
import { SnackbarProvider} from 'notistack';
import { useEffect } from "react";
import { role } from "./services/http/fetch-service";







function App() {


  return (
    <Provider store={store}>
      <SnackbarProvider/>
      <AppRouter />
    </Provider>
  );
}

export default App;
