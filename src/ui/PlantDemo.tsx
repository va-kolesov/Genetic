import React from "react";
import { Genome } from "../genetics/Genome";
import { Plant } from "../plant/Plant";
import PlantCanvas from "./PlantCanvas";
import "./PlantDemo.css";
import { resetRandom } from "../plant/Utils";

export default () => {
    const [genome, setGenome] = React.useState(Genome.getRandom());
    const [plant, setPlant] = React.useState(new Plant("test", genome));
    const [v, setV] = React.useState(0);
    const [anim, setAnim] = React.useState(false);

    let interval;

    React.useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval);
        };
    });

    function startTimer() {
        interval = setInterval(() => {
            if (anim) {
                plant.grow();
                setV(v + 1);
            }
        }, 200);
    }

    return (
        <div className="canvas-container">
            <PlantCanvas plant={plant} v={v} />
            <div className="button-container">
                <button
                    className="button"
                    onClick={() => {
                        const newGenome = Genome.getRandom();
                        setGenome(newGenome);
                        setPlant(new Plant("test", newGenome));
                        setAnim(false);
                        setV(0);
                    }}
                >
                    Сброс
                </button>
                <button
                    className="button"
                    onClick={() => {
                        resetRandom();
                        setPlant(new Plant("test", genome));
                        setAnim(false);
                        setV(0);
                    }}
                >
                    Перезапуск
                </button>
                <button
                    className="button"
                    onClick={() => {
                        plant.grow();
                        setV(v + 1);
                    }}
                >
                    Рост
                </button>
                <button
                    className="button"
                    onClick={() => {
                        setAnim(!anim);
                    }}
                >
                    Анимация
                </button>
            </div>
        </div>
    );
};
