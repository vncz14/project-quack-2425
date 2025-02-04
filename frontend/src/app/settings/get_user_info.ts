'use server'
export const get_user_info = async () => {
    const { cookies } = await import('next/headers')
    const user_cookie = (await cookies()).get('user')!.value
    return JSON.parse(user_cookie)
}