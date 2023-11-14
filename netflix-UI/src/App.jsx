import './App.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
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
					element={currentUser ? <Home  /> : <Navigate to={'/signup'} />}
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
			
			</Routes>
		</BrowserRouter>
	)
}

export default App
