import React, { useEffect, useState } from 'react';
import db from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { CalendarData } from './types'; 

interface DocumentFetcherProps {
    documentId: string;
}

const DocumentFetcher: React.FC<DocumentFetcherProps> = ({ documentId }) => {
    const [documentData, setDocumentData] = useState<CalendarData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "user calendars", documentId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDocumentData(docSnap.data() as CalendarData);
                } else {
                    setError("Document not found");
                }
            } catch (err) {
                setError("Error fetching document: " + (err as Error).message);
            }
            setLoading(false);
        };

        fetchData();
    }, [documentId]); 

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!documentData) return <p>No data available</p>;

    return (
        <div>
            <h1>Document Data</h1>
            <pre>{JSON.stringify(documentData, null, 2)}</pre>
        </div>
    );
};

export default DocumentFetcher;
