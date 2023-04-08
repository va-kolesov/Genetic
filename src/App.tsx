import React from "react";
import PlantDemo from "./ui/PlantDemo";
import "./App.css";
import { Genome } from "./genetics/Genome";
import GenomeEditor from "./ui/GenomeEditor";

const DemoCell = ({ exportGenome, getGenome, importEnabled, onDelete }) => {
    return (
        <div className="fancy-border">
            <button
                className="abs button"
                title="Удаляет ячейку с растением"
                onClick={() => {
                    onDelete();
                }}
            >
                <img src="../icons/delete.png" alt="Удалить" />
            </button>
            <PlantDemo
                exportGenome={exportGenome}
                importEnabled={importEnabled}
                getGenome={getGenome}
            />
        </div>
    );
};

let counter = 0;
export default () => {
    const [genome, setGenome] = React.useState("");
    const [g, setG] = React.useState(0);
    const [demos, setDemos] = React.useState([counter++, counter++, counter++]);
    const exportGenome = (gen: Genome) => {
        const str = JSON.stringify(gen);
        setGenome(str);
        setG(g + 1);
    };
    const getGenome = () => genome;
    return (
        <div className="row">
            <div className="col">
                <div className="row">
                    {demos.map((key) => (
                        <DemoCell
                            key={key}
                            exportGenome={exportGenome}
                            getGenome={getGenome}
                            importEnabled={!!genome}
                            onDelete={() => {
                                setDemos(demos.filter((demo) => demo !== key));
                            }}
                        />
                    ))}

                    <button
                        className="button"
                        title="Добавляет ячейку с растением"
                        onClick={() => {
                            setDemos([...demos, counter++]);
                        }}
                    >
                        <img src="../icons/add.png" alt="Добавить" />
                    </button>
                </div>
            </div>
            <div className="col">
                <GenomeEditor
                    g={g}
                    genome={genome}
                    exportGenome={exportGenome}
                />
            </div>
        </div>
    );
};
