import Select from "react-select";

const customStyles = {
	control: (provided, state) => ({
		...provided,
		backgroundColor: "#212121",
		borderRadius: "0.5rem",
		borderColor: state.isFocused ? "#6bffff" : "transparent",
		height: state.selectProps.height || "38px",
		boxShadow: "none",
		"&:hover": {
			borderColor: state.isFocused
				? "#6bffff"
				: "transparent",
		},
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected ? "#6bffff" : "#212121",
		color: state.isSelected ? "#212121" : "#f5f5f5",
		"&:hover": { backgroundColor: "#6bffff", color: "#212121" },
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: "#212121",
	}),
	singleValue: (provided) => ({
		...provided,
		color: "#f5f5f5",
	}),
	placeholder: (provided) => ({
		...provided,
		color: "#f5f5f5",
	}),
	indicatorSeparator: (provided) => ({
		...provided,
		backgroundColor: "#f5f5f5",
	}),
	dropdownIndicator: (provided, state) => ({
		...provided,
		color: state.isFocused ? "#6bffff" : "#f5f5f5",
		"&:hover": { color: "#6bffff" },
	}),
};

function DarkSelect(props) {
	return <Select styles={customStyles} {...props} />;
}

export { DarkSelect };
