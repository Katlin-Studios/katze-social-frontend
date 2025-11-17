import { API_URL } from "@/env/env.example";

export async function apiGet(path: string) {
    try {
        console.log(`Getting API data from ${API_URL}${path}`);
        const res = await fetch(`${API_URL}${path}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export default { apiGet }