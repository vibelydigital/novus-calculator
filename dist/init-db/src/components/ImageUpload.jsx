"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_dropzone_1 = require("react-dropzone");
const outline_1 = require("@heroicons/react/24/outline");
const image_1 = __importDefault(require("next/image"));
const ImageUpload = ({ value, onChange, onError, className = '', maxSize = 5 * 1024 * 1024, // 5MB default
accept = ['image/jpeg', 'image/png', 'image/webp'], label = 'Upload Image' }) => {
    const [preview, setPreview] = (0, react_1.useState)(value || null);
    const [error, setError] = (0, react_1.useState)(null);
    const onDrop = (0, react_1.useCallback)((acceptedFiles) => {
        const file = acceptedFiles[0];
        // Validate file size
        if (file.size > maxSize) {
            const errorMessage = `File size must be less than ${maxSize / (1024 * 1024)}MB`;
            setError(errorMessage);
            onError === null || onError === void 0 ? void 0 : onError(errorMessage);
            return;
        }
        // Validate file type
        if (!accept.includes(file.type)) {
            const errorMessage = `File type must be one of: ${accept.join(', ')}`;
            setError(errorMessage);
            onError === null || onError === void 0 ? void 0 : onError(errorMessage);
            return;
        }
        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            setPreview(result);
            onChange(result);
            setError(null);
        };
        reader.readAsDataURL(file);
    }, [maxSize, accept, onChange, onError]);
    const { getRootProps, getInputProps, isDragActive } = (0, react_dropzone_1.useDropzone)({
        onDrop,
        accept: accept.reduce((acc, type) => (Object.assign(Object.assign({}, acc), { [type]: [] })), {}),
        maxFiles: 1,
        multiple: false
    });
    const handleRemove = (e) => {
        e.stopPropagation();
        setPreview(null);
        onChange('');
        setError(null);
    };
    return (<div className={`w-full ${className}`}>
      {label && (<label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>)}
      
      <div {...getRootProps()} className={`
          relative border-2 border-dashed rounded-lg p-4
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
          ${error ? 'border-red-500' : ''}
          ${preview ? 'h-48' : 'h-32'}
          transition-colors duration-200
          cursor-pointer
          hover:border-primary/50
        `}>
        <input {...getInputProps()}/>
        
        {preview ? (<div className="relative w-full h-full">
            <image_1.default src={preview} alt="Preview" fill className="object-contain rounded-md"/>
            <button onClick={handleRemove} className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
              <outline_1.XMarkIcon className="w-5 h-5 text-gray-500"/>
            </button>
          </div>) : (<div className="flex flex-col items-center justify-center h-full text-gray-500">
            <outline_1.PhotoIcon className="w-8 h-8 mb-2"/>
            <p className="text-sm text-center">
              {isDragActive ? ("Drop the image here") : (<>
                  Drag and drop an image here, or click to select
                  <br />
                  <span className="text-xs">
                    Supported formats: {accept.map(type => type.split('/')[1]).join(', ')}
                  </span>
                </>)}
            </p>
          </div>)}
      </div>

      {error && (<p className="mt-2 text-sm text-red-500">
          {error}
        </p>)}

      <p className="mt-2 text-xs text-gray-500">
        Maximum file size: {maxSize / (1024 * 1024)}MB
      </p>
    </div>);
};
exports.default = ImageUpload;
