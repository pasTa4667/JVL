import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputBase, InputBaseProps, styled } from "@mui/material";


const SearchFieldStyle = {
  fontSize: 20,
  display: "flex",
  margin: 10,
  alignItems: "center",
  backgroundColor: "rgba(160, 158, 158, 0.42)",
  borderRadius: 10
};

const IconWrapperStyle = {
  marginLeft: 10,
  marginRight: 10
}

const StyledInputBase = styled(InputBase)(() => ({
  color: "inherit",
  width: "100%",
}));


export function SearchField(props: InputBaseProps) {
  return (
    <div style={SearchFieldStyle}>
      <div style={IconWrapperStyle}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <StyledInputBase
        {...props}
      />
    </div>
  );
}

export default SearchField; 