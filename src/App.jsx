
import './App.scss';
import { useState } from 'react';
import Button from './utils/Button';
import GameBoard from './components/GameBoard/GameBoard';
import ShipHarbor from './components/ShipPlacement/ShipHarbor';
import { GameContextProvider } from './hooks/GameContext';

function App() {

  const [axis, setAxis] = useState({
    main: 'x',
    sub: 'y'
  })

  const onClick = () => {
    setAxis((axis) => {
      return {
        main: axis.sub,
        sub: axis.main
      }
    })
  }

  return (
    <div className='App'>
      <GameContextProvider>
        <GameBoard axis={axis}></GameBoard>
        <ShipHarbor axis={axis}></ShipHarbor>
      </GameContextProvider>
      <Button name='axis-changer' onClick={onClick} textContent={`Current Axis: ${axis.main}`}></Button>
    </div>
  )
}

export default App
