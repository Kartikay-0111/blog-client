import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useauthContext';
import { Navbar } from './components/Navbar';
import { About } from './pages/About';
import { Create } from './pages/Create';
// import { Footer } from './components/Footer';
import { Error } from './pages/Error'
import { Details } from './pages/Details';
import { Home, dataLoader } from './pages/home';
import { Blogs, myblogLoader } from './pages/blogs';
import Signup from './pages/register';
import Login from './pages/login';
import { Update } from './pages/update';

function App() {
  const { user } = useAuthContext()
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route path='/myblogs' index element={<Blogs />} loader={myblogLoader} errorElement={<Error />} />
        <Route path='/' element={!user ? <Navigate to="/blogs/login" /> : <Home />} loader={dataLoader} errorElement={<Error />} />
        <Route path='/blogs/:id' index element={<Details />} errorElement={<Error />} />
        <Route path='/about' element={<About />} errorElement={<Error />} />
        <Route path='/blogs/create' element={<Create />} errorElement={<Error />} />
        <Route path='/blogs/update/:id' element={<Update />} errorElement={<Error />} />
        <Route path='/blogs/signup' element={!user ? <Signup /> : <Navigate to="/myblogs" />} errorElement={<Error />} />
        <Route path='/blogs/login' element={!user ? <Login /> : <Navigate to="/myblogs" />} errorElement={<Error />} />
      </Route>
    )
  )

  return (
    <div className="App ">
      <RouterProvider router={router} />
    </div>
  );
}
const Root = () => {
  return (
    <>
      <div style={{display:"grid",gridTemplateColumns:"23% auto"}}>
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}
export default App;