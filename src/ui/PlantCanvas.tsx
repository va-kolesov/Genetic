import React, { useRef, useEffect } from 'react';
import { IPlant } from '../interface';

interface IProps {
    plant: IPlant;
  }
  
  const PlantCanvas: React.FC<IProps> = ({ plant, v ,w,h}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
  
      // очищаем canvas
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, w, h);
  
      // рисуем растение
      plant.draw(ctx);
    }, [plant, v]);
  
    return <canvas ref={canvasRef} width={w} height={h} />;
  };
  
  export default PlantCanvas;