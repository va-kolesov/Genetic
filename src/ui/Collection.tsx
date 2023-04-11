import * as React from "react";

interface CollectionProps {}

const CollectionItem = ({
    name,
    genome,
    exportGenome,
    getGenome,
    importEnabled,
}) => {
    return (
        <div>
            <div>{name}</div>

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
                title="Загружает геном из буффера в ячейку хранилища"
                onClick={() => {
                    const genomeStr = getGenome(genome);
                    if (genomeStr) {
                    }
                }}
            >
                <img src="../icons/import.png" alt="Импорт" />
            </button>
        </div>
    );
};
interface IStorage {
    key: string;
    name: string;
    genome: string;
}
const Collection = ({
    storage = [],
    exportGenome,
    getGenome,
    importEnabled,
}: {
    storage: IStorage[];
    exportGenome
    getGenome
    importEnabled
}) => {
    return (
        <div>
            {storage.map((record) => {
                return (
                    <CollectionItem
                        key={record.key}
                        name={record.name}
                        genome={record.genome}
                        exportGenome={exportGenome}
                        getGenome={getGenome}
                        importEnabled={importEnabled}
                    />
                );
            })}
        </div>
    );
};

export default Collection;
