/* eslint-disable react/prop-types */
import React from 'react'
import List from '../list/List'
// import ShowList from '../list/ShowList'
// import TrendingList from '../trendingList/TrendingList'
// import TrendingShowList from '../trendingList/TrendingShowList'

const HomeLists = ({ movies }) => {
	const getMoviesFromRange = (from, to) => {
		return movies.slice(from, to)
	}
	// const getShowsFromRange = (from, to) => {
	// 	return shows.slice(from, to)
	// }

	return ( 
		<div>
			<List
				data={getMoviesFromRange(11, 25)}
				type="movie"
				title="Continue Watching"
			/>
			{/* <TrendingList
				data={getMoviesFromRange(0, 10)}
				title="Top 10 Movies in the U.S. Today"
				type="movie"
			/> */}
			<List
				data={getMoviesFromRange(26, 40)}
				title="New Releases"
				type="movie"
			/>
			<List
				data={getMoviesFromRange(41, 55)}
				title="Action & Adventure"
				type="movie"
			/>
			{/* <TrendingShowList
				data={getShowsFromRange(0, 10)}
				title="Top 10 Shows in the U.S. Today"
				type="tv"
			/> */}
			<List data={getMoviesFromRange(41, 55)} title="Must Watch" />
			{/* <ShowList
				data={getShowsFromRange(11, 25)}
				type="tv"
				title="Binge Worthy"
			/>
			<ShowList
				data={getShowsFromRange(26, 40)}
				type="tv"
				title="Popular on Netflix"
			/> */}
		</div>
	)
}

export default HomeLists
