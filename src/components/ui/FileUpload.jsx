import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Upload, X, Image as ImageIcon, File, FileText } from 'lucide-react';
import { Button } from './Button';

/**
 * FileUpload Component
 * Drag and drop file upload with preview
 */
export function FileUpload({
  accept,
  multiple = false,
  maxFiles,
  maxSize,
  onFilesChange,
  className,
  label = 'Drop files here or click to upload',
  preview = true,
}) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const validateFile = (file) => {
    if (maxSize && file.size > maxSize) {
      return `File ${file.name} exceeds maximum size of ${formatSize(maxSize)}`;
    }
    if (accept) {
      const acceptedTypes = accept.split(',').map((t) => t.trim());
      const fileType = file.type;
      const fileName = file.name.toLowerCase();
      
      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith('image/')) return fileType.startsWith('image/');
        if (type.startsWith('video/')) return fileType.startsWith('video/');
        if (type.startsWith('audio/')) return fileType.startsWith('audio/');
        if (type === 'application/pdf') return fileType === 'application/pdf' || fileName.endsWith('.pdf');
        if (type.startsWith('.')) return fileName.endsWith(type);
        return fileType === type;
      });

      if (!isAccepted) {
        return `File ${file.name} is not an accepted file type`;
      }
    }
    return null;
  };

  const handleFiles = (newFiles) => {
    const errors = [];
    const validFiles = [];

    Array.from(newFiles).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      console.error(errors);
      return;
    }

    let updatedFiles = multiple ? [...files, ...validFiles] : validFiles;

    if (maxFiles && updatedFiles.length > maxFiles) {
      updatedFiles = updatedFiles.slice(0, maxFiles);
    }

    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return ImageIcon;
    if (file.type === 'application/pdf') return FileText;
    return File;
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
          isDragging && 'border-primary bg-primary/5',
          !files.length && 'hover:border-primary/50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />
        
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">{label}</p>
        {accept && (
          <p className="mt-2 text-xs text-muted-foreground">
            Accepted: {accept}
            {maxSize && ` (Max: ${formatSize(maxSize)})`}
          </p>
        )}
      </div>

      {files.length > 0 && preview && (
        <div className={cn(
          'grid gap-4',
          multiple ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1'
        )}>
          {files.map((file, index) => {
            const Icon = getFileIcon(file);
            const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;

            return (
              <div
                key={index}
                className="relative rounded-lg border bg-card overflow-hidden group"
              >
                {previewUrl ? (
                  <div className="aspect-square relative">
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square flex items-center justify-center bg-muted">
                    <Icon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                </div>

                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * ImageUpload Component
 * Specialized file upload for images with crop preview
 */
export function ImageUpload({
  value,
  onChange,
  multiple = false,
  maxImages = 4,
  className,
}) {
  const [images, setImages] = useState(value || []);

  const handleFilesChange = (newFiles) => {
    const imageUrls = newFiles.map((file) => URL.createObjectURL(file));
    const updatedImages = multiple ? [...images, ...imageUrls] : [imageUrls[0]];
    
    setImages(updatedImages);
    onChange?.(updatedImages);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onChange?.(updatedImages);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <FileUpload
        accept="image/*"
        multiple={multiple}
        maxFiles={maxImages}
        onFilesChange={handleFilesChange}
        label="Drop images here or click to upload"
      />

      {images.length > 0 && (
        <div className={cn(
          'grid gap-4',
          multiple ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1'
        )}>
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="relative rounded-lg border overflow-hidden group aspect-square"
            >
              <img
                src={imageUrl}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
