import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Signup} from './pages/Signup';
import {Signin} from './pages/Signin';
import Home from './pages/Home';
import { Blogs } from "./pages/Blogs";
import Blog from "./pages/Blog";

function App() {
    return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
