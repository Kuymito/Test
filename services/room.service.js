// src/services/room.service.js
import axios from 'axios';
import { getSession } from 'next-auth/react';

// The API endpoint provided by the user.
const API_BASE_URL = 'https://jaybird-new-previously.ngrok-free.app/api/v1';

/**
 * A helper function to get auth headers.
 * It dynamically gets the token from the session.
 * @returns {Promise<Object>} An object containing the necessary headers for an authenticated API request.
 */
const getAuthHeaders = async () => {
    // Using getSession is a robust way to get the token on the client-side.
    const session = await getSession();
    const token = session?.accessToken;

    if (!token) {
        console.warn('Authentication token not found in session.');
    }

    return {
        'Content-Type': 'application/json',
        'accept': '*/*',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        'ngrok-skip-browser-warning': 'true'
    };
};

/**
 * A generic response handler to process the API response.
 * @param {import('axios').AxiosResponse} response - The Axios response object.
 * @returns {any} The payload from the API response.
 * @throws {Error} Throws an error if the response is not OK or if the payload is missing.
 */
const handleResponse = (response) => {
    // Check for a successful status code (2xx)
    if (response.status >= 200 && response.status < 300) {
        // The API wraps the data in a 'payload' object
        if (response.data && response.data.payload) {
            return response.data.payload;
        }
        // Handle successful but empty responses, like a 204 No Content
        if (response.status === 204) {
            return null;
        }
        // If the payload is missing in a successful response, it's an unexpected structure
        throw new Error('Response payload is missing or invalid.');
    }
    // For non-2xx responses, create an error with the API's message
    const errorData = response.data || { message: 'An unknown error occurred' };
    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
};

/**
 * Fetches all rooms and their schedules from the API.
 * This can be used on the client-side. For server-side, pass the token manually.
 * @param {string} [token] - Optional token for server-side calls.
 * @returns {Promise<Array>} A promise that resolves to an array of room objects.
 */
export const getAllRooms = async (token) => {
    try {
        const headers = token ? 
            { 'Authorization': `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true', 'Content-Type': 'application/json' } : 
            await getAuthHeaders();
            
        const response = await axios.get(`${API_BASE_URL}/room`, { headers });
        return handleResponse(response);
    } catch (error) {
        console.error("getAllRooms service error:", error.message);
        throw error;
    }
};

/**
 * Updates a room's details via a PATCH request.
 * @param {string|number} roomId - The ID of the room to update.
 * @param {object} roomUpdateDto - An object with the fields to update (e.g., { roomName: "New Name" }).
 * @returns {Promise<any>} A promise that resolves to the API response payload.
 */
export const updateRoom = async (roomId, roomUpdateDto) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.patch(`${API_BASE_URL}/room/${roomId}`, roomUpdateDto, { headers });
        return handleResponse(response);
    } catch (error) {
        console.error(`updateRoom service error for room ${roomId}:`, error.message);
        throw error;
    }
};
