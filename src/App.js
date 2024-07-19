import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useauthContext';
import { Navbar } from './components/Navbar';
import { About } from './pages/About';
import { Create } from './pages/Create';
import { Error } from './pages/Error'
import { Details } from './pages/Details';
import { Home, dataLoader } from './pages/home';
import { Blogs, myblogLoader } from './pages/blogs';
import Signup from './pages/register';
import Login from './pages/login';
import { Update } from './pages/update';
import Navbar2 from './components/Navbar2';
import useScreenSize from './hooks/useScreensize';
import { ToastContainer } from 'react-toastify';
import LoginFirst from './components/notify';
import { useState, useEffect } from 'react';
import LoaderSpinner from './components/Loader';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const { user, authIsReady } = useAuthContext()
 
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  

  if (isLoading) {
    return <LoaderSpinner isPage={false} />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route path='/myblogs' index element={<Blogs />} loader={myblogLoader} errorElement={<Error />} />
        <Route path='/' element={!user ? <LoginFirst /> : <Home />} loader={dataLoader} errorElement={<Error />} />
        <Route path='/blogs/:id' index element={<Details />} errorElement={<Error />} />
        <Route path='/about' element={<About />} errorElement={<Error />} />
        <Route path='/blogs/create' element={user ? <Create /> : <Navigate to="/blogs/login" />} errorElement={<Error />} />
        <Route path='/blogs/update/:id' element={<Update />} errorElement={<Error />} />
        <Route path='/blogs/signup' element={!user ? <Signup /> : <Navigate to="/" />} errorElement={<Error />} />
        <Route path='/blogs/login' element={!user ? <Login /> : <Navigate to="/" />} errorElement={<Error />} />
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
  const isSmallScreen = useScreenSize(768);
  return (
    <>
      <div style={{ display: "flex" }}>
        {isSmallScreen ? <Navbar2 /> : <Navbar />}
        <Outlet />
        <ToastContainer />
      </div>
    </>
  )
}
export default App;