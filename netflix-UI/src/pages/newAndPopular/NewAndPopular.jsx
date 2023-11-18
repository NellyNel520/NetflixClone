import './newAndPopular.scss'
import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import NewAndPopLists from '../../components/listContainer/NewAndPopLists'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies, getGenres, fetchShows } from '../../store'

const NewAndPopular = () => {
	const movies = useSelector((state) => state.netflix.movies)
	const shows = useSelector((state) => state.netflix.shows)
	const genres = useSelector((state) => state.netflix.genres)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getGenres())
	}, [])

	useEffect(() => {
		dispatch(fetchMovies({ genres, type: 'movie' }))
		dispatch(fetchShows({ genres, type: 'tv' }))
	}, [])

	return (
		<div className="newPop">
			<Navbar />

			<div className="listContainer">
				<NewAndPopLists movies={movies} shows={shows} />
			</div>
		</div>
	)
}

export default NewAndPopular
