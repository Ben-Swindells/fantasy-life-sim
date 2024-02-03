import { PotionBottle } from "@atelier/elements/3d/components/Potion";
import { DefaultScene } from "../../layouts/Scenes";

export const PotionBottleScene = () => {
  return (
    <DefaultScene>
      <PotionBottlePrefab />
    </DefaultScene>
  );
};

export const PotionBottlePrefab = () => {
  return <PotionBottle />;
};
