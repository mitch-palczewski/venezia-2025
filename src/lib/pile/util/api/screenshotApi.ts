export async function uploadScreenshot(blob: Blob) {
    try {
        const formData = new FormData();
        formData.append('screenshot', blob, `screenshot-${Date.now()}.png`);

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