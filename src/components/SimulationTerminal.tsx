import { useState } from 'react';
import Terminal from 'react-console-emulator'

const SimulationTerminal = () => {
  const [simulations, setSimulations] = useState([]);

  return (
      <Terminal
        style={{
          height: '250px',
          maxHeight: '250px',
          width: '100%',
          maxWidth: 'calc(1000px + 1.5em)',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
        commands={{}}
        welcomeMessage={`
            Transaction simulations for upcoming blocks...\n
            \n
            ${simulations.map((s) => {
              // ** map simulations to a newline
              return `
                ${s} \n
              `
            })}
          `}
        readOnly
      />
  )
}

export default SimulationTerminal;