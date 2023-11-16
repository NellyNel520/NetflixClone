import './App.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Movies from './pages/movies/Movies'
import Shows from './pages/shows/Shows'
import NewAndPopular from './pages/newAndPopular/NewAndPopular'
import Watch from './pages/watch/Watch'
import MyList from './pages/myList/MyList'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {
	const { currentUser } = useContext(AuthContext)
	// const { currentUser } = true
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					exact
					element={currentUser ? <Home /> : <Navigate to={'/signup'} />}
				/>
				<Route
					path="/signup"
					exact
					element={!currentUser ? <Signup /> : <Navigate to={'/'} />}
				/>
				<Route
					path="/login"
					exact
					element={!currentUser ? <Login /> : <Navigate to={'/'} />}
				/>
				<Route
					exact
					path="/movies"
					element={currentUser ? <Movies /> : <Navigate to={'/'} />}
				/>
				<Route
					exact
					path="/series"
					element={currentUser ? <Shows /> : <Navigate to={'/'} />}
				/>
				<Route
					exact
					path="/new"
					element={currentUser ? <NewAndPopular /> : <Navigate to={'/'} />}
				/>
				<Route
					exact
					path="/watch"
					element={currentUser ? <Watch /> : <Navigate to={'/'} />}
				/>
				<Route
					exact
					path="/myList"
					element={currentUser ? <MyList /> : <Navigate to={'/'} />}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
