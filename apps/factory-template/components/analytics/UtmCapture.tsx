"use client";

import { useEffect } from "react";

import { persistUtmFromLocation } from "@/lib/utm-storage";

export function UtmCapture() {
  useEffect(() => {
    persistUtmFromLocation();
  }, []);

  return null;
}
