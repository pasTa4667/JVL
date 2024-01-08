interface SelectionProps {
    onLevelChange: (level: number) => void;
    onTypeChange: (selectionType: string) => void;
    defaultType: string;
}

//Depricated
function SelectionComponent(props: SelectionProps) {

    const selectionTypes = [
        { label: 'Mix', value: 'Mix' },             
        { label: 'EnToOn', value: 'EnToOn' },   
        { label: 'EnToKun', value: 'EnToKun' }, 
        { label: 'KunToEn', value: 'KunToEn' },
        { label: 'OnToEn', value: 'OnToEn' },
        { label: 'KanToEn', value: 'KanToEn' },     
        { label: 'KanToOn', value: 'KanToOn' },
        { label: 'KanToKun', value: 'KanToKun' },

    ];

    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const level = Number(e.target.value);
        props.onLevelChange(level);
    }

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectionType = e.target.value;
        props.onTypeChange(selectionType);
    }

    return (
        <div className="selection-container">
            <select onChange={handleTypeChange} defaultValue={props.defaultType}> 
                {selectionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                ))}
            </select>
            <select onChange={handleLevelChange} defaultValue={1}> 
                {Array.from({ length: 60 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                        {index + 1}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectionComponent;