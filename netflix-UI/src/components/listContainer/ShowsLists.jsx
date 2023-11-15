/* eslint-disable react/prop-types */
import React from 'react'
import List from '../../components/list/List'
import TrendingList from '../../components/trendingList/TrendingList'

const ShowsLists = ({shows}) => {
  const getShowsFromRange = (from, to) => {
		return shows.slice(from, to)
	}
  return (
    <div>
			<TrendingList
				data={getShowsFromRange(0, 10)}
				title="Top 10 Shows in the U.S. Today"
				type="tv"
			/>
			<List data={getShowsFromRange(41, 55)} title="Must Watch" />
			<List
				data={getShowsFromRange(11, 25)}
				type="tv"
				title="Binge Worthy"
			/>
			<List
				data={getShowsFromRange(26, 40)}
				type="tv"
				title="Popular on Netflix"
			/>
		</div>
  )
}

export default ShowsLists