import { useState, useCallback } from 'react';
import { api } from '../utils/api';

interface UploadResponse {
  url: string;
}

export function useMediaUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const uploadImage = useCallback(async (file: File) => {
    setUploading(true);
    setUploadError(null);
    setUploadedUrl(null);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json() as UploadResponse;
      setUploadedUrl(data.url);
      return data.url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setUploadError(errorMessage);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  const removeImage = useCallback(() => {
    setUploadedUrl(null);
    setUploadError(null);
  }, []);

  return { uploadImage, uploading, uploadError, uploadedUrl, removeImage };
}