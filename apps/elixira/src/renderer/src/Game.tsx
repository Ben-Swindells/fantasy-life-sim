import { Suspense } from 'react'
import { SandboxScene } from './components/scenes'
import { GameGUI } from './engine/ui'
import { GameWindow } from './engine/window'
import { Provider } from 'react-redux'
import { store } from '../../../../../toolbelt/redux/store'

function Game(): JSX.Element {
  return (
    <>
      <Provider store={store}>
        <GameGUI />
        <GameWindow>
          <Suspense>
            <SandboxScene />
          </Suspense>
        </GameWindow>
      </Provider>
    </>
  )
}

export default Game
