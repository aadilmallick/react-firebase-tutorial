import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth } from "../firebase";
const storage = getStorage();

/**
 *
 * @param {string} folder
 * @param {File} file
 * @returns {{isloading: boolean, isError: null | Error, uploadFile: Function}}
 */
export const useUpload = (folder) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  /**
   *
   * @param {File} file
   * @returns string
   */
  const uploadFile = async (file) => {
    setIsLoading(true);
    try {
      console.log(auth.currentUser);
      if (!auth.currentUser) {
        throw Error("user not authorized");
      }
      const uploadPath = `${folder}/${auth.currentUser.uid}/${file.name}`;
      const storageRef = ref(storage, uploadPath);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      if (!isCancelled) {
        setIsLoading(false);
      }

      return url;
    } catch (e) {
      console.log(e);
      if (!isCancelled) {
        setIsError(e.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { isLoading, isError, uploadFile };
};
