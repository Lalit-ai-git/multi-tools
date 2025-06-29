// Load header
fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        // Initialize any header-specific functionality
    });

// Load footer
fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

// Load tools categories
fetch('assets/data/tools.json')
    .then(response => response.json())
    .then(data => {
        renderToolsCategories(data);
    });

function renderToolsCategories(toolsData) {
    const categoriesSection = document.querySelector('.tools-categories');
    let html = '';
    
    for (const category in toolsData) {
        html += `
        <div class="category-section mb-5">
            <h2 class="category-title mb-4">${category.replace(/-/g, ' ').toUpperCase()}</h2>
            <div class="row tools-grid">
                ${toolsData[category].map(tool => `
                <div class="col-md-3 col-sm-6 mb-4 tool-card" data-tags="${tool.tags.join(' ')}">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${tool.name}</h5>
                            <p class="card-text">${tool.description}</p>
                            <a href="${tool.path}" class="btn btn-primary">Use Tool</a>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>`;
    }
    
    categoriesSection.innerHTML = html;
}
