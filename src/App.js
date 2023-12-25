import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
// import TodoApp from "./components/Todoapi/TodoApp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import router1 from './components/router1/router1';
// import Home from './components/router1/Home';
// import About from './components/router1/About';
// import Contact from './components/router1/Contact';
import Category from './components/router3/Category';
import Product from './components/router3/Product';
import Customer from './components/customers/customer';
import TodoApp from "./components/todonoapi/TodoApp";

// function App() {
//   return (
//     <>
//     {/* <TodoApp/>
//     <ToastContainer icon={false} /> */}
//     <div>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//         <li>
//           <Link to="/contact">Contact</Link>
//         </li>
//       </ul>

//     </div>
//     <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//     </>
//   );
// }

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/product" element={<Product />} />
      </Routes> */}
      <Customer/>
        <ToastContainer icon={false} />
</>
  );
}

export default App;
