import './myList.scss'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import { getSavedList, getAllUsers } from '../../store'
import Navbar from '../../components/navbar/Navbar'
import Card from '../../components/card/Card'

const MyList = () => {
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email
	const savedList = useSelector((state) => state.netflix.savedList)
	const usersLoaded = useSelector((state) => state.netflix.usersLoaded)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllUsers())
	}, [])

	useEffect(() => {
		if (usersLoaded) {
			dispatch(getSavedList({ email }))
		}
	}, [dispatch, usersLoaded, email])

	// console.log(savedList)
	return (
		<div className="container">
			<Navbar />

			<div className="content">
				<div className="title">
					<span>My List</span>
				</div>
				<div className="grid-cont">
					{savedList.length > 0 ? (
						<div className="grid">
							{savedList.map((movie, i) => {
								return <Card index={i} movie={movie} key={movie.id} />
							})}
						</div>
					) : (
						<div className="no-movies">
							<p>You haven't added any titles to your list yet.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default MyList
