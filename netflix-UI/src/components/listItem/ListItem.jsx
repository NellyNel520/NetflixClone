/* eslint-disable react/prop-types */
import './listItem.scss'
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

const ListItem = ({ index, movie, type }) => {
  const [isHovered, setIsHovered] = useState(false)
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const navigate = useNavigate()
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email
  
	// const [videoId, setVideoId] = useState('')
	// const [runtime, setRuntime] = useState('')
	// const [releaseDates, setReleaseDates] = useState([])

	// const dispatch = useDispatch()
	// const savedList = useSelector((state) => state.netflix.savedList)
	// const [isSaved, setIsSaved] = useState(false)
	// console.log(savedList)
  return (
    <div
			className="listItem"
			style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{!isHovered ? (
				<img src={`${BASE_URL}/${movie.image}`} alt="movie cover" />
			) : null}

			{isHovered && (
				<div>
					{/* {videoId ? (
						<YouTube
							videoId={videoId}
							opts={{
								height: '140px',
								width: '325px',
								playerVars: { autoplay: 1, mute: 1 },
							}}
						/>
					) : (
						<img
							src={`${BASE_URL}/${movie.image}`}
							alt="movie cover"
							// onClick={() =>
							// 	navigate('/watch', {
							// 		state: { videoId: videoId, movie: movie },
							// 	})
							// }
						/>
					)} */}
          <img
							src={`${BASE_URL}/${movie.image}`}
							alt="movie cover"
							// onClick={() =>
							// 	navigate('/watch', {
							// 		state: { videoId: videoId, movie: movie },
							// 	})
							// }
						/>
					<div className="itemInfo">
						<p>{movie.name}</p>

						<div className="icons">
							<div>
								<PlayArrowIcon
									className="icon"
									// onClick={() =>
									// 	navigate('/watch', {
									// 		state: { videoId: videoId, movie: movie },
									// 	})
									// }
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

						<div className="itemInfoTop">
							{/* {rating ? (
								<span className="limit">{rating}</span>
							) : (
								<span className="limit">NR</span>
							)} */}
              <span className="limit">NR</span>

							{/* <span className="time">
								{runtime > 60 ? `${hours}h ${mins}m` : `${runtime}m`}
							</span> */}

							<span className="limit">4K</span>
						</div>

						<div className="genre">
							{movie.genres.map((name) => (
								// eslint-disable-next-line react/jsx-key
								<span className="test">{name}</span>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
  )
}

export default ListItem