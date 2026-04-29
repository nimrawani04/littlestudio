import { useState } from "react";
import { PolaroidCamera } from "./PolaroidCamera";
import { PolaroidEditor } from "./PolaroidEditor";
import { DownloadScreen } from "../photobooth/DownloadScreen";

type Step = "camera" | "editor" | "download";

export function PolaroidMode() {
  const [step, setStep] = useState<Step>("camera");
  const [photo, setPhoto] = useState<string>("");

  const handleCapture = (imgData: string) => {
    setPhoto(imgData);
    setStep("editor");
  };

  const handleDone = (finalUrl: string) => {
    setPhoto(finalUrl);
    setStep("download");
  };

  const handleRetake = () => {
    setPhoto("");
    setStep("camera");
  };

  switch (step) {
    case "camera":
      return <PolaroidCamera onCapture={handleCapture} />;
    case "editor":
      return <PolaroidEditor photo={photo} onFinish={handleDone} />;
    case "download":
      return <DownloadScreen imageUrl={photo} onRetake={handleRetake} isPolaroid />;
    default:
      return <PolaroidCamera onCapture={handleCapture} />;
  }
}
