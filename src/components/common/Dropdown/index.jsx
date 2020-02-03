import React, { useRef, useState, useEffect } from "react";
import { Wrapper, Label, List, Item, Arrow, DefaultValue } from "./styles";
import { ChevronDownIcon } from "../Icons";

function Dropdown({ standalone, options, label, displayDefaultValue }) {
	const listEl = useRef(null);
	const [labelOrValue, setLabelOrValue] = useState(label);
	const [defaultValue, setDefaultValue] = useState(options[0]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	const handleClickOutside = e => {
		if (!listEl.current.contains(e.target)) {
			setOpen(false);
		}
	};

	const toggleOpen = () => {
		setOpen(!open);
	};

	const pickElement = e => {
		if (displayDefaultValue) {
			setDefaultValue(e.target.innerText);
		} else {
			setLabelOrValue(e.target.innerText);
		}
		setOpen(false);
	};

	return (
		<Wrapper ref={listEl} open={open} standalone={standalone}>
			<Label onClick={toggleOpen}>
				{labelOrValue}
				{displayDefaultValue && <DefaultValue>{defaultValue}</DefaultValue>}
				<Arrow>
					<ChevronDownIcon width={10} height={10} color="#999" />
				</Arrow>
			</Label>
			<List hidden={!open}>
				{options.map((item, index) => (
					<Item key={`option-${index}`} onClick={pickElement}>
						{item}
					</Item>
				))}
			</List>
		</Wrapper>
	);
}

export default Dropdown;
