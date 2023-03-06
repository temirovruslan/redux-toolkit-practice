import React from "react";

const InputField = ({ text, handleInput, handleSubmit }) => {
	return (
		<label htmlFor="text">
			Add todo
			<input
				className="border"
				id="text"
				//value text поставили когда submit input показывает что в переменной text
				value={text}
				onChange={(e) => handleInput(e.target.value)}
			/>
			<button className="border bg-orange-400" onClick={handleSubmit}>
				Submit
			</button>
		</label>
	);
};

export default InputField;
