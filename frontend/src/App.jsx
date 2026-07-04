import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Dashboard from "./pages/Dashboard/Dashboard";
import AddEmployee from "./pages/AddEmployee/AddEmployee";
import EditEmployee from "./pages/EditEmployee/EditEmployee";
import NotFound from "./pages/NotFound/NotFound";

function App() {

    return (

        <>

            <Navbar />

            <Routes>

                <Route path="/" element={<Dashboard />} />

                <Route path="/add" element={<AddEmployee />} />

                <Route path="/edit/:id" element={<EditEmployee />} />

                <Route path="*" element={<NotFound />} />

            </Routes>

        </>

    );

}

export default App;