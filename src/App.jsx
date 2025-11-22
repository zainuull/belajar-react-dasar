import "./App.css";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./pages/root.layout";
import { lazy } from "react";
import SuspenseWrapper from "./SuspenseWrapper";

// Component Pages
import Home from "./pages/home";
import Detail from "./pages/about/detail";
import Example from "./pages/example";
import ArticleViewer from "./pages/artikel";
import Keranjang from "./pages/keranjang";
import Product from "./pages/product";

// import About from "./pages/about";
// import Contact from "./pages/contact";
const Contact = lazy(() => import("./pages/contact"));
const About = lazy(() => import("./pages/about"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <SuspenseWrapper>
              <Home />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <SuspenseWrapper>
              <About />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/about/:id"
          element={
            <SuspenseWrapper>
              <Detail />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <SuspenseWrapper>
              <Contact />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/example"
          element={
            <SuspenseWrapper>
              <Example />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/artikel"
          element={
            <SuspenseWrapper>
              <ArticleViewer />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/keranjang"
          element={
            <SuspenseWrapper>
              <Keranjang />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/product"
          element={
            <SuspenseWrapper>
              <Product />
            </SuspenseWrapper>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
