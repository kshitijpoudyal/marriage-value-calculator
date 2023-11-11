import {useState} from "react";
import {createWorker} from "tesseract.js";

function CardRecognitionApp() {
    const [recognizedText, setRecognizedText] = useState('');
    const worker = createWorker({
        logger: (m) => console.log(m),
    });

    const recognizeCard = async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize('path-to-your-card-image.jpg');
        setRecognizedText(text);
        await worker.terminate();
    };

    return (
        <div>
            <h1>Playing Card Recognition App</h1>
            <button onClick={recognizeCard}>Recognize Card</button>
            <p>Recognized Text: {recognizedText}</p>
        </div>
    );
}

export default CardRecognitionApp;
