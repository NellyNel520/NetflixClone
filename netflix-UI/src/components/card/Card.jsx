/* eslint-disable react/prop-types */
import './card.scss'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
// import { removeMovieFromLiked } from '../../store'
// Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
// import { MONGO_DB_BASE_URL } from '../../utils/constants'

const Card = ({ index, movie, genres, type}) => {
  const [isHovered, setIsHovered] = useState(false)
	const [videoId, setVideoId] = useState('')
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const navigate = useNavigate()
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email
	const dispatch = useDispatch()
	// const savedList = useSelector((state) => state.netflix.savedList)
	// const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
		const getMovieTrailer = async () => {
			if(type === 'movie') {
				await movieTrailer(movie.name, {
					id: true,
					multi: true,
				
				})
					.then((response) =>
						// console.log(response, 'herrrreeeee')
						setVideoId(response[1])
					)
					.catch((err) => console.log(err))
			} else {
				await movieTrailer(movie.name, {
					id: true,
					videoType: 'tv',
					multi: true,

				
				})
					.then((response) =>
						// console.log(response, 'herrrreeeee')
						setVideoId(response[1])
					)
					.catch((err) => console.log(err))
			}


			
		}

		getMovieTrailer()
	}, [movie, type])
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

								{/* ******************* on click add to my list mongo db *****************/}

								{/* {isSaved ? (
									<CheckIcon
										className="icon"
										title="Already saved"
										onClick={removeFromList}
									/>
								) : (
									<AddIcon
										className="icon"
										title="Add to my list"
										onClick={addToList}
									/>
								)} */}
                <CheckIcon
										className="icon"
										title="Already saved"
										// onClick={removeFromList}
									/>

								<ThumbUpAltOutlinedIcon className="icon" />
							</div>
							<KeyboardArrowDownOutlinedIcon className="infoIcon" />
						</div>

						{/* <div className="itemInfoTop">
							{rating ? (
								<span className="limit">{rating}</span>
							) : (
								<span className="limit">NR</span>
							)}

							<span className="time">
								{runtime > 60 ? `${hours}h ${mins}m` : `${runtime}m`}
							</span>

							<span className="limit">4K</span>
						</div> */}

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