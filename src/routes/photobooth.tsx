import { createFileRoute } from "@tanstack/react-router";
import { PhotoBooth } from "@/components/photobooth/PhotoBooth";

export const Route = createFileRoute("/photobooth")({
  head: () => ({
    meta: [
      { title: "Pixel Photo Booth — Minecraft-Style Virtual Photo Booth" },
      {
        name: "description",
        content:
          "Step into a cozy Minecraft-style photo booth. Take photos, choose templates, add stickers, and print pixel-perfect photo strips.",
      },
      { property: "og:title", content: "Pixel Photo Booth" },
      {
        property: "og:description",
        content: "A Minecraft-style virtual photobooth world. Take pics, decorate strips, and download memories.",
      },
    ],
  }),
  component: PhotoBoothPage,
});

function PhotoBoothPage() {
  return <PhotoBooth />;
}
