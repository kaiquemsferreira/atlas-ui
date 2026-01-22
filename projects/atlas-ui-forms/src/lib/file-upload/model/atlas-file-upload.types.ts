export type AtlasUploadStatus = 'queued' | 'uploading' | 'success' | 'error';

export type AtlasFileUploadMode = 'dropzone' | 'compact' | 'url' | 'dialog';
export type AtlasFileUploadSelector = 'dropzone' | 'compact';
export type AtlasFileUploadLayout = 'inline' | 'dialog';

export interface AtlasUploadItem {
  id: string;
  name: string;
  sizeBytes?: number;
  status: AtlasUploadStatus;
  progress?: number;
  transferredBytes?: number;
  errorKey?: string;
  meta?: Record<string, unknown>;
}

export interface AtlasSelectedFile {
  file: File;
  valid: boolean;
  errorKey?: string;
}
