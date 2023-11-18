import {
	configureStore,
	createAsyncThunk,
	createSlice,
	current,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { API_KEY, TMDB_BASE_URL, MONGO_DB_BASE_URL } from '../utils/constants'

const initialState = {
	genres: [],
	genresLoaded: false,
	movies: [],
	shows: [],
	users: [],
	savedList: [],
	savedListLoaded: false,
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

export const fetchMoviesByGenre = createAsyncThunk(
	'netflix/moviesByGenre',
	async ({ genre, type }, thunkAPI) => {
		const {
			netflix: { genres },
		} = thunkAPI.getState()
		return getRawData(
			`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
			genres
		)
	}
)

export const fetchShowsByGenre = createAsyncThunk(
	'netflix/showsByGenre',
	async ({ genre, type }, thunkAPI) => {
		const {
			netflix: { genres },
		} = thunkAPI.getState()
		return getRawData(
			`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
			genres
		)
	}
)

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

export const getAllUsers = createAsyncThunk('netflix/users', async () => {
	const {
		data: { users },
	} = await axios.get(`${MONGO_DB_BASE_URL}/user/all-users`)
	return users
})

const getUserData = async (api, users, email) => {
	let user = users.find((o) => o.email === email)
		let id = user._id
		const {
			data: { savedList },
		} = await axios.get(`${api}/${id}`)
	
	return savedList
}



export const getSavedList = createAsyncThunk(
	'netflix/saved-list',
	async ({ email }, thunkAPI) => {
		const {
						netflix: { users },
					} = thunkAPI.getState()
					return getUserData(
						`${MONGO_DB_BASE_URL}/user/savedList`,
						users,
						email,
						true
					)
	}
) 

// export const getSavedList = createAsyncThunk(
// 	'netflix/saved-list',
// 	async ({ users, email }) => {
// 		let user = users.find((o) => o.email === email)
// 		let id = user._id
// 		const {
// 			data: { savedList },
// 		} = await axios.get(`${MONGO_DB_BASE_URL}/user/savedList/${id}`)
// 		return savedList
// 	}
// ) 



export const removeMovieFromLiked = createAsyncThunk(
	'netflix/deleteLiked',
	async ({ email, movieId }) => {
		const {
			data: { savedList },
		} = await axios.put(`${MONGO_DB_BASE_URL}/user/remove`, {
			email,
			movieId,
		})
		return savedList
	}
)

export const removeMovieFromSavedScreen = createAsyncThunk(
	'netflix/deleteSaved',
	async ({ email, movieId }) => {
		const {
			data: { savedList },
		} = await axios.put(`${MONGO_DB_BASE_URL}/user/remove`, {
			email,
			movieId,
		})
		return savedList
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
		builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
			state.movies = action.payload
		})
		builder.addCase(fetchShowsByGenre.fulfilled, (state, action) => {
			state.shows = action.payload
		})
		builder.addCase(getAllUsers.fulfilled, (state, action) => {
			state.users = action.payload
			state.usersLoaded = true
		})
		builder.addCase(getSavedList.fulfilled, (state, action) => {
			state.savedList = action.payload
			state.savedListLoaded = true
		})
		builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
			// state.savedList = action.payload
			state.savedList.splice(
				state.savedList.findIndex((item) => item.id === action.payload),
				1
			)
		})
	},
})

export const store = configureStore({
	reducer: {
		netflix: NetflixSlice.reducer,
	},
})

export const { setGenres, setMovies } = NetflixSlice.actions
