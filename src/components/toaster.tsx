"use client";

import { useEffect } from "react";
import { mountToaster } from "gooey-toast";
import "gooey-toast/styles.css";

export function ToasterInit() {
  useEffect(() => {
    mountToaster({ position: "top-right" });
  }, []);

  return null;
}
