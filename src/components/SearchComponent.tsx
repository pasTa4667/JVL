import SearchField from "../elements/SearchField";

interface SearchProps {
    onChange: (input: string) => void;
}

function SearchComponent(props: SearchProps) {
    return (
      <div style={{width: "100%"}}>
        <SearchField
          placeholder="search..."
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </div>
    );
}


export default SearchComponent;