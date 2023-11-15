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
	logo: '',
	// shows: [],
	// users: [],
	// activeUser: {},
	// savedList: [],
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

const setExtraInfo = (id, response) => {
	const runtime = response.data.runtime
	let ratings = response.data.release_dates.results
	let ratingsByCountry = ratings.filter(function (item) {
		return item.iso_3166_1 === 'US'
	})
	const contentRating = ratingsByCountry[0]?.release_dates[0]?.certification
	return { id, runtime: runtime, contentRating: contentRating }
}

export const getExtraMovieInfo = createAsyncThunk(
	'netflix/movieInfo',
	async (id) => {
		const {
			data: { response },
		} = await axios.get(
			`${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=release_dates`
		)
		setExtraInfo(id, response)
		return response
	}
)

export const getFeaturedLogo = createAsyncThunk('netflix/ft-logo', 
async({type, id}) => {
	const {
		data: { logo },
	} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=1b3318f6cac22f830b1d690422391493&include_image_language=en
	`)
	return logo
}
)

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
		builder.addCase(getExtraMovieInfo.fulfilled, (state, action) => {
			const { id, runtime, contentRating } = action.payload
			const movieIndex = state.movies.findIndex((movie) => movie.id === id)

			state.movies[movieIndex] = {
				...state.movies[movieIndex],
				runtime,
				contentRating,
			}
		})
		builder.addCase(getFeaturedLogo.fulfilled, (state, action) => {
			state.logo = action.payload
		})
	},
})

export const store = configureStore({
	reducer: {
		netflix: NetflixSlice.reducer,
	},
})

export const { setGenres, setMovies } = NetflixSlice.actions
