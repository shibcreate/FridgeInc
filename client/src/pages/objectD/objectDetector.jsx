import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const ObjectDetectorContainer = styled.div`
  position: relative;
`;

const TargetImg = styled.img`
  max-width: 100%;
`;

const TargetBox = styled.div`
  position: absolute;
  left: ${({ x, imageWidth }) => (x / imageWidth) * 100 + "%"};
  top: ${({ y, imageHeight }) => (y / imageHeight) * 100 + "%"};
  width: ${({ width, imageWidth }) => (width / imageWidth) * 100 + "%"};
  height: ${({ height, imageHeight }) => (height / imageHeight) * 100 + "%"};
  border: 2px solid #1ac71a;
  background-color: transparent;
  z-index: 1;
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  background-color: #1ac71a;
  color: white;
  padding: 2px 4px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 2px;
  margin-left: 4px;
`;

export function ObjectDetector({ image }) {
  const imageRef = useRef();
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const detectObjectsOnImage = async () => {
      const model = await cocoSsd.load();
      const predictions = await model.detect(imageRef.current);
      setPredictions(predictions);
    };

    if (imageRef.current && image) {
      detectObjectsOnImage();
    }
  }, [image]);

  return (
    <ObjectDetectorContainer>
      {image && <TargetImg src={image} ref={imageRef} />}
      {predictions.map((prediction, idx) => (
        <TargetBox
          key={idx}
          x={prediction.bbox[0]}
          y={prediction.bbox[1]}
          width={prediction.bbox[2]}
          height={prediction.bbox[3]}
          imageWidth={imageRef.current ? imageRef.current.width : 1} // Default to 1 to avoid division by zero
          imageHeight={imageRef.current ? imageRef.current.height : 1}
        >
          {prediction.class} - {Math.round(prediction.score * 100)}%
          <Label>{prediction.class}</Label>
        </TargetBox>
      ))}
    </ObjectDetectorContainer>
  );
}
