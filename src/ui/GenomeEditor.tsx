import React from "react";
import { Genome } from "../genetics/Genome";
import "./GenomeEditor.css";

const W = 300;
const H = 600;

export default ({ genome, exportGenome }) => {
    const [stateGenome, setGenome]: [Genome, Function] = React.useState(
        Genome.fromString(genome)
    );
    const [v, setV] = React.useState(0);

    React.useEffect(()=>{
        setGenome(Genome.fromString(genome));
    },[genome])

    return (
        <div className="editor-container">
            <div className="input-container">
                {stateGenome &&
                    stateGenome.chromosomes.map((ch, idx) => (
                        <input
                            key={ch.key}
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
                    ))}
                {exportGenome && (
                    <button
                        className="button"
                        onClick={() => {
                            exportGenome(stateGenome);
                        }}
                    >
                        Экспорт
                    </button>
                )}
            </div>
        </div>
    );
};
