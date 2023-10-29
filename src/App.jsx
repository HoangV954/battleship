
import './App.scss';
import { useState } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import ShipHarbor from './components/ShipPlacement/ShipHarbor';
import { GameContextProvider } from './hooks/GameContext';

function App() {

  const [axis, setAxis] = useState({
    main: 'x',
    sub: 'y'
  })

  return (
    <div className='App'>
      <GameContextProvider>
        <GameBoard axis={axis} setAxis={setAxis}></GameBoard>

      </GameContextProvider>
      {/* <ShipHarbor axis={axis}></ShipHarbor> */}
    </div>
  )
}

export default App
