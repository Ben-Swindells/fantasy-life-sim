import { Stage } from "@react-three/drei";
import { Menubar, MenubarButton } from "../components/Menubar";
import { prefabPages } from "../pages";
import { Canvas } from "@react-three/fiber";
import { DefaultScene } from "./Scenes";

type PrefabLayoutProps = {
  element: JSX.Element;
};

export const PrefabLayout = ({ element }: PrefabLayoutProps) => {
  return (
    <div className="w-screen h-screen bg-[#240329] flex">
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
        <div className="w-3/4 bg-white aspect-video flex">
          <Canvas shadows="soft">
            <DefaultScene>{element}</DefaultScene>
          </Canvas>
        </div>
      </div>
    </div>
  );
};
