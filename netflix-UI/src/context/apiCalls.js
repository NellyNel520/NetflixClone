/* eslint-disable no-useless-catch */

import axios from 'axios'
import { MONGO_DB_BASE_URL } from '../utils/constants'

export const registerUser = async (data) => {
	try {
		const res = await axios.post(`${MONGO_DB_BASE_URL}/user/register`, data)
		return res.data
	} catch (error) {
		throw error
	}
}
