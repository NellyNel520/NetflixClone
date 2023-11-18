import './home.scss'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {
	getGenres,
	fetchMovies,
	fetchShows,
	getAllUsers,
	getSavedList,
} from '../../store'
// components
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import HomeLists from '../../components/listContainer/HomeLists'

const Home = () => {
	const genres = useSelector((state) => state.netflix.genres)
	const movies = useSelector((state) => state.netflix.movies)
	const shows = useSelector((state) => state.netflix.shows)
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email
	const genresLoaded = useSelector((state) => state.netflix.genresLoaded)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getGenres())
		dispatch(getAllUsers())
	}, [])

	useEffect(() => {
		if (genresLoaded) {
			dispatch(fetchMovies({ genres, type: 'movie' }))
			dispatch(fetchShows({ genres, type: 'tv' }))
			dispatch(getSavedList({ email }))
		}
	}, [genres, dispatch, email, genresLoaded])

	return (
		<div className="home">
			<Navbar />
			<Featured genres={genres} itemList={movies} i={4} />
			<div className="listContainer">
				<HomeLists movies={movies} shows={shows} />
			</div>
		</div>
	)
}

export default Home
