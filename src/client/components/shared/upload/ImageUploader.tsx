import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useUploadImageHandler } from "../../hooks/use-uploadimage";
import { Button } from "@/components/ui/button";
import { FileUploaderProps, FileWithPreview } from "@/client/types";
import { useUserContext } from "@/client/services/context/user/UseContext";

const ImageUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [previewImage, setPreviewImage] = useState(mediaUrl);
  const [message, setMessage] = useState<string>("");
  const { handleImageUpload } = useUploadImageHandler();
  const { user } = useUserContext();

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      }) as FileWithPreview;
      setFiles([fileWithPreview]);
      setPreviewImage(URL.createObjectURL(file));
      fieldChange([file]);
      handleUpload(file);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length > 0) {
        const filesWithPreview = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ) as FileWithPreview[];
        setFiles(filesWithPreview);
        fieldChange(acceptedFiles);
        handleUpload(acceptedFiles[0]);
      }
    },
    [fieldChange]
  );

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("images", file);
      const uploadedImage = await handleImageUpload({
        imageUrl: file.name,
        creator_id: Number(user?.id),
        created_at: new Date(),
      });
      console.log("Uploaded image", uploadedImage);
      setMessage("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg"
    >
      <input
        {...getInputProps()}
        id="fileInput"
        type="file"
        formMethod="POST"
        name="images"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            selectFile(e);
          }
        }}
        className="cursor-pointer hidden"
      />
      {previewImage ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img
              src={previewImage}
              alt="image-preview"
              loading="lazy"
              className="file_uploader-img"
            />
          </div>
          <p className="file_uploader-label">Click or Drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            loading="lazy"
            width={96}
            height={77}
            className="file_uploader-icon"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag and drop your image here
          </h3>
          <p className="text-light-4 small-regular mb-6">
            SVG, PNG, JPG, JPEG accepted
          </p>
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById("fileInput")?.click();
              handleUpload;
            }}
            className="shad-button_dark_4"
          >
            Browse Files
          </Button>
        </div>
      )}
      {message && <p className="text-red-500 text-sm">{message}</p>}
    </div>
  );
};

export default ImageUploader;
