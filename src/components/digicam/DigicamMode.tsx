import { useState } from "react";
import { DigicamBoot } from "./DigicamBoot";
import { DigicamViewfinder } from "./DigicamViewfinder";
import { DigicamGallery } from "./DigicamGallery";

export type CameraMode = "AUTO" | "NIGHT" | "PARTY" | "OVEREXPOSED";
export type FlashMode = "ON" | "OFF" | "AUTO";

export interface DigicamSettings {
  mode: CameraMode;
  flash: FlashMode;
  grainLevel: number;
  showTimestamp: boolean;
}

export type DigicamStep = "boot" | "viewfinder" | "gallery";

export function DigicamMode() {
  const [step, setStep] = useState<DigicamStep>("boot");
  const [photos, setPhotos] = useState<string[]>([]);
  const [settings, setSettings] = useState<DigicamSettings>({
    mode: "AUTO",
    flash: "AUTO",
    grainLevel: 50,
    showTimestamp: true,
  });

  const handleBootComplete = () => {
    setStep("viewfinder");
  };

  const handleCapture = (newPhotos: string[]) => {
    setPhotos((prev) => [...prev, ...newPhotos]);
    // In burst mode it returns multiple, otherwise single array.
  };

  const openGallery = () => {
    setStep("gallery");
  };

  const closeGallery = () => {
    setStep("viewfinder");
  };

  switch (step) {
    case "boot":
      return <DigicamBoot onComplete={handleBootComplete} />;
    case "viewfinder":
      return (
        <DigicamViewfinder
          settings={settings}
          onUpdateSettings={setSettings}
          onCapture={handleCapture}
          onOpenGallery={openGallery}
          photoCount={photos.length}
        />
      );
    case "gallery":
      return (
        <DigicamGallery
          photos={photos}
          onClose={closeGallery}
        />
      );
    default:
      return <DigicamBoot onComplete={handleBootComplete} />;
  }
}
