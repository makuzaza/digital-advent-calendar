import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import db from './firebaseConfig';
import { CalendarData } from './types';

const CalendarDisplay = () => {
    const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCalendarData = async () => {
            const docRef = doc(db, 'all calendars', 'gqrvB59W4yUVmiBGvDJS9mkUqK72', 'user calendars', '487Kosq7vsRe6O8ptKoH');
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCalendarData(docSnap.data() as CalendarData);
                } else {
                    setError('No such document!');
                }
            } catch (error) {
                setError('Error getting document: ' + (error as Error).message);
            }
            setLoading(false);
        };

        fetchCalendarData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!calendarData) return <div>No Data Found</div>;

    return (
        <div>
            <h1 style={{
                fontFamily: calendarData.text.titleFont,
                fontSize: `${calendarData.text.titleFontSize}px`,
                color: calendarData.text.titleColor
            }}>
                {calendarData.text.title}
            </h1>
            <img style={{width: "50%"}} src={calendarData.image.imageUrl} alt="Calendar" />
            <p style={{
                fontFamily: calendarData.text.subtitleFont,
                fontSize: `${calendarData.text.subTitleFontSize}px`,
                color: calendarData.text.subtitleColor
            }}>
                {calendarData.text.subtitle}
            </p>
            {calendarData.sounds.musicName && (
                <audio src={calendarData.sounds.musicName} controls />
            )}
            <ul>
                {calendarData.windows.map((window, index) => (
                    <li key={index}>
                        {window}
                        {calendarData.windowsContent[index] && (
                            <div>
                                <p>{calendarData.windowsContent[index].text}</p>
                                {calendarData.windowsContent[index].videoURL && (
                                    <a href={calendarData.windowsContent[index].videoURL} target="_blank" rel="noopener noreferrer">
                                    Watch Video
                                </a>
                                
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CalendarDisplay;
