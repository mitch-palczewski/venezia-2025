import imageCompression from "browser-image-compression";

export async function uploadScreenshot(blob: Blob) {

    const options = {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp'
    };
    
    const compressedBlob = await imageCompression(blob as File, options);
	try {
		const formData = new FormData();
		formData.append('screenshot', compressedBlob, `screenshot-${Date.now()}.webp`);

		const response = await fetch('/api/upload-screenshot', {
			method: 'POST',
			body: formData
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || 'Upload failed');
		}
		const result = await response.json();
		console.log('Successfully uploaded to:', result.url);
		return result.url;
	} catch (err) {
		console.error('Error uploading screenshot:', err);
		throw err;
	}
}
