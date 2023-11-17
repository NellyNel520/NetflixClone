import './home.scss'
import { useState, useEffect } from 'react'
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
	const users = useSelector((state) => state.netflix.users)
	const savedList = useSelector((state) => state.netflix.savedList)
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email
	// const logo = useSelector((state) => state.netflix.logo)
	// const [featuredLogo, setFeaturedLogo] = useState({})

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getGenres())
		dispatch(getAllUsers())
	}, [])

	// console.log(users)

	useEffect(() => {
		// if (genresLoaded) {
		dispatch(fetchMovies({ genres, type: 'movie' }))
		dispatch(fetchShows({ genres, type: 'tv' }))
		dispatch(getSavedList({ users, email }))
		// }
	}, [genres, dispatch])

	// const featured = movies[4].id

	console.log(savedList)

	// useEffect(() => (
	//   dispatch(getFeaturedLogo({ type: 'movie', featured }))
	// ))
	// console.log(logo)

	// useEffect(() => {
	//   movies.forEach((movie) => {
	//     dispatch(getExtraMovieInfo(movie.id))
	//   })
	// }, [movies, dispatch])

	// console.log(movies)

	return (
		<div className="home">
			<Navbar />
			<Featured genres={genres} itemList={movies} i={4} />
			<div className="listContainer">
				<HomeLists
					movies={movies}
					shows={shows}
				/>
			</div>
		</div>
	)
}

export default Home
