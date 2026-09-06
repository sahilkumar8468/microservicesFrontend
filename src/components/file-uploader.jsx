'use client';
import { useState, useRef } from 'react';
import { Upload, X, Image, Camera } from 'lucide-react';

export function FileUploader({ maxFiles = 5, accept = 'image/*', label = 'Upload Photos', onFilesChange }) {
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  function handleFiles(newFiles) {
    const fileArray = Array.from(newFiles);
    const updated = [...files, ...fileArray].slice(0, maxFiles);
    setFiles(updated);
    onFilesChange?.(updated);
  }

  function removeFile(index) {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChange?.(updated);
  }

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 sm:p-8 text-center cursor-pointer transition-colors ${
          dragOver ? 'border-brand-500 bg-brand-50' : 'border-surface-300 hover:border-brand-400 hover:bg-surface-50'
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-50 flex items-center justify-center">
            {accept.includes('video') ? (
              <Camera size={20} className="text-brand-600" />
            ) : (
              <Image size={20} className="text-brand-600" />
            )}
          </div>
          <div>
            <span className="text-brand-600 font-semibold text-xs sm:text-sm">{label}</span>
            <span className="text-surface-500 text-xs sm:text-sm"> or drag and drop</span>
          </div>
          <p className="text-[11px] sm:text-xs text-surface-400">
            {accept.includes('video') ? 'MP4, MOV up to 50MB' : 'PNG, JPG up to 10MB each'}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {files.map((file, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden bg-surface-100 aspect-square">
              {file.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Upload size={24} className="text-surface-400" />
                </div>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="absolute top-1 right-1 w-6 h-6 bg-surface-900/80 rounded-full flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                aria-label={`Remove file ${i + 1}`}
              >
                <X size={14} className="text-white" />
              </button>
            </div>
          ))}
          {files.length < maxFiles && (
            <button
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-surface-300 flex items-center justify-center hover:border-brand-400 transition-colors"
            >
              <Upload size={20} className="text-surface-400" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
