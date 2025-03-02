import React from 'react';
import { BsImage } from 'react-icons/bs';
import '../../utils/editorStyles.css';
import ComponentIcon from './ComponentIcon';

const ImageUploader = ({
  image,
  onImageChange,
  imageName,
  icon: Icon = BsImage, // Default to BsImage if no icon is provided
}) => {
  return (
    <div className="flex mb-1 gap-3">
      <ComponentIcon icon={Icon} divStyle="items-center" />

      {/* Image Preview and File Upload */}
      <div className="w-full">
        <div className="flex gap-5 mb-1 text-[12px]">
          {image && (
            <img
              src={image}
              alt="Uploaded preview"
              className="h-16 w-16 object-contain rounded-md"
              onError={(e) => {
                // If there's an error loading the image, set it to the placeholder image
                e.currentTarget.src = '/placeholder-image.jpg';
              }}
            />
          )}

          <label
            htmlFor={imageName}
            className="flex w-32 h-6 gap-2 border rounded-full bg-[#f8fafc] text-xs cursor-pointer justify-center hover:transition-all hover:bg-[#09244B] hover:text-white"
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <span>Upload</span>
          </label>
          <input
            type="file"
            id={imageName}
            onChange={onImageChange}
            className="hidden"
            accept=".jpeg, .jpg, .png"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
