import React, { useCallback, useState, useRef } from 'react';
import { UploadIcon, FileIcon, XIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { Tooltip } from './Tooltip';
interface ValidationResult {
  isValid: boolean;
  message: string;
  type: 'success' | 'error' | 'warning';
}
export function UploadSection() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const validateFile = useCallback((file: File): ValidationResult => {
    const allowedTypes = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        message: 'Please upload a valid file type (GIF, JPG, PNG, JPEG, PDF)',
        type: 'error'
      };
    }
    if (file.size > maxSize) {
      return {
        isValid: false,
        message: 'File size must be less than 20MB',
        type: 'error'
      };
    }
    return {
      isValid: true,
      message: 'File is valid and ready for analysis',
      type: 'success'
    };
  }, []);
  const generateThumbnail = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        setThumbnail(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnail(null);
    }
  }, []);
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);
  const handleFile = useCallback(async (file: File) => {
    setIsUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const validationResult = validateFile(file);
    setValidation(validationResult);
    if (validationResult.isValid) {
      setUploadedFile(file);
      generateThumbnail(file);
    }
    setIsUploading(false);
  }, [validateFile, generateThumbnail]);
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);
  const removeFile = useCallback(() => {
    setUploadedFile(null);
    setValidation(null);
    setThumbnail(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);
  return <section className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-8 hover-lift transition-all duration-300 shadow-lg hover:shadow-xl" aria-labelledby="upload-heading">
      <h2 id="upload-heading" className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Upload Visual Content
      </h2>
      <div className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-500 ${dragActive ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 animate-pulse-glow scale-105' : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} role="button" tabIndex={0} aria-label="Drag and drop files here or click to select" onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInputRef.current?.click();
      }
    }}>
        <input ref={fileInputRef} type="file" className="sr-only" accept=".gif,.jpg,.jpeg,.png,.pdf" onChange={handleInputChange} aria-describedby="upload-description" />
        {isUploading ? <div className="flex flex-col items-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Processing your file...
            </p>
          </div> : !uploadedFile ? <>
            <UploadIcon className={`mx-auto h-12 w-12 text-purple-600 mb-4 transition-all duration-500 ${dragActive ? 'animate-bounce-subtle scale-110' : 'animate-floating'}`} aria-hidden="true" />
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Drag and drop your files here
            </p>
            <p id="upload-description" className="text-gray-600 dark:text-gray-300 mb-4">
              Support for images (GIF, JPG, PNG, JPEG), PDFs, and web
              screenshots
              <br />
              Maximum file size: 20MB
            </p>
            <Tooltip content="Click to browse files from your device">
              <button type="button" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg" onClick={() => fileInputRef.current?.click()}>
                Select File
              </button>
            </Tooltip>
          </> : <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4 animate-scroll-fade-up">
              {thumbnail ? <img src={thumbnail} alt="File thumbnail" className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600" /> : <FileIcon className="h-8 w-8 text-purple-600" aria-hidden="true" />}
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  {uploadedFile.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Tooltip content="Remove this file">
                <button type="button" className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded transition-all duration-200 hover:scale-110" onClick={removeFile} aria-label="Remove uploaded file">
                  <XIcon className="h-6 w-6" />
                </button>
              </Tooltip>
            </div>
          </div>}
      </div>
      {validation && <div className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${validation.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
          {validation.type === 'success' ? <CheckCircleIcon className="h-5 w-5 text-green-600" /> : <AlertCircleIcon className="h-5 w-5 text-red-600" />}
          <p className={`text-sm font-medium ${validation.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
            {validation.message}
          </p>
        </div>}
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>
          <strong>Tip:</strong> Upload marketing materials, web screenshots, or
          design mockups to analyze color accessibility and CVD impact.
        </p>
      </div>
    </section>;
}