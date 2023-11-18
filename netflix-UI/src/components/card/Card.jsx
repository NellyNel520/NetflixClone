/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import './card.scss'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import { removeMovieFromLiked } from '../../store'
// Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import CheckIcon from '@mui/icons-material/Check'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'

const Card = ({ movie, type }) => {
	const [isHovered, setIsHovered] = useState(false)
	const [videoId, setVideoId] = useState('')
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const navigate = useNavigate()
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email
	const savedList = useSelector((state) => state.netflix.savedList)

	const dispatch = useDispatch()

	useEffect(() => {
		const getMovieTrailer = async () => {
			if (type === 'movie') {
				await movieTrailer(movie.name, {
					id: true,
					multi: true,
				})
					.then((response) => setVideoId(response[1]))
					.catch((err) => console.log(err))
			} else {
				await movieTrailer(movie.name, {
					id: true,
					videoType: 'tv',
					multi: true,
				})
					.then((response) => setVideoId(response[1]))
					.catch((err) => console.log(err))
			}
		}

		getMovieTrailer()
	}, [movie, type, savedList])

	const removeFromList = async () => {
		try {
			dispatch(removeMovieFromLiked({ email, movieId: movie.id }))
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div
			className="card"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{!isHovered ? (
				<img src={`${BASE_URL}/${movie.image}`} alt="movie cover" />
			) : null}

			{isHovered && (
				<>
					{videoId ? (
						<YouTube
							videoId={videoId}
							opts={{
								height: '140px',
								width: '325px',
								playerVars: { autoplay: 1, mute: 1 },
							}}
						/>
					) : (
						<img src={`${BASE_URL}/${movie.image}`} alt="movie cover" />
					)}
					<div className="itemInfo">
						<p>{movie.name}</p>

						<div className="icons">
							<div>
								<PlayArrowIcon
									className="icon"
									onClick={() =>
										navigate('/watch', {
											state: { videoId: videoId, movie: movie },
										})
									}
								/>

								{/* ******************* on click remove from saved list mongo db *****************/}

								<CheckIcon
									className="icon"
									title="Already saved"
									onClick={removeFromList}
								/>

								<ThumbUpAltOutlinedIcon className="icon" />
							</div>
							<KeyboardArrowDownOutlinedIcon className="infoIcon" />
						</div>

						<div className="genre">
							{movie.genres.map((name) => (
								<span className="test">{name}</span>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Card
