document.getElementById('toolSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const toolName = card.querySelector('.card-title').textContent.toLowerCase();
        const toolDesc = card.querySelector('.card-text').textContent.toLowerCase();
        const toolTags = card.getAttribute('data-tags').toLowerCase();
        
        if (toolName.includes(searchTerm) || 
            toolDesc.includes(searchTerm) || 
            toolTags.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});