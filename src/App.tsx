import React from "react";
import PlantDemo from "./ui/PlantDemo";
import "./App.css";
import { Genome } from "./genetics/Genome";
export default () => {
    const [genome, setGenome] = React.useState("");
    const exportGenome = (gen: Genome) => {
        const str = gen.toString();
        setGenome(str);
    };
    return (
        <div className="row">
            <PlantDemo exportGenome={exportGenome}/>
            <PlantDemo exportGenome={exportGenome}/>
            <PlantDemo exportGenome={exportGenome}/>
            <PlantDemo exportGenome={exportGenome}/>
        </div>
    );
};
