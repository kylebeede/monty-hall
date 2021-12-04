import React, { useCallback, useState } from 'react';
import Door from './Door';
import './App.css';

const DOOR_COUNT = 3;

function App() {
  const [correctDoorIndex, setCorrectDoorIndex] = useState(Math.floor(Math.random() * ((DOOR_COUNT - 1) - 0 + 1) + 0));
  const [selectedDoorIndex, setSelectedDoorIndex] = useState(null);
  const [hasConfirmedSelection, setHasConfirmedSelection] = useState(false);
  const [openDoorIndex, setOpenDoorIndex] = useState(null);

  const handleDoorSelect = useCallback((index) => {
    console.log('handleDoorSelect', index);
    if (selectedDoorIndex != null) {
      setHasConfirmedSelection(true);
      setSelectedDoorIndex(index);
    } else {
      const shouldOpenFirstDoor = Math.floor(Math.random() * 2);
      let openDoorIndex = null;
      if (shouldOpenFirstDoor) {
        if (index !== 0 && correctDoorIndex !== 0) {
          openDoorIndex = 0;
        } else if (index !== 1 && correctDoorIndex !== 1) {
          openDoorIndex = 1;
        } else {
          openDoorIndex = 2;
        }
      } else {
        if (index !== 2 && correctDoorIndex !== 2) {
          openDoorIndex = 2;
        } else if (index !== 1 && correctDoorIndex !== 1) {
          openDoorIndex = 1;
        } else {
          openDoorIndex = 0;
        }
      }

      setSelectedDoorIndex(index);
      setOpenDoorIndex(openDoorIndex);
    }
  }, [correctDoorIndex, selectedDoorIndex]);

  const doors = [];
  for (let i = 0; i< DOOR_COUNT; i++) {
    doors.push(<Door key={i} index={i} hasCar={i === correctDoorIndex} onClick={handleDoorSelect} isOpen={i === openDoorIndex || hasConfirmedSelection} />);
  }

  let instructionText = '';
  if (selectedDoorIndex == null) {
    instructionText = <p>Click the door you think has the car</p>;
  } else if (!hasConfirmedSelection) {
    instructionText = <p>You can now either switch doors or keep your current choice. Click the door you want to open.</p>
  } else if (hasConfirmedSelection && selectedDoorIndex === correctDoorIndex) {
    instructionText = <p>Correct!</p>
  } else if (hasConfirmedSelection && selectedDoorIndex !== correctDoorIndex) {
    instructionText = <p>Wrong :(</p>
  }

  console.log('rerender');

  return (
    <div className="container">
      <div className="instruction-container">
        <h1 className="header">Monty Hall Problem</h1>
        <p>There is a car behind one door. The other two have goats.</p>
        {instructionText}
      </div>
      <div className="doors-container">
        {doors}
      </div>
    </div>
  );
}

export default App;
