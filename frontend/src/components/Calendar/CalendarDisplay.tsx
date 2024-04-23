import React, { useEffect, useState } from 'react';
import { getCalendars } from './api';

interface Calendar {
    id: string;
    title: string;
    description: string;
}

const CalendarDisplay: React.FC = () => {
    const [calendars, setCalendars] = useState<Calendar[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching data...');
            const loadedCalendars = await getCalendars();
            console.log('Calendars loaded:', loadedCalendars);
            setCalendars(loadedCalendars);
        };
    
        fetchData();
    }, []);

    if (calendars.length > 0) {
        console.log('Rendering calendars:', calendars);
    } else {
        console.log('No calendars to render.');
    }

    return (
        <div>
            <h1>Available Calendars</h1>
            {calendars.length > 0 ? (
                <ul>
                    {calendars.map(calendar => (
                        <li key={calendar.id}>  
                            {calendar.title} - {calendar.description}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No calendars available.</p>
            )}
        </div>
    );
};

export default CalendarDisplay;
