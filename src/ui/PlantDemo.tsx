import React from "react";
import { Genome } from "../genetics/Genome";
import { Plant } from "../plant/Plant";
import PlantCanvas from "./PlantCanvas";
import "./PlantDemo.css";
import { resetRandom } from "../plant/Utils";

const T = 200;
const W = 300;
const H = 300;

export default ({ exportGenome, getGenome, importEnabled }) => {
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
        }, T);
    }

    return (
        <div className="canvas-container">
            <PlantCanvas plant={plant} v={v} w={W} h={H} />
            <div className="button-container">
                <button
                    className="button"
                    title="Создает новое растение со случайным геномом"
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
                    <img src="../icons/reroll.png" alt="Сброс" />
                </button>
                <button
                    className="button"
                    title="Создает новое растение с текущим геномом"
                    onClick={() => {
                        setPlant(new Plant("test", genome, { x: W / 2, y: H }));
                        setAnim(false);
                        setV(0);
                    }}
                >
                    <img src="../icons/rewind.png" alt="Перезапуск" />
                </button>
                <button
                    className="button"
                    title="Производит одну итерацию роста растения"
                    onClick={() => {
                        plant.grow();
                        setV(v + 1);
                    }}
                >
                    <img src="../icons/step.png" alt="Рост" />
                </button>
                {!anim && (
                    <button
                        className="button"
                        title="Запускает автоматический рост растения"
                        onClick={() => {
                            setAnim(true);
                        }}
                    >
                        <img src="../icons/run.png" alt="Пуск" />
                    </button>
                )}
                {anim && (
                    <button
                        className="button"
                        title="Останавливает автоматический рост растения"
                        onClick={() => {
                            setAnim(false);
                        }}
                    >
                        <img src="../icons/pause.png" alt="Стоп" />
                    </button>
                )}
                <button
                    className="button"
                    title="Выгружает генетический код в буффер и в редактор генома"
                    onClick={() => {
                        exportGenome(genome);
                    }}
                >
                    <img src="../icons/export.png" alt="Экспорт" />
                </button>
                <button
                    disabled={!importEnabled}
                    className="button"
                    title="Загружает растение из буффера и создает новое растение"
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
                    <img src="../icons/import.png" alt="Импорт" />
                </button>
                <button
                    className="button"
                    title="Вносит случайные мутации в геном и создает новое растение"
                    onClick={() => {
                        genome.mutate();
                        setPlant(new Plant("test", genome, { x: W / 2, y: H }));
                        setAnim(false);
                        setV(0);
                    }}
                >
                    <img src="../icons/mutate.png" alt="Мутация" />
                </button>
                <button
                    className="button"
                    title="Скрещивает геном этого растения с геномом из буффера и создает новое растение"
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
                    <img src="../icons/crossover.png" alt="Скрестить" />
                </button>
            </div>
        </div>
    );
};
