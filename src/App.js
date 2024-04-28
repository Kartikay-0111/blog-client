import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { About } from './pages/About';
import { Create } from './pages/Create';
import { Footer } from './components/Footer';
import {Error} from './pages/Error'
import { Details} from './pages/Details';
import { Home,dataLoader } from './pages/home';
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path='/blogs' index element={<Home  />} loader={dataLoader} errorElement={<Error/>} />
        <Route path='/' element={<Home  />} loader={dataLoader} errorElement={<Error/>} />
        <Route path='/blogs/:id' index element={<Details  />} errorElement={<Error/>} />
        <Route path='/about' element={<About />} errorElement={<Error/>} />
        <Route path='/blogs/create' element={<Create />} errorElement={<Error/>} />
      </Route>
    )
  )
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
const Root = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
export default App;