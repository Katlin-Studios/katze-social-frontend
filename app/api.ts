import { API_URL } from "@/env/env.example"

export async function apiGet(path: string) {
    try {
        console.log(`Getting API data from ${API_URL}${path}`)
        const res = await fetch(`${API_URL}${path}`)
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function fetchAllThreads(secureLock: boolean) {
    if (secureLock) {
        try {
            const data = await apiGet(`/threads`)
            const threads = await data.threads
            return threads
        } catch (err: any) {
            console.error(err)
            throw err
        }
    }
}

export async function fetchThread(threadId: string) {
    try {
        const res = await apiGet(`/threads/${threadId}`)
        const thread = await res.thread
        return thread
    } catch (err: any) {
        console.error(err)
        throw err
    }
}

export async function getUserData(userId: string) {
    try {
        const res = await apiGet(`/users/${userId}`)
        const userData = await res.user
        return userData
    } catch (err: any) {
        console.error(err)
        throw err
    }
}