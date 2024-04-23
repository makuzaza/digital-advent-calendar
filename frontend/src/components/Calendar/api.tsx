import axios from 'axios';

interface Calendar {
    id: string;
    title: string;
    description: string;
} 

const BASE_URL = 'http://localhost:8000/firestore/calendars';

export const getCalendars = async (): Promise<Calendar[]> => {
    try {
        const response = await axios.get<Calendar[]>(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching calendars:', error);
        return [];
    }
};

export const getCalendarById = async (calendarId: string): Promise<Calendar | null> => {
     calendarId = 'P8jprEf4R23OJSQXmjrN';
    try {
        const response = await axios.get<Calendar>(`${BASE_URL}/${calendarId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching calendar with ID ${calendarId}:`, error);
        return null;
    }
};
