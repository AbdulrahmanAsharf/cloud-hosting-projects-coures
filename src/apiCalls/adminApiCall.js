import { DOMAIN } from "@/utils/constants";


// Get all comments
export async function getAllComments(token){
    const response = await fetch(`${DOMAIN}/api/comments`, {
        headers: {
            Cookie: `jwtToken=${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch comments");
    }

    return response.json();
}