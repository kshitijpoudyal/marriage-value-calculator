import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

interface CardIdentifierProps {
    capturedImage: string | null;
    handleAfterProcessing: () => void;
}

const CardIdentifier: React.FC<CardIdentifierProps> = ({ capturedImage, handleAfterProcessing}) => {
    const [predictions, setPredictions] = useState<cocoSsd.DetectedObject[]>([]);

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

        if (capturedImage) {
            identifyCard().then().finally(() => {
                handleAfterProcessing();
            })
        }
    }, [capturedImage]);

    return (
        <div>
            <h2>Identified Cards:</h2>
            <ul>
                {predictions.map((prediction, index) => (
                    <li key={index}>{prediction.class}</li>
                ))}
            </ul>
        </div>
    );
};

export default CardIdentifier;
