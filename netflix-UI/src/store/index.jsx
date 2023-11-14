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
	// movies: [],
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

const NetflixSlice = createSlice({
	name: 'Netflix',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(getGenres.fulfilled, (state, action) => {
			state.genres = action.payload
			state.genresLoaded = true
		})
		
	
	},
})

export const store = configureStore({
	reducer: {
		netflix: NetflixSlice.reducer,
	},
})

export const { setGenres, setMovies } = NetflixSlice.actions