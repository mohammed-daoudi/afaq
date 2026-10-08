"use client";

import { useEffect } from "react";

export function DisableInspect() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    if (typeof window !== "undefined") {
      // Désactiver le clic droit
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
      };
      document.addEventListener("contextmenu", handleContextMenu);

      // Bloquer les raccourcis clavier
      const handleKeyDown = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();

        const blocked =
          key === "f12" ||
          (e.ctrlKey && key === "u") ||
          (e.ctrlKey && e.shiftKey && ["i", "j", "c", "k"].includes(key)) ||
          (e.metaKey && e.altKey && ["i", "j", "c"].includes(key));

        if (blocked) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  return null;
}
