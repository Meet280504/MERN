import React, { useState, useEffect } from "react";

export default function FileUploader() {
    const [file, setFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);

    const handleFile = (selectedFile) => {
        if (!selectedFile) return;

        if (selectedFile.type.startsWith("image/")) {
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }

            setFile(selectedFile);
            setPreviewURL(URL.createObjectURL(selectedFile));
        } else {
            alert("Only images JPG, PNG, GIF etc.");
            setFile(null);
            setPreviewURL(null);
        }
    };

    const handleFileChange = (e) => handleFile(e.target.files[0]);
    const handleDrop = (e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
    };
    const handleDragOver = (e) => e.preventDefault();

    useEffect(() => {
        return () => {
            if (previewURL) URL.revokeObjectURL(previewURL);
        };
    }, [previewURL]);

    return (
        <div className="flex  max-w-7xl mx-auto w-full h-full gap-6 ">
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="w-full flex-1 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-lg  cursor-pointer hover:border-blue-500 transition-colors relative"
            >
                <p>Drag & Drop image here or click to select</p>
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>

            <div className="flex-1 w-full">


                {previewURL && (
                    <>
                        <div className="overflow-hidden flex items-center">
                            <img src={previewURL} alt="Preview" className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <p className="mt-2 text-gray-700">File name: {file.name}</p>

                    </>
                )
                }

                <p className="text-sm text-gray-500 mt-2">
                    Supported files: Images (jpg, png, gif, etc.)
                </p>
            </div>
        </div >
    );
}
