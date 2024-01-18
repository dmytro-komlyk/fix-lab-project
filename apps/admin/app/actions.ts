'use server'

import { cookies } from 'next/headers'

// cookies().set('name', 'lee', { secure: true })
// or
// cookies().set({
//   name: 'name',
//   value: 'lee',
//   httpOnly: true,
//   path: '/',
// })

export const setCookie = async (key: string, value: string) => {
  cookies().set(key, value)
}

export const deleteCookie = async (key: string) => {
  cookies().delete(key)
}
