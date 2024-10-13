import { IUploadImage } from "@/client/services/react-query/upload/interface";
import { useUploadImage } from "@/client/services/react-query/upload/QueryAndMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

// ** Set up a robust hook to handle image uploading ** //
export const useUploadImageHandler = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useUploadImage(); // ** Use mutateAsync for asynchronous handling ** //
  const [images, setImages] = useState<string[]>([]); // ** Set up state for images ** //

  // ** Handle single image upload ** //
  const handleImageUpload = useCallback(
    async (image: IUploadImage): Promise<any> => {
      try {
        const data = await mutateAsync(image, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["images"] }); // Invalidate the images cache
          },
        });
        return data; // Return the uploaded image data
      } catch (error) {
        console.error("Error uploading image", error);
        return null; // Return null if there's an error
      }
    },
    [mutateAsync, queryClient]
  );

  return { images, setImages, handleImageUpload };
};

export default { useUploadImageHandler };
