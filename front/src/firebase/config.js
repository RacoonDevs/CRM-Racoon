import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyB0qohPxkNWXjq37Uc9cDZAxVY3J3r0O5w",
  authDomain: "crm-racoon.firebaseapp.com",
  projectId: "crm-racoon",
  storageBucket: "crm-racoon.appspot.com",
  messagingSenderId: "409942519422",
  appId: "1:409942519422:web:8cef3fd05aacbbade9322f",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
  const name = uuidv4();

  const storageRef = ref(storage, `photo_profile/${name}`);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

export function deleteProfileImage(file) {
  const desertRef = ref(storage, `photo_profile/${file}`);

  deleteObject(desertRef)
    .then((data) => {
      console.log("objeto eliminado: ", data);
    })
    .catch((err) => {
      console.log("err", err);
    });
}
