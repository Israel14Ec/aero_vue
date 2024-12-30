import { ref, computed } from 'vue';
import { uid } from 'uid';
import { useFirebaseStorage } from 'vuefire';
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

export default function useImage() {
  const url = ref('');
  const storage = useFirebaseStorage();

  const uploadImage = (file) => {
    const filename = uid() + `.${file.name.split('.').pop()}`;
    const sRef = storageRef(storage, '/products/' + filename);

    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(sRef, file);

      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          console.error(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              url.value = downloadUrl;
              resolve(downloadUrl);
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        }
      );
    });
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        await uploadImage(file);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const isImageUploaded = computed(() => {
    return url.value ? url.value : null;
  });

  return {
    url,
    onFileChange,
    isImageUploaded,
  };
}


  //Para mostrar de manera local sin subir a firestorage
    /*
    const shoWImage = (e) => {
        const fileImg = e.target.files[0];
        selectedImage.value = URL.createObjectURL(fileImg);
        console.log(selectedImage.value)
      };
      const isShowImage = computed(() => {
        return selectedImage.value ? selectedImage.value : null;
      });
      */