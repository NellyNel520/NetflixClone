
import axios from 'axios'
import { MONGO_DB_BASE_URL } from '../utils/constants'

// const BASE_URL = 'http://localhost:3001/api'

export const registerUser = async (data) => {
	
	// try {
		const res = await axios.post(`http://localhost:3001/api/user/register`, data)
		return res.data
	// } catch (error) {
	// 	throw error
	// }

} 