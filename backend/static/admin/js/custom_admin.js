// Custom Admin JavaScript for Chabighar

document.addEventListener('DOMContentLoaded', function() {
    // Image Preview Functionality
    function addImagePreview() {
        const imageFields = document.querySelectorAll('input[type="file"][accept*="image"]');
        
        imageFields.forEach(function(field) {
            field.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        // Remove existing preview
                        const existingPreview = field.parentNode.querySelector('.image-preview');
                        if (existingPreview) {
                            existingPreview.remove();
                        }
                        
                        // Create new preview
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.className = 'image-preview';
                        img.style.maxWidth = '200px';
                        img.style.maxHeight = '200px';
                        img.style.marginTop = '10px';
                        img.style.borderRadius = '8px';
                        img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                        
                        // Add click to enlarge
                        img.addEventListener('click', function() {
                            openImageModal(e.target.result);
                        });
                        
                        field.parentNode.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }

    // Image Modal for Full Size View
    function openImageModal(src) {
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = src;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        // Close on click
        modal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Close on escape key
        const escapeHandler = function(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    // Enhanced Image Gallery for Existing Images
    function enhanceImageGallery() {
        const imageLinks = document.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"], a[href$=".webp"]');
        
        imageLinks.forEach(function(link) {
            // Create thumbnail if it doesn't exist
            if (!link.querySelector('img')) {
                const img = document.createElement('img');
                img.src = link.href;
                img.className = 'image-preview';
                img.style.cssText = `
                    max-width: 100px;
                    max-height: 100px;
                    margin-right: 10px;
                    border-radius: 4px;
                    vertical-align: middle;
                `;
                link.insertBefore(img, link.firstChild);
            }
            
            // Prevent default link behavior and open modal
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openImageModal(link.href);
            });
        });
    }

    // Status Badge Enhancement
    function enhanceStatusBadges() {
        const statusCells = document.querySelectorAll('td, th');
        
        statusCells.forEach(function(cell) {
            const text = cell.textContent.trim().toLowerCase();
            if (['new', 'contacted', 'in progress', 'completed', 'cancelled'].includes(text)) {
                cell.innerHTML = `<span class="status-badge status-${text.replace(' ', '-')}">${cell.textContent}</span>`;
            }
        });
    }

    // Auto-refresh for Real-time Updates
    function setupAutoRefresh() {
        // Only on list pages
        if (window.location.href.includes('changelist')) {
            // Add refresh button
            const refreshBtn = document.createElement('button');
            refreshBtn.innerHTML = '🔄 Refresh';
            refreshBtn.className = 'btn btn-sm btn-outline-primary';
            refreshBtn.style.marginLeft = '10px';
            
            refreshBtn.addEventListener('click', function() {
                location.reload();
            });
            
            const toolbar = document.querySelector('.object-tools');
            if (toolbar) {
                toolbar.appendChild(refreshBtn);
            }
        }
    }

    // Form Validation Enhancement
    function enhanceFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(function(field) {
                    if (!field.value.trim()) {
                        field.style.borderColor = '#dc3545';
                        field.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
                        isValid = false;
                    } else {
                        field.style.borderColor = '';
                        field.style.boxShadow = '';
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    alert('Please fill in all required fields.');
                }
            });
        });
    }

    // Bulk Action Confirmation
    function enhanceBulkActions() {
        const actionSelect = document.querySelector('select[name="action"]');
        const goButton = document.querySelector('button[name="index"]');
        
        if (actionSelect && goButton) {
            goButton.addEventListener('click', function(e) {
                const action = actionSelect.value;
                const selectedItems = document.querySelectorAll('input[name="_selected_action"]:checked');
                
                if (action && selectedItems.length > 0) {
                    if (action.includes('delete')) {
                        if (!confirm(`Are you sure you want to delete ${selectedItems.length} item(s)?`)) {
                            e.preventDefault();
                        }
                    }
                }
            });
        }
    }

    // Search Enhancement
    function enhanceSearch() {
        const searchInput = document.querySelector('#searchbar');
        if (searchInput) {
            // Add search suggestions or auto-complete functionality
            searchInput.addEventListener('input', function() {
                // You can add AJAX search suggestions here
                console.log('Search input:', this.value);
            });
        }
    }

    // Initialize all enhancements
    addImagePreview();
    enhanceImageGallery();
    enhanceStatusBadges();
    setupAutoRefresh();
    enhanceFormValidation();
    enhanceBulkActions();
    enhanceSearch();

    // Success notification for saved items
    if (window.location.search.includes('saved')) {
        const notification = document.createElement('div');
        notification.innerHTML = '✅ Successfully saved!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            z-index: 9999;
        `;
        document.body.appendChild(notification);
        
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 3000);
    }
});

// Utility Functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Copied to clipboard: ' + text);
    });
}