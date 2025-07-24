import type { KeyboardEventHandler } from "react";

const BlockInvalidInputChar: KeyboardEventHandler<HTMLInputElement> = (e) => {
	if (["e", "E", "-", "+"].includes(e.key)) {
		e.preventDefault();
	}
};

export default BlockInvalidInputChar;
