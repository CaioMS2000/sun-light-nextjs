import { NAME_COOKIE, USERNAME_COOKIE } from '@/constants/cookies'
import { deleteCookie } from 'cookies-next/client'

export async function logoutUser() {
	deleteCookie(USERNAME_COOKIE)
	deleteCookie(NAME_COOKIE)
}
