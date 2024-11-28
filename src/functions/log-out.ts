import { deleteCookie } from 'cookies-next/client'

export async function logoutUser() {
	deleteCookie('@sunlight-admin:username')
	deleteCookie('@sunlight-admin:name')
}
