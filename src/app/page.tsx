"use client";
import {useState} from 'react';
import CardIdentifier from "@/app/CardIdentifier";
import Camera from "@/app/Camera";

export default function Home() {
    const [ocr, setOcr] = useState('Capture image...');
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const handleCapture = (imageSrc: string | null) => {
        setCapturedImage(imageSrc);
    };

    const handleAfterProcessing= () => {
        setOcr('Captured');
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="App">
                <h1>Playing Card Identifier</h1>
                <pre>{ocr}</pre>
                <Camera onCapture={handleCapture}/>
                <CardIdentifier
                    capturedImage={capturedImage}
                    handleAfterProcessing={handleAfterProcessing}/>
            </div>
        </main>
    )
}
