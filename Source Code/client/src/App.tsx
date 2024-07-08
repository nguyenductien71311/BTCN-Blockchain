import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer position="bottom-left" theme="colored" />
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
