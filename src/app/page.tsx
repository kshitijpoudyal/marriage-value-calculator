"use client";
import {useState} from 'react';
import CardIdentifier from "@/app/CardIdentifier";
import Camera from "@/app/Camera";
import {Card, CardType, UserCard, ValueCalculator} from './ValueCalculator';
import CardInputForm, {CardFormData} from "@/app/CardInputForm";

export default function Home() {
    const [ocr, setOcr] = useState('Capture image...');
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const handleCapture = (imageSrc: string | null) => {
        setCapturedImage(imageSrc);
    };

    const handleAfterProcessing= () => {
        setOcr(`Captured`);
    };

    const handleGettingCardDetails= (deckJoker: Card, userCards: UserCard[]) => {
        // const deckJoker: Card = {cardNumber: 10, cardType: CardType.HEART};
        const calculator: ValueCalculator = new ValueCalculator(deckJoker, userCards);
        setOcr(`Captured ${calculator.calculateUserValueCardsPoint()}`);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="App">
                <h1>Playing Card Identifier</h1>
                <pre>{ocr}</pre>
                <CardInputForm onSubmit={handleGettingCardDetails}/>
                {/*<Camera onCapture={handleCapture}/>*/}
                {/*<CardIdentifier*/}
                {/*    capturedImage={capturedImage}*/}
                {/*    handleAfterProcessing={handleAfterProcessing}/>*/}
            </div>
        </main>
    )
}
