import { useState, useCallback } from "react";
import { BoothEntry } from "./BoothEntry";
import { BoothControlPanel } from "./BoothControlPanel";
import { PhotoCountSelect } from "./PhotoCountSelect";
import { FilterSelect } from "./FilterSelect";
import { CameraCapture } from "./CameraCapture";
import { UploadPhotos } from "./UploadPhotos";
import { TemplateSelect } from "./TemplateSelect";
import { StripEditor } from "./StripEditor";
import { PrintExperience } from "./PrintExperience";
import { DownloadScreen } from "./DownloadScreen";
import "../../styles/photobooth.css";

type Step = 
  | "entry" 
  | "control" 
  | "count" 
  | "filter" 
  | "camera" 
  | "upload" 
  | "template" 
  | "editor" 
  | "print" 
  | "download";

export function PhotoBooth() {
  const [step, setStep] = useState<Step>("entry");
  const [mode, setMode] = useState<"camera" | "upload">("camera");
  const [shotCount, setShotCount] = useState(4);
  const [filterId, setFilterId] = useState("none");
  const [photos, setPhotos] = useState<string[]>([]);
  const [templateId, setTemplateId] = useState("pastel");
  const [finalImage, setFinalImage] = useState("");

  const reset = useCallback(() => {
    setStep("entry");
    setPhotos([]);
    setFinalImage("");
    setFilterId("none");
    setTemplateId("pastel");
  }, []);

  switch (step) {
    case "entry":
      return <BoothEntry onEnter={() => setStep("control")} />;

    case "control":
      return (
        <BoothControlPanel
          onCamera={() => { setMode("camera"); setStep("count"); }}
          onUpload={() => { setMode("upload"); setStep("count"); }}
          onBack={reset}
        />
      );

    case "count":
      return (
        <PhotoCountSelect
          mode={mode}
          onModeChange={setMode}
          onBack={() => setStep("control")}
          onSelect={(n) => {
            setShotCount(n);
            setPhotos([]);
            setStep("filter");
          }}
        />
      );

    case "filter":
      return (
        <FilterSelect 
          selected={filterId} 
          onSelect={setFilterId} 
          onNext={() => setStep(mode === "camera" ? "camera" : "upload")} 
          onBack={() => setStep("count")}
        />
      );

    case "camera":
      return (
        <CameraCapture 
          shotCount={shotCount}
          filterId={filterId}
          onComplete={(imgs) => { setPhotos(imgs); setStep("template"); }} 
        />
      );

    case "upload":
      return (
        <UploadPhotos 
          shotCount={shotCount} 
          filterId={filterId}
          photos={photos}
          onUpdate={setPhotos}
          onDone={() => setStep("template")} 
          onBack={() => setStep("filter")}
        />
      );

    case "template":
      return (
        <TemplateSelect
          selected={templateId}
          onSelect={(id) => setTemplateId(id)}
          onContinue={() => setStep("editor")}
          onBack={() => setStep(mode === "camera" ? "camera" : "upload")}
        />
      );

    case "editor":
      return (
        <StripEditor 
          photos={photos} 
          templateId={templateId}
          onFinish={(canvas) => {
            setFinalImage(canvas.toDataURL("image/png"));
            setStep("download");
          }} 
          onBack={() => setStep("template")}
        />
      );

    case "print":
    case "download":
      return <DownloadScreen imageUrl={finalImage} onRetake={reset} />;

    default:
      return <BoothEntry onEnter={() => setStep("control")} />;
  }
}
