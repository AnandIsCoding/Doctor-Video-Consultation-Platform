"use client";

import { useState, useCallback } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const useToastAlert = () => {
  const [toastType, setToastType] = useState<"success" | "destructive" | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");

  const showToast = useCallback(
    (type: "success" | "destructive", message: string) => {
      setToastType(type);
      setToastMessage(message);
      setTimeout(() => {
        setToastType(null);
        setToastMessage("");
      }, 3000); // Auto close after 3 seconds
    },
    []
  );

  const Toast = toastType ? (
    <Alert
      className={`absolute top-4 left-1/2 -translate-x-1/2 w-full px-6 md:mx-8 md:w-fit z-50 shadow-lg rounded-lg ${
        toastType === "destructive"
          ? "bg-red-200 text-red-800 border border-red-400"
          : "bg-green-200 text-green-800 border border-green-400"
      }`}
    >
      <AlertTitle className="font-semibold">
        {toastType === "destructive" ? "Error" : "Success"}
      </AlertTitle>
      <AlertDescription>{toastMessage}</AlertDescription>
    </Alert>
  ) : null;

  return { showToast, Toast };
};
