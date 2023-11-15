import './home.scss'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	getGenres,
	fetchMovies,
	fetchShows
} from '../../store'
// components
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import HomeLists from '../../components/listContainer/HomeLists'

const Home = () => {
	const genres = useSelector((state) => state.netflix.genres)
	const movies = useSelector((state) => state.netflix.movies)
	const shows = useSelector((state) => state.netflix.shows)
	// const logo = useSelector((state) => state.netflix.logo)
	// const [featuredLogo, setFeaturedLogo] = useState({})

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getGenres())
	}, [])

	// console.log(genres)

	useEffect(() => {
		// if (genresLoaded) {
		dispatch(fetchMovies({ genres, type: 'movie' }))
		dispatch(fetchShows({ genres, type: 'tv' }))
		// dispatch(getHomeLogo())
		// }
	}, [genres, dispatch])

	// const featured = movies[4].id

	// console.log(featured)

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
