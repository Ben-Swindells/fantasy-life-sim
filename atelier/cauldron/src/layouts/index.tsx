import { Suspense } from "react";
import { Menubar, MenubarButton } from "../components/Menubar";
import { prefabPages } from "../pages";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

type PrefabLayoutProps = {
  children: JSX.Element;
};

export const PrefabLayout = ({ children }: PrefabLayoutProps) => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex">
      <Menubar>
        {prefabPages.map((page, index) => {
          return (
            <MenubarButton
              key={index}
              label={page.buttonLabel}
              slug={page.path}
            />
          );
        })}
      </Menubar>
      <div className="flex w-full h-full justify-center items-center flex-col">
        <div className="w-full h-full">
          <Canvas shadows="soft">
            <Suspense>
              <Physics debug>{children}</Physics>
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};
