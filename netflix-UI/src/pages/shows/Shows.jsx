import './shows.scss'
import Navbar from '../../components/navbar/Navbar'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGenres, fetchShows, getAllUsers, getSavedList } from '../../store'
import ShowsLists from '../../components/listContainer/ShowsLists'
import Featured from '../../components/featured/Featured'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


const Shows = () => {
  const shows = useSelector((state) => state.netflix.shows)
	const genres = useSelector((state) => state.netflix.genres)
	const genresLoaded = useSelector((state) => state.netflix.genresLoaded)
  const { currentUser } = useContext(AuthContext)
	const email = currentUser.email

  const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getGenres())
    dispatch(getAllUsers())
	}, [])

	useEffect(() => {
		if (genresLoaded) {
			dispatch(fetchShows({ genres, type: 'tv' }))
      dispatch(getSavedList({ email}))
		}
	}, [dispatch, genres, genresLoaded, email])
  return (
    <div className="movies"> 
    <Navbar />

    <Featured type="tv" genres={genres} itemList={shows} i={5} />

    <div className="listContainer">
      <ShowsLists shows={shows} />
    </div>
  </div>
  )
}

export default Shows