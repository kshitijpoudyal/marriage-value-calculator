import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import {createWorker} from "tesseract.js";

interface CardIdentifierProps {
    capturedImage: string;
    handleAfterProcessing: () => void;
}

const CardIdentifier: React.FC<CardIdentifierProps> = ({ capturedImage, handleAfterProcessing}) => {
    const [predictions, setPredictions] = useState<cocoSsd.DetectedObject[]>([]);
    const [recognizedText, setRecognizedText] = useState('');
    const worker = createWorker({
        logger: (m) => console.log(m),
    });

    useEffect(() => {
        const identifyCard = async () => {
            // Set the backend to "webgl"
            await tf.setBackend('webgl');

            const model = await cocoSsd.load();
            const imageElement = document.createElement('img');
            imageElement.src = capturedImage || '';
            const cardPredictions = await model.detect(imageElement);
            setPredictions(cardPredictions);
        };

        const recognizeCard = async () => {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const { data: { text } } = await worker.recognize(capturedImage);
            setRecognizedText(text);
            await worker.terminate();
        };

        if (capturedImage) {
            recognizeCard().then().finally(() => {
                    handleAfterProcessing();
                })
            // identifyCard().then().finally(() => {
            //     handleAfterProcessing();
            // })
        }
    }, [capturedImage]);

    return (
        <div>
            <h2>Identified Cards:</h2>
            <p>Recognized Text: {recognizedText}</p>
            {/*<ul>*/}
            {/*    {predictions.map((prediction, index) => (*/}
            {/*        <li key={index}>{prediction.class}</li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    );
};

export default CardIdentifier;
