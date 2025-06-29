class ToolSearch {
    constructor() {
        this.searchInput = document.getElementById('toolSearch');
        this.toolCards = document.querySelectorAll('.tool-card');
        this.categorySections = document.querySelectorAll('.category-section');
        this.noResults = document.getElementById('noResults');
        
        this.init();
    }
    
    init() {
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.searchInput.addEventListener('keydown', this.handleKeyNavigation.bind(this));
    }
    
    handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        let hasResults = false;
        
        this.categorySections.forEach(section => {
            let categoryHasResults = false;
            const cards = section.querySelectorAll('.tool-card');
            
            cards.forEach(card => {
                const isMatch = this.checkCardMatch(card, searchTerm);
                card.style.display = isMatch ? 'block' : 'none';
                
                if (isMatch) {
                    categoryHasResults = true;
                    hasResults = true;
                }
            });
            
            section.style.display = categoryHasResults ? 'block' : 'none';
        });
        
        this.noResults.style.display = hasResults ? 'none' : 'block';
    }
    
    checkCardMatch(card, searchTerm) {
        if (!searchTerm) return true;
        
        const toolName = card.querySelector('.card-title').textContent.toLowerCase();
        const toolDesc = card.querySelector('.card-text').textContent.toLowerCase();
        const toolTags = card.dataset.tags.toLowerCase();
        
        return toolName.includes(searchTerm) || 
               toolDesc.includes(searchTerm) || 
               toolTags.includes(searchTerm);
    }
    
    handleKeyNavigation(e) {
        // Add keyboard navigation for accessibility
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const visibleCards = [...document.querySelectorAll('.tool-card[style="display: block;"]')];
            const currentIndex = visibleCards.findIndex(card => card === document.activeElement);
            
            if (e.key === 'ArrowDown' && currentIndex < visibleCards.length - 1) {
                visibleCards[currentIndex + 1].focus();
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                visibleCards[currentIndex - 1].focus();
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ToolSearch();
});
