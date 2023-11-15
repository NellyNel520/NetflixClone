import './featured.scss'
import React, { useState, useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import axios from 'axios'


const Featured = ({ type, genres, itemList, i }) => {

  const BASE_URL = 'https://image.tmdb.org/t/p/original'
  const id = itemList[i]?.id
	const title = itemList[i]?.name
	const image = itemList[i]?.image
	const details = itemList[i]?.overview
	const detailsLength = itemList[i]?.overview.length

  const [itemLogo, setItemLogo] = useState({})

  useEffect(() => {
		if (type) {
			axios
				.get(
					`https://api.themoviedb.org/3/${type}/${id}/images?api_key=1b3318f6cac22f830b1d690422391493&include_image_language=en
			`
				)
				.then((response) => {
					// console.log(response.data.logos, 'logo line 28')
					setItemLogo(response.data.logos[0].file_path)
				})
			// .catch((error) => {
			// 	console.log(error)
			// })
		} else {
			axios
				.get(
					`https://api.themoviedb.org/3/movie/${id}/images?api_key=1b3318f6cac22f830b1d690422391493&include_image_language=en
			`
				)
				.then((response) => {
					// console.log(response.data.logos, 'logo line 37')
					setItemLogo(response.data.logos[0].file_path)
				})
			// .catch((error) => {
			// 	console.log(error)
			// })
		}
	})


  return (
  <div className="featured">
			{/* {type === 'movie' && <SelectGenre type={type} genres={genres} />} */}

			{/* {type === 'tv' && <SelectGenreShows type={type} genres={genres} />} */}

      {/* <img src='https://wallpapers.com/images/hd/vivo-movie-desktop-poster-yxw247ste4wik43s.jpg' alt="movie"  /> */}
			<img src={`${BASE_URL}/${image}`} alt="movie" />


			<div className="info">
				{/* <img src='https://www.themoviedb.org/t/p/original/AsoF5slprur9YMifq9vUci0xnSg.png' alt="movie logo" /> */}
				<img src={`${BASE_URL}/${itemLogo}`} alt="movie logo" />

				<span className="desc">
					{detailsLength > 150 ? `${details.substring(0, 180)}...` : details}
          {/* Parents need to know that Vivo is a touching animated musical about a one-of-a-kind singing kinkajou (voiced by Lin-Manuel Miranda) who has a great life in Havana with acclaimed aging bandleader Andrés (Cuban musician Juan de Marcos González) */}
				</span>
				<div className="buttons">
					<button
						className="play"
						// onClick={() =>
						// 	navigate('/watch', {
						// 		state: { videoId: videoId },
						// 	})
						// }
					>
						<PlayArrowIcon />
						<span>Play</span>
					</button>

					<button className="more">
						<InfoOutlinedIcon />
						<span>More Info</span>
					</button>
				</div>
			</div>
		</div>
  )
}

export default Featured