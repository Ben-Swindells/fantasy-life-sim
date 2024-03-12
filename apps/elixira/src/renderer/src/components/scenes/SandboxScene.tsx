import { PlayerCharacterPrefab } from '@atelier/cauldron/src/prefabs/Characters/'
import { Box } from '@react-three/drei'

import { Ground } from '@atelier/elements/scripts/Enviroment/Objects/Ground'

export const SandboxScene = () => {
  return (
    <>
      <ambientLight />
      <PlayerCharacterPrefab />
      <Ground>
        <Box scale={[10, 0.2, 10]} />
      </Ground>

      <axesHelper args={[1]} />
      <gridHelper args={[10, 10]} />
    </>
  )
}
