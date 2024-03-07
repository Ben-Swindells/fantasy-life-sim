type Vector3 = {
  [{
    x: number,
    y: number,
    z: number,
  }];
};

interface CharactersState {
  characterList: {
    [id: string]: CharacterState;
  };
}

type CharacterState = {
  id: string;
  transform: {
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
  };
};
