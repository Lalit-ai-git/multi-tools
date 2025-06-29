document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const originalImage = document.getElementById('originalImage');
    const convertedCanvas = document.getElementById('convertedCanvas');
    const convertedImage = document.getElementById('convertedImage');
    const placeholderText = document.getElementById('placeholderText');
    const convertBtn = document.getElementById('convertBtn');
    const resetBtn = document.getElementById('resetBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const optionsSection = document.getElementById('optionsSection');
    
    let currentFile = null;
    
    // Event listeners
    selectFileBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('drop', handleDrop);
    convertBtn.addEventListener('click', convertToPNG);
    resetBtn.addEventListener('click', resetTool);
    
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file && file.type.match('image.*')) {
            processFile(file);
        } else {
            alert('Please select a valid image file.');
        }
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        dropArea.classList.add('dragover');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        dropArea.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.match('image.*')) {
            processFile(file);
        } else {
            alert('Please drop a valid image file.');
        }
    }
    
    function processFile(file) {
        currentFile = file;
        const reader = new FileReader();
        
        reader.onload = function(e) {
            originalImage.src = e.target.result;
            optionsSection.classList.remove('d-none');
        };
        
        reader.readAsDataURL(file);
    }
    
    function convertToPNG() {
        if (!currentFile) return;
        
        const img = new Image();
        img.onload = function() {
            convertedCanvas.width = img.width;
            convertedCanvas.height = img.height;
            
            const ctx = convertedCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            const pngData = convertedCanvas.toDataURL('image/png');
            convertedImage.src = pngData;
            
            convertedImage.classList.remove('d-none');
            placeholderText.classList.add('d-none');
            downloadBtn.classList.remove('d-none');
            downloadBtn.href = pngData;
        };
        
        img.src = URL.createObjectURL(currentFile);
    }
    
    function resetTool() {
        fileInput.value = '';
        originalImage.src = '';
        convertedImage.src = '';
        convertedImage.classList.add('d-none');
        placeholderText.classList.remove('d-none');
        downloadBtn.classList.add('d-none');
        optionsSection.classList.add('d-none');
        currentFile = null;
    }
});
