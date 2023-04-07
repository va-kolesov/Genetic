import React from "react";
import PlantDemo from "./ui/PlantDemo";
import "./App.css";
import { Genome } from "./genetics/Genome";
import GenomeEditor from "./ui/GenomeEditor";
export default () => {
    const [genome, setGenome] = React.useState("");
    const exportGenome = (gen: Genome) => {
        const str = JSON.stringify(gen);
        setGenome(str);
        // window.navigator.clipboard.writeText(str);
    };
    return (
        <div className="row">
            <div className="col">
                <div className="row">
                    <PlantDemo
                        exportGenome={exportGenome}
                        getGenome={() => genome}
                    />
                    <PlantDemo
                        exportGenome={exportGenome}
                        getGenome={() => genome}
                    />
                    <PlantDemo
                        exportGenome={exportGenome}
                        getGenome={() => genome}
                    />
                </div>
                <div className="row">
                    <PlantDemo
                        exportGenome={exportGenome}
                        getGenome={() => genome}
                    />
                    <PlantDemo
                        exportGenome={exportGenome}
                        getGenome={() => genome}
                    />
                    <PlantDemo
                        exportGenome={exportGenome}
                        getGenome={() => genome}
                    />
                </div>
            </div>
            <div className="col">
                {genome && (
                    <GenomeEditor genome={genome} exportGenome={exportGenome} />
                )}
            </div>
        </div>
    );
};
