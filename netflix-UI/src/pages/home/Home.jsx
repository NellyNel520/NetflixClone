import './home.scss'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGenres } from '../../store'
import Navbar from '../../components/navbar/Navbar'
const Home = () => {
 


  
  return (
    <div className='home'>
      <Navbar />
    </div>
  )
}

export default Home