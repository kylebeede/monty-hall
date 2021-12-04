import React, { useCallback, useState } from 'react';

export default function Door({ index, hasCar, onClick, isOpen }) {
	const [isSelected, setIsSelected] = useState(false);

	const handleClick = useCallback(() => {
		setIsSelected(true);
		onClick(index);
	}, [index, onClick]);

	return (
		<div className={`backDoor ${hasCar ? 'hasCar': 'hasGoat'}`}>
			<div className={`door  ${isSelected ? 'selected' : ''} ${isOpen ? 'doorOpen' : ''}`} onClick={handleClick} />
		</div>
	);
}
