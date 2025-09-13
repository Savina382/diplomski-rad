import { Routes, Route } from "react-router";
import Home from "./pages/home";
import CreateTransaction from "./pages/create-transaction";
import TransactionsList from "./pages/transactions-list";
import PrivateRoutes from "./components/feature/private-routes";
import PublicRoutes from "./components/feature/public-routes";
import Login from "./pages/login";
import SignUp from "./pages/sign-up";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/create-transaction" element={<CreateTransaction />} />
        <Route path="/transactions-list" element={<TransactionsList />} />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
