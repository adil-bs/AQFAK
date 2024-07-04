import { useState } from "react";

export default function useImagePermission() {
    
    const [selectedImage, setSelectedImage] = useState(null);

    const getPermissionAsync = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission denied!');
        }
    };

    const pickImage = async () => {
        getPermissionAsync();
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
          });
          if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
          } else {
            console.log('Image picking cancelled');
          }
        } catch (error) {
          console.error('Error picking image:', error);
        }
      };
  return {selectedImage,pickImage}
}