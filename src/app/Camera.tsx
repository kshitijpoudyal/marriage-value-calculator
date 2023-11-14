import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Image from "next/image";

interface CameraProps {
    onCapture: (imageSrc: string | null) => void;
}

const Camera: React.FC<CameraProps> = ({ onCapture }) => {
    const webcamRef = useRef<Webcam>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot() || null;
        setCapturedImage(imageSrc);
        onCapture(imageSrc);
    };

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ width: '50%', height: 'auto' }}
            />
            <button onClick={capture}>Capture</button>
            {capturedImage && <Image src={capturedImage} alt="Captured" width={500} height={650}/>}
        </div>
    );
};

export default Camera;
