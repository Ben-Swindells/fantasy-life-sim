import {
  Capsule,
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
  jumpStrength: number;
  height: number;
};
var canJump = false;

export const PlayerMovement = ({
  id,
  children,
  cameraDistance,
  jumpStrength,
  speed,
  height,
}: CharacterMovementProps) => {
  const rig = useRef<RapierRigidBody>(null);
  const character = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const cameraRigRef = useRef<RapierRigidBody>(null);

  const [sub, get] = useKeyboardControls<CharacterControlsList>();
  const dispatch = useDispatch();

  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
  const [cameraPitch, setCameraPitch] = useState(0);

  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    let rotationX = 0;
    let rotationY = 0;

    const requestPointerLock = () => {
      canvas.requestPointerLock();
    };

    const removePointerLock = () => {
      document.exitPointerLock();
    };

    const handleMouseMove = (e) => {
      if (!rig.current) return;

      const deltaX = -1 * e.movementX;

      const sensitivity = 0.002;
      rotationX += deltaX * sensitivity;

      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotationX);
      rig.current.setRotation(quaternion, true);
    };
    canvas.addEventListener("mousedown", (e) => {
      if (e.button === 2) {
        requestPointerLock();
        canvas.addEventListener("mousemove", handleMouseMove);
      }
    });
    canvas.addEventListener("mouseup", (e) => {
      if (e.button === 2) {
        removePointerLock();
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
    });

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", requestPointerLock);
      canvas.removeEventListener("mouseup", removePointerLock);
    };
  }, [gl]);
  useFrame((state, delta) => {
    if (cameraRef.current && rig.current) {
      const camera = cameraRef.current;
      const { forward, back, left, right, jump } = get();

      const moveDirection = new THREE.Vector3(0, 0, 0);

      if (jump && canJump) {
        rig.current.applyImpulse(
          {
            x: 0,
            y: jumpStrength * 10,
            z: 0,
          },
          true
        );
        console.log("jump");
        canJump = false;
      }

      if (forward) moveDirection.z += 1;
      if (back) moveDirection.z -= 1;
      if (left) moveDirection.x += 1;
      if (right) moveDirection.x -= 1;

      moveDirection.normalize();

      const characterRotation = new THREE.Quaternion(
        rig.current.rotation().x,
        rig.current.rotation().y,
        rig.current.rotation().z,
        rig.current.rotation().w
      );

      if (moveDirection.length() > 0) {
        moveDirection.applyQuaternion(characterRotation);
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

      // Adjust cameras position to be forward facing
      const horizontalOffsetZ = Math.cos(cameraPitch) * cameraDistance;

      const cameraOffset = new THREE.Vector3(
        0,
        cameraDistance,
        -horizontalOffsetZ
      );
      cameraOffset.applyQuaternion(characterRotation); // Ensure offset follows character orientation

      const rigPosition = new THREE.Vector3(
        rig.current.translation().x,
        rig.current.translation().y,
        rig.current.translation().z
      );

      // Apply the calculated offset to determine the final camera position
      const cameraPosition = rigPosition.clone().add(cameraOffset);

      // Interpolate the camera's position for smooth following
      smoothedCameraPosition.lerp(cameraPosition, 0.05);
      cameraRef.current.position.copy(smoothedCameraPosition);

      const lookAtPosition = new THREE.Vector3(
        rigPosition.x,
        rigPosition.y,
        rigPosition.z
      );
      smoothedCameraTarget.lerp(lookAtPosition, 0.05);
      cameraRef.current.lookAt(smoothedCameraTarget);
    }
  });
  return (
    <>
      <RigidBody
        ref={rig}
        colliders="trimesh"
        enabledRotations={[false, false, false]}
        mass={0.5}
        linearDamping={2}
        onCollisionEnter={(payload) => {
          if (payload === undefined) return;
          if (payload.rigidBodyObject.name === "ground") {
            canJump = true;
            console.log(canJump);
          }
        }}
      >
        <group ref={character}>{children}</group>
      </RigidBody>

      <PerspectiveCamera ref={cameraRef} makeDefault />
    </>
  );
};
