/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import './trendingItem.scss'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import { removeMovieFromLiked } from '../../store'
import { MONGO_DB_BASE_URL } from '../../utils/constants'
// Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import CheckIcon from '@mui/icons-material/Check'

const TrendingItem = ({ index, item, type }) => {
	const [isHovered, setIsHovered] = useState(false)
	const [videoId, setVideoId] = useState('')
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const savedList = useSelector((state) => state.netflix.savedList)
	const [isSaved, setIsSaved] = useState(false)

	useEffect(() => {
		const getMovieTrailer = async () => {
			if(type === 'movie') {
				await movieTrailer(item.name, {
					id: true,
					multi: true,
				
				})
					.then((response) =>
						// console.log(response, 'herrrreeeee')
						setVideoId(response[1])
					)
					.catch((err) => console.log(err))
			} else {
				await movieTrailer(item.name, {
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

		const isItemSaved = () => {
			try {
				let saved = savedList.find((o) => o.id === item.id)
				if (saved) {
					// setIsLiked(true)
					setIsSaved(true)
				}
			} catch (error) {
				console.log(error)
			}
		}

		getMovieTrailer()
		isItemSaved()
	}, [item, savedList, type])

	const addToList = async () => {
		try {
			await axios
				.post(`${MONGO_DB_BASE_URL}/user/add`, {
					email,
					data: item,
				})
				.then(() => setIsSaved(true))
		} catch (error) {
			console.log(error)
		}
	}

	const removeFromList = async () => {
		try {
			await dispatch(removeMovieFromLiked({ email, movieId: item.id}))
			setIsSaved(false)
			
		} catch (error) {
			console.log(error)
		} 
	}
	return (
		<div
			className="trendingListItem"
			style={{ left: isHovered && index * 385 - 50 + index * 2.5 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{!isHovered ? (
				<div className="list-position">
					<div className="orderNumber">{index + 1}</div>
					<img
						className="poster"
						src={`${BASE_URL}/${item.poster}`}
						alt="movie cover"
					/>
				</div>
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
						<img src={`${BASE_URL}/${item.image}`} alt="movie cover" />
					)}

					<div className="itemInfo">
						<p>{item.name}</p>
						<div className="icons">
							<div>
								<PlayArrowIcon
									className="icon"
									onClick={() =>
										navigate('/watch', {
											state: { videoId: videoId, movie: item },
										})
									}
								/>

								{isSaved ? (
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
								)}
               

								<ThumbUpAltOutlinedIcon className="icon" />
							</div>

							<KeyboardArrowDownOutlinedIcon className="infoIcon" />
						</div>


						<div className="genre">
							{item.genres.map((name) => (
								<span className="test">{name}</span>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default TrendingItem
