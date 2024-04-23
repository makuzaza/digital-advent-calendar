import React, { useEffect, useState } from 'react';
import db from './firebaseConfig';
import { doc, getDoc, DocumentData } from 'firebase/firestore';

interface Props {
    documentId: string;  
}

const DocumentFetcher: React.FC<Props> = ({ documentId }) => {
    const [documentData, setDocumentData] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "digital-calendars", documentId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDocumentData(docSnap.data());
                } else {
                    console.log("No such document!");
                    setError("Document not found");
                }
            } catch (err) {
                const error = err as Error; 
                console.error("Error fetching document:", error.message);
                setError(error.message);
            }
            setLoading(false);
        };

        fetchData();
    }, [documentId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Document Data</h1>
            <pre>{documentData ? JSON.stringify(documentData, null, 2) : 'No data available'}</pre>
        </div>
    );
};

export default DocumentFetcher;
