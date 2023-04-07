import React from "react";
import { Genome } from "../genetics/Genome";
import { Plant } from "../plant/Plant";
import PlantCanvas from "./PlantCanvas";
import "./PlantDemo.css";
import { resetRandom } from "../plant/Utils";

const W = 200;
const H = 300;

export default ({ exportGenome, getGenome }) => {
    const [genome, setGenome] = React.useState(Genome.getRandom());
    const [plant, setPlant] = React.useState(
        new Plant("test", genome, { x: W / 2, y: H })
    );
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
            <PlantCanvas plant={plant} v={v} w={W} h={H} />
            <div className="button-container">
                <button
                    className="button"
                    onClick={() => {
                        const newGenome = Genome.getRandom();
                        setGenome(newGenome);
                        setPlant(
                            new Plant("test", newGenome, { x: W / 2, y: H })
                        );
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
                        setPlant(new Plant("test", genome, { x: W / 2, y: H }));
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
                <button
                    className="button"
                    onClick={() => {
                        exportGenome(genome);
                    }}
                >
                    Экспорт
                </button>
                <button
                    className="button"
                    onClick={() => {
                        genome.mutate();
                        setPlant(new Plant("test", genome, { x: W / 2, y: H }));
                        setAnim(false);
                        setV(0);
                    }}
                >
                    Мутация
                </button>
                <button
                    className="button"
                    onClick={() => {
                        const genomeStr = getGenome(genome);
                        if (genomeStr) {
                            let newGenome = Genome.fromString(genomeStr);
                            newGenome = newGenome.crossover(genome);
                            setGenome(newGenome);
                            setPlant(
                                new Plant("test", newGenome, { x: W / 2, y: H })
                            );
                            setAnim(false);
                            setV(0);
                        }
                    }}
                >
                    Скрестить
                </button>
                <button
                    className="button"
                    onClick={() => {
                        const genomeStr = getGenome(genome);
                        if (genomeStr) {
                            const newGenome = Genome.fromString(genomeStr);
                            setGenome(newGenome);
                            setPlant(
                                new Plant("test", newGenome, { x: W / 2, y: H })
                            );
                            setAnim(false);
                            setV(0);
                        }
                    }}
                >
                    Импорт
                </button>
            </div>
        </div>
    );
};
