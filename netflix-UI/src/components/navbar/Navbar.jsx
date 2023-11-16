import './navbar.scss'
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from '../../utils/firebase'
// Icons
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import kidsLogo from '../../assets/netflixKids-logo.png'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
	const [showSearch, setShowSearch] = useState(false)
	const [inputHover, setInputHover] = useState(false)

  window.onscroll = () => {
		setIsScrolled(window.pageYOffset === 0 ? false : true)
		return () => (window.onscroll = null)
	}

  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
			<div className="container">
				<div className="left">
					<img
						alt=""
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
					/>
					<Link to={'/'} className="link">
						<span>Home</span>
					</Link>
					<Link to={'/movies'} className="link">
						<span>Movies</span>
					</Link>
					<Link to={'/series'} className="link">
						<span>TV Shows</span>
					</Link>
					<Link to={'/new'} className="link">
						<span>New & Popular</span>
					</Link>
					<Link to={'/myList'} className="link">
						<span>My List</span>
					</Link>
				</div>
				<div className="right">
					<div className={`search ${showSearch ? 'show-search' : ''}`}>
						<button
							onFocus={() => setShowSearch(true)}
							onBlur={() => {
								if (!inputHover) {
									setShowSearch(false)
								}
							}}
						>
							<SearchIcon className="icon" />
						</button>
						<input
							type="text"
							placeholder="Search"
							onMouseEnter={() => setInputHover(true)}
							onMouseLeave={() => setInputHover(false)}
							onBlur={() => {
								setShowSearch(false)
								setInputHover(false)
							}}
						/>
					</div>

					{/* <span>KIDS</span> */}
					<img className="kids" src={kidsLogo} alt="kids logo" />
					<NotificationsIcon className="icon" />
					<div className="user-icon">
						<img
							alt=""
							src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg"
						/>
						{/* <p>{username}</p> */}
            <p>NellyNel</p>
					</div>
					<div className="profile">
						<ArrowDropDownIcon className="icon" />
						<div className="options">
							<span>Settings</span>
							<span onClick={() => signOut(firebaseAuth)}>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default Navbar