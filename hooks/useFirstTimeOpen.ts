import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useFirstTimeOpen() {
  const [isFirstTimeOpen, setIsFirstTimeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkFirstTimeOpen() {
      try {
        const hasOpened = await AsyncStorage.getItem("hasOpened");
        if (hasOpened === null) {
          setIsFirstTimeOpen(true);
        } else {
          setIsFirstTimeOpen(false);
        }
      } catch (error) {
        console.error("error occured", error);
      } finally {
        setIsLoading(false);
      }
    }
    checkFirstTimeOpen();
  }, []);

  return { isFirstTimeOpen, isLoading };
}
