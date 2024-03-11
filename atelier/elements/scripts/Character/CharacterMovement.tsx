import {
  OrbitControls,
  OrbitControlsProps,
  PerspectiveCamera,
  useKeyboardControls,
} from "@react-three/drei";
import { CharacterControls, CharacterControlsList } from "./CharacterControls";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import * as THREE from "three";
import { useDispatch, useSelector } from "react-redux";
import { updatePosition } from "@toolbelt/redux/slices/cauldron/prefabs/Characters";

type CharacterMovementProps = {
  id: string;
  speed: number;
  children: React.ReactNode;
  cameraDistance: number;
};
var canJump = false;

export const CharacterMovement = ({
  id,
  children,
  cameraDistance,
}: CharacterMovementProps) => {
  const rig = useRef<RapierRigidBody>(null);
  const character = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const [sub, get] = useKeyboardControls<CharacterControlsList>();
  const dispatch = useDispatch();

  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  useFrame((state, delta) => {
    if (cameraRef.current && rig.current) {
      const { forward, back, left, right, jump } = get();

      const moveDirection = new THREE.Vector3(0, 0, 0);
      const speed = 2;

      // const cameraDirection = new THREE.Vector3();
      // state.camera.getWorldDirection(cameraDirection);
      // cameraDirection.y = 0;
      // cameraDirection.normalize();

      // const angle = Math.atan2(cameraDirection.x, cameraDirection.z);

      // const quaternion = new THREE.Quaternion();
      // quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);

      // rig.current.setRotation(quaternion, true);

      if (jump) {
        if (canJump) {
          canJump = false;
        }
      }

      if (forward) moveDirection.z += 1;
      if (back) moveDirection.z -= 1;
      if (left) moveDirection.x += 1;
      if (right) moveDirection.x -= 1;

      moveDirection.normalize();

      if (moveDirection.length() > 0) {
        const worldImpulse = {
          x: moveDirection.x * speed,
          y: 0,
          z: moveDirection.z * speed,
        };
        rig.current.applyImpulse(worldImpulse, true);
      }
      dispatch(
        updatePosition({ id: id, position: vec3(rig.current.translation()) })
      );

      //Camera
      const camera = cameraRef.current;
      const target = new THREE.Vector3();

      const rigPosition = new THREE.Vector3(
        rig.current.translation().x,
        rig.current.translation().y,
        rig.current.translation().z
      );

      const characterRotation = new THREE.Euler(
        rig.current.rotation().x,
        Math.PI + rig.current.rotation().y,
        rig.current.rotation().z
      );

      const cameraOffset = new THREE.Vector3(0, cameraDistance, cameraDistance);
      // Use the character's rotation to adjust the offset
      cameraOffset.applyEuler(characterRotation);

      const cameraPosition = new THREE.Vector3(
        rigPosition.x + cameraOffset.x,
        rigPosition.y + cameraOffset.y,
        rigPosition.z + cameraOffset.z
      );

      // Set the camera's position by adding the offset to the character's position

      smoothedCameraPosition.lerp(cameraPosition, 0.1);
      smoothedCameraTarget.lerp(rigPosition, 0.1);

      camera.position.copy(smoothedCameraPosition);

      camera.lookAt(smoothedCameraTarget);
    }
  });

  return (
    <>
      <RigidBody
        ref={rig}
        colliders="trimesh"
        enabledRotations={[false, false, false]}
        linearDamping={5}
        onCollisionEnter={(payload) => {
          if (payload === undefined) return;
          if (payload.rigidBodyObject.name === "ground") {
            canJump = true;
          }
        }}
      >
        <group ref={character}>{children}</group>
      </RigidBody>
      <PerspectiveCamera ref={cameraRef} makeDefault />
    </>
  );
};
