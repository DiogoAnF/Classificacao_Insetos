// InsectCatalog JavaScript Application

class InsectCatalog {
    constructor() {
        this.insects = [];
        this.filteredInsects = [];
        this.filters = {};
        this.currentView = 'grid';
        
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.setupEventListeners();
            this.renderFilters();
            this.renderGallery();
            this.updateCounts();
        } catch (error) {
            console.error('Erro ao inicializar aplicação:', error);
            this.showError('Erro ao carregar dados. Tente recarregar a página.');
        }
    }

    async loadData() {
        try {
            // Load filters configuration
            const filtersResponse = await fetch('data/filters.json');
            this.filters = await filtersResponse.json();
            
            // Load insects data
            const insectsResponse = await fetch('data/images.json');
            this.insects = await insectsResponse.json();
            this.filteredInsects = [...this.insects];
            
        } catch (error) {
            throw new Error('Falha ao carregar dados: ' + error.message);
        }
    }

    setupEventListeners() {
        // Clear filters button
        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearAllFilters();
        });

        // View mode toggle
        document.querySelectorAll('input[name="view-mode"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentView = e.target.id === 'grid-view' ? 'grid' : 'list';
                this.renderGallery();
            });
        });

        // Window resize handler for responsive adjustments
        window.addEventListener('resize', this.debounce(() => {
            this.renderGallery();
        }, 250));
    }

    renderFilters() {
        const container = document.getElementById('filters-container');
        container.innerHTML = '';

        Object.entries(this.filters.filters).forEach(([key, filter]) => {
            const filterCol = document.createElement('div');
            filterCol.className = 'col-md-3 col-sm-6';
            
            filterCol.innerHTML = `
                <div class="mb-3">
                    <label for="filter-${key}" class="form-label fw-semibold">
                        <i class="bi bi-funnel-fill me-1"></i>
                        ${filter.name}
                    </label>
                    <select class="form-select filter-select" id="filter-${key}" data-filter="${key}">
                        ${filter.options.map(option => 
                            `<option value="${option}">${option}</option>`
                        ).join('')}
                    </select>
                </div>
            `;
            
            container.appendChild(filterCol);
            
            // Add event listener to the select
            const select = filterCol.querySelector('select');
            select.addEventListener('change', (e) => {
                this.applyFilter(key, e.target.value);
            });
        });
    }

    applyFilter(filterType, value) {
        // Show loading state
        this.showLoading();
        
        // Apply filter with a small delay for better UX
        setTimeout(() => {
            if (value === 'Todos') {
                // Remove this filter
                delete this.activeFilters;
                this.filteredInsects = this.insects.filter(insect => {
                    return this.matchesAllFilters(insect);
                });
            } else {
                // Apply filter
                this.filteredInsects = this.insects.filter(insect => {
                    const matches = this.matchesFilter(insect, filterType, value) && 
                                  this.matchesOtherFilters(insect, filterType);
                    return matches;
                });
            }
            
            this.renderGallery();
            this.updateCounts();
            this.hideLoading();
        }, 300);
    }

    matchesFilter(insect, filterType, value) {
        switch(filterType) {
            case 'ordem':
                return insect.ordem === value;
            case 'aparelho_bucal':
                return insect.aparelho_bucal === value;
            case 'asas':
                return insect.asas === value;
            case 'pernas':
                return insect.pernas === value;
            case 'cercos':
                return insect.cercos === value;
            case 'antenas':
                return insect.antenas === value;
            default:
                return true;
        }
    }

    matchesOtherFilters(insect, excludeFilterType) {
        const selects = document.querySelectorAll('.filter-select');
        
        for (let select of selects) {
            const filterType = select.dataset.filter;
            const value = select.value;
            
            if (filterType !== excludeFilterType && value !== 'Todos') {
                if (!this.matchesFilter(insect, filterType, value)) {
                    return false;
                }
            }
        }
        
        return true;
    }

    matchesAllFilters(insect) {
        const selects = document.querySelectorAll('.filter-select');
        
        for (let select of selects) {
            const filterType = select.dataset.filter;
            const value = select.value;
            
            if (value !== 'Todos') {
                if (!this.matchesFilter(insect, filterType, value)) {
                    return false;
                }
            }
        }
        
        return true;
    }

    renderGallery() {
        const container = document.getElementById('gallery-container');
        const noResults = document.getElementById('no-results');
        
        if (this.filteredInsects.length === 0) {
            container.innerHTML = '';
            noResults.classList.remove('d-none');
            return;
        }
        
        noResults.classList.add('d-none');
        
        // Set container class based on view mode
        container.className = this.currentView === 'list' ? 'list-view' : 'row g-4';
        
        container.innerHTML = this.filteredInsects.map(insect => 
            this.createInsectCard(insect)
        ).join('');
        
        // Add animation to cards
        this.animateCards();
    }

    createInsectCard(insect) {
        const cardClass = this.currentView === 'list' ? 'col-12' : 'col-lg-4 col-md-6 col-sm-12';
        const cardStructure = this.currentView === 'list' ? 'card insect-card d-flex' : 'card insect-card h-100';
        
        return `
            <div class="${cardClass}">
                <div class="${cardStructure}" data-insect-id="${insect.id}">
                    <img src="${insect.src}" class="card-img-top insect-image" alt="${insect.alt}" loading="lazy">
                    <div class="card-body insect-info">
                        <h5 class="card-title fw-bold text-primary">${insect.alt}</h5>
                        <div class="mb-3">
                            <span class="badge insect-badge badge-ordem me-1">
                                <i class="bi bi-bug me-1"></i>${insect.ordem}
                            </span>
                            <span class="badge insect-badge badge-aparelho me-1">
                                <i class="bi bi-mouth me-1"></i>${insect.aparelho_bucal}
                            </span>
                            <span class="badge insect-badge badge-asas me-1">
                                <i class="bi bi-airplane me-1"></i>${insect.asas}
                            </span>
                            <span class="badge insect-badge badge-pernas me-1">
                                <i class="bi bi-person-walking me-1"></i>${insect.pernas}
                            </span>
                            <span class="badge insect-badge badge-cercos me-1">
                                <i class="bi bi-arrow-up-right me-1"></i>${insect.cercos}
                            </span>
                            <span class="badge insect-badge badge-antenas">
                                <i class="bi bi-broadcast me-1"></i>${insect.antenas}
                            </span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm" onclick="app.showInsectDetails('${insect.id}')">
                            <i class="bi bi-eye me-1"></i>Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    animateCards() {
        const cards = document.querySelectorAll('.insect-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
    }

    showInsectDetails(insectId) {
        const insect = this.insects.find(i => i.id === insectId);
        if (!insect) return;
        
        // Create modal for insect details
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="bi bi-bug-fill me-2 text-primary"></i>
                            ${insect.alt}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${insect.src}" class="img-fluid rounded" alt="${insect.alt}">
                            </div>
                            <div class="col-md-6">
                                <h6 class="fw-bold mb-3">Características:</h6>
                                <ul class="list-unstyled">
                                    <li class="mb-2">
                                        <strong><i class="bi bi-bug me-2 text-primary"></i>Ordem:</strong> ${insect.ordem}
                                    </li>
                                    <li class="mb-2">
                                        <strong><i class="bi bi-mouth me-2 text-success"></i>Aparelho Bucal:</strong> ${insect.aparelho_bucal}
                                    </li>
                                    <li class="mb-2">
                                        <strong><i class="bi bi-airplane me-2 text-info"></i>Asas:</strong> ${insect.asas}
                                    </li>
                                    <li class="mb-2">
                                        <strong><i class="bi bi-person-walking me-2 text-warning"></i>Pernas:</strong> ${insect.pernas}
                                    </li>
                                    <li class="mb-2">
                                        <strong><i class="bi bi-arrow-up-right me-2 text-danger"></i>Cercos:</strong> ${insect.cercos}
                                    </li>
                                    <li class="mb-2">
                                        <strong><i class="bi bi-broadcast me-2 text-secondary"></i>Antenas:</strong> ${insect.antenas}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        // Remove modal from DOM when hidden
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }

    clearAllFilters() {
        // Reset all select elements to "Todos"
        document.querySelectorAll('.filter-select').forEach(select => {
            select.value = 'Todos';
        });
        
        // Reset filtered insects
        this.filteredInsects = [...this.insects];
        
        // Re-render gallery and update counts
        this.renderGallery();
        this.updateCounts();
        
        // Show success message
        this.showToast('Filtros limpos com sucesso!', 'success');
    }

    updateCounts() {
        document.getElementById('total-insects').textContent = this.insects.length;
        document.getElementById('filtered-count').textContent = this.filteredInsects.length;
    }

    showLoading() {
        document.getElementById('loading-spinner').classList.remove('d-none');
        document.getElementById('gallery-container').style.opacity = '0.5';
    }

    hideLoading() {
        document.getElementById('loading-spinner').classList.add('d-none');
        document.getElementById('gallery-container').style.opacity = '1';
    }

    showError(message) {
        this.showToast(message, 'danger');
    }

    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-check-circle me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        // Create toast container if it doesn't exist
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
        }
        
        container.appendChild(toast);
        
        // Show toast
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove toast from DOM when hidden
        toast.addEventListener('hidden.bs.toast', () => {
            container.removeChild(toast);
        });
    }

    // Utility function for debouncing
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new InsectCatalog();
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation to images
    document.addEventListener('load', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.classList.add('fade-in');
        }
    }, true);
});

