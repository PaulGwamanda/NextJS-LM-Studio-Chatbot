// api.js
import { setApiResponse } from "./responseState";

const BASE_URL = 'http://localhost:1234/v1/chat/completions';
const API_KEY = '';

export const makeApiRequest = async (messages) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Api-Key ${API_KEY}`
            },
            body: JSON.stringify({
                messages,
                temperature: 0.7,
                max_tokens: -1,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setApiResponse(data); // Store the response

        // Adjust this based on your API response structure
        return data.choices[0]?.message?.content || 'Empty response';
    } catch (error) {
        console.error('Error during API request:', error);
        return 'Error occurred during API request.';
    }
};
