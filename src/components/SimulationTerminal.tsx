import { useState } from 'react';
import Terminal from 'react-console-emulator'

const SimulationTerminal = () => {
  const [simulations, setSimulations] = useState([]);

  return (
    <Terminal
              style={{
                height: '400px',
                maxHeight: '400px'
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