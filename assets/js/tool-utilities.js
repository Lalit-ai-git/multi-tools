class ToolUtils {
    static async loadFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    
    static downloadFile(data, filename, type = 'text/plain') {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }
    
    static createDragDropZone(zoneElement, inputElement, callback) {
        zoneElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            zoneElement.classList.add('dragover');
        });
        
        ['dragleave', 'dragend'].forEach(type => {
            zoneElement.addEventListener(type, () => {
                zoneElement.classList.remove('dragover');
            });
        });
        
        zoneElement.addEventListener('drop', (e) => {
            e.preventDefault();
            zoneElement.classList.remove('dragover');
            
            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                callback(e.dataTransfer.files[0]);
            }
        });
    }
    
    static formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    
    static debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
}
