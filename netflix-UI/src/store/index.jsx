import {
	configureStore,
	createAsyncThunk,
	createSlice,
	current,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { API_KEY, TMDB_BASE_URL } from '../utils/constants'

const initialState = {
	genres: [],
	genresLoaded: false,
	movies: [],
	shows: []
}

export const getGenres = createAsyncThunk('netflix/genres', async () => {
	const {
		data: { genres },
	} = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
	return genres
})

const createArrayFromRawData = (array, moviesArray, genres) => {
	array.forEach((movie) => {
		const movieGenres = []
		movie.genre_ids.forEach((genre) => {
			const name = genres.find(({ id }) => id === genre)
			if (name) movieGenres.push(name.name)
		})
		if (movie.backdrop_path)
			moviesArray.push({
				id: movie.id,
				name: movie?.original_name ? movie.original_name : movie.original_title,
				image: movie.backdrop_path,
				genres: movieGenres.slice(0, 3),
				poster: movie.poster_path,
				overview: movie.overview,
				releaseDate: movie.first_air_date,
				userRating: movie.vote_average,
			})
	})
}

const getRawData = async (api, genres, paging = false) => {
	const moviesArray = []
	for (let i = 1; moviesArray.length < 100 && i < 10; i++) {
		const {
			data: { results },
		} = await axios.get(`${api}${paging ? `&page=${i}` : ''}`)
		createArrayFromRawData(results, moviesArray, genres)
	}
	return moviesArray
}

export const fetchMovies = createAsyncThunk(
	'netflix/trendingMovies',
	async ({ type }, thunkAPI) => {
		const {
			netflix: { genres },
		} = thunkAPI.getState()
		return getRawData(
			`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
			genres,
			true
		)
	}
)

export const fetchShows = createAsyncThunk(
	'netflix/trendingShows',
	async ({ type }, thunkAPI) => {
		const {
			netflix: { genres },
		} = thunkAPI.getState()
		return getRawData(
			`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
			genres,
			true
		)
	}
)

// function getExtraMovieInfo (movie state) w/ movie array


const NetflixSlice = createSlice({
	name: 'Netflix',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(getGenres.fulfilled, (state, action) => {
			state.genres = action.payload
			state.genresLoaded = true
		})
		builder.addCase(fetchMovies.fulfilled, (state, action) => {
			state.movies = action.payload
		})
		builder.addCase(fetchShows.fulfilled, (state, action) => {
			state.shows = action.payload
		})
		
	},
})

export const store = configureStore({
	reducer: {
		netflix: NetflixSlice.reducer,
	},
})

export const { setGenres, setMovies } = NetflixSlice.actions
