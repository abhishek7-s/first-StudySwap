import React , {useState , useEffect} from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login , logout} from './store/authSlice'
import {Header , Footer} from './components'
import loader from './assets/loader.svg'
import { Outlet } from 'react-router-dom'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL); //accessing environmet variables using vite framework

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()


  useEffect(() => {
      authService.getCurrentUser()
      .then((userData)=>{
        if (userData) {
          // console.log("got userData");
          // console.log(userData.$id);
          dispatch(login(userData))
          // dispatch(userData.$id)
        }
        else{
          dispatch(logout())
        }
      })
      .finally(()=> setLoading(false))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


   if(loading){
    return (
      <div className='min-h-screen flex flex-wrap justify-center items-center bg-slate-900 text-teal-50'>
        <div className='block'>
              <main>
                  {/* <h1>Loading Creating Blogging Website</h1> */}
                  <img src={loader} className='h-36 w-32'></img>
              </main>
        </div>
      </div>
    )
  }
  else{
    return (
      <div className='min-h-screen flex flex-wrap flex-col bg-slate-900 text-teal-50'>
        <div className='w-full h-full'>
          <Header/>
              <main className='w-full bg-slate-900'>
                  <Outlet/>
                  {/* <h1 className=''>Creating Blogging Website</h1> */}
              </main>
          <Footer/>
        </div>
      </div>
    )
  }
  
}

export default App
