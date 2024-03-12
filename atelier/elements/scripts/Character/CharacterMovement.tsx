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
  const cameraRigRef = useRef<RapierRigidBody>(null);

  const [sub, get] = useKeyboardControls<CharacterControlsList>();
  const dispatch = useDispatch();

  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  // Use the useThree hook to access the context provided by React Three Fiber
  const { gl } = useThree();

  useEffect(() => {
    // Directly access the renderer's DOM element (the canvas)
    const canvas = gl.domElement;

    const handleMouseMove = (e) => {
      if (!rig.current && cameraRef.current) return;
      const camera = cameraRef.current;
      // Calculate the normalized position here
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the canvas
      const y = e.clientY - rect.top; // y position within the canvas

      // Normalize the coordinates to -1 to 1
      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = -(y / rect.height) * 2 + 1;

      const maxRotationRadians = Math.PI / 2;
      const rotationAngle = normalizedX * maxRotationRadians * 2;

      const quaternion = new THREE.Quaternion();

      rig.current.setRotation(
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -rotationAngle),
        true
      );
    };
    // Attach the event listener to the canvas
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Remove the event listener from the canvas when the component unmounts
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gl]);
  useFrame((state, delta) => {
    if (cameraRef.current && rig.current) {
      const camera = cameraRef.current;
      const { forward, back, left, right, jump } = get();

      const moveDirection = new THREE.Vector3(0, 0, 0);
      const speed = 2;

      if (jump && canJump) {
        rig.current.applyImpulse(
          {
            x: 0,
            y: 10,
            z: 0,
          },
          true
        );
        console.log("jump");
        canJump = false;
      }

      if (forward) moveDirection.z += 1; // Moving forward is negative in Three.js
      if (back) moveDirection.z -= 1;
      if (left) moveDirection.x += 1;
      if (right) moveDirection.x -= 1;

      moveDirection.normalize();

      // Assuming this gets the character's current quaternion rotation
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

      // Camera follows behind the character
      const cameraDistanceZ = cameraDistance; // Distance behind the character
      const cameraHeight = cameraDistance; // Height above the character

      const cameraOffset = new THREE.Vector3(0, -cameraHeight, cameraDistanceZ);
      cameraOffset.applyQuaternion(characterRotation); // Apply character's rotation to offset

      const rigPosition = new THREE.Vector3(
        rig.current.translation().x,
        rig.current.translation().y,
        rig.current.translation().z
      );

      // Calculate the final camera position by subtracting the offset
      // This ensures the camera is positioned behind and above the character
      const cameraPosition = rigPosition.clone().sub(cameraOffset);

      smoothedCameraPosition.lerp(cameraPosition, 0.1); // Smoothly interpolate the camera's position to follow the character
      smoothedCameraTarget.lerp(rigPosition, 0.1); // Optionally smooth the target position too, for a softer lookAt transition

      camera.position.copy(smoothedCameraPosition);
      camera.lookAt(smoothedCameraTarget); // Ensure the camera always points towards the character
    }
  });
  return (
    <>
      <RigidBody
        ref={rig}
        colliders="trimesh"
        enabledRotations={[false, false, false]}
        friction={5}
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
