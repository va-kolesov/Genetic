import React from "react";
import { Genome } from "../genetics/Genome";
import { Chromosome } from "../genetics/Chromosome";
import "./GenomeEditor.css";

const W = 300;
const H = 600;

export default ({ genome, g, exportGenome }) => {
    const [stateGenome, setGenome]: [Genome, Function] = React.useState(
        genome ? Genome.fromString(genome) : null
    );
    const [v, setV] = React.useState(0);

    React.useEffect(() => {
        genome ? setGenome(Genome.fromString(genome)) : setGenome(null);
    }, [genome, g]);

    return (
        <div className="editor-container">
            <div className="input-container">
                {stateGenome &&
                    stateGenome.chromosomes.map((ch, idx) => (
                        <div key={ch.key} className="input-row">
                            <textarea
                                type="text"
                                value={ch.code}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    const val = e.target.value;
                                    ch.code = val;
                                    setV(v + 1);
                                }}
                            />
                            <button
                                className="button"
                                title="Удаляет ячейку с растением"
                                onClick={() => {
                                    stateGenome.chromosomes =
                                        stateGenome.chromosomes.filter(
                                            (chr) => ch.key !== chr.key
                                        );
                                    if (stateGenome.chromosomes.length === 0) {
                                        setGenome(null);
                                    }
                                    setV(v + 1);
                                }}
                            >
                                <img src="../icons/delete.png" alt="Удалить" />
                            </button>
                        </div>
                    ))}
                <div className="button-container">
                    <button
                        disabled={!stateGenome}
                        className="button"
                        title="Выгружает генетический код в буффер"
                        onClick={() => {
                            stateGenome && exportGenome(stateGenome);
                        }}
                    >
                        <img src="../icons/export.png" alt="Экспорт" />
                    </button>
                    <button
                        className="button"
                        title="Добавляет хромосому"
                        onClick={() => {
                            if (stateGenome) {
                                stateGenome.chromosomes.push(
                                    Chromosome.getRandom()
                                );
                                setV(v + 1);
                            } else {
                                setGenome(Genome.getRandom(1));
                            }
                        }}
                    >
                        <img src="../icons/add.png" alt="Добавить" />
                    </button>
                    <button
                        disabled={!stateGenome}
                        className="button"
                        title="Вносит случайные мутации в геном"
                        onClick={() => {
                            if (stateGenome) {
                                stateGenome.mutate();
                                setV(v + 1);
                            } else {
                                setGenome(Genome.getRandom(1));
                            }
                        }}
                    >
                        <img src="../icons/mutate.png" alt="Мутация" />
                    </button>
                    <button
                        disabled={!stateGenome}
                        className="button"
                        title="Сохраняет геном в json/txt"
                        onClick={() => {
                            if (stateGenome) {
                                const str = JSON.stringify(stateGenome);
                                let blob = new Blob([str], {
                                    type: "text/json",
                                });
                                let link = document.createElement("a");
                                link.setAttribute(
                                    "href",
                                    URL.createObjectURL(blob)
                                );
                                link.setAttribute("download", "genome.json");
                                link.click();
                            }
                        }}
                    >
                        <img src="../icons/save.png" alt="Сохранить" />
                    </button>
                    <button
                        className="button"
                        title="Выгружает геном из json/txt файла"
                        onClick={() => {
                            var input = document.createElement("input");
                            input.type = "file";

                            input.onchange = (
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                // getting a hold of the file reference
                                try {
                                    var file = e.target.files[0];

                                    // setting up the reader
                                    var reader = new FileReader();
                                    reader.readAsText(file, "UTF-8");

                                    // here we tell the reader what to do when it done reading...
                                    reader.onload = (
                                        readerEvent: React.ReaderEvent
                                    ) => {
                                        var content = readerEvent.target.result; // this is the content!
                                        try {
                                            setGenome(
                                                Genome.fromString(content)
                                            );
                                        } catch (err) {
                                            alert(err);
                                        }
                                    };
                                } catch (err) {
                                    alert(err);
                                }
                            };

                            input.click();
                        }}
                    >
                        <img src="../icons/upload.png" alt="Загрузить" />
                    </button>
                </div>
            </div>
        </div>
    );
};
