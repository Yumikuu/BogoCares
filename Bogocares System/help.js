// Help page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Submit support request functionality
    document.getElementById('submitSupportRequestBtn').addEventListener('click', function() {
        const form = document.getElementById('contactSupportForm');
        if (form.checkValidity()) {
            // In a real application, this would send the support request
            alert('Support request submitted successfully! Our team will get back to you within 24 hours.');
            
            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('contactSupportModal'));
            modal.hide();
            
            // Reset the form
            form.reset();
        } else {
            form.reportValidity();
        }
    });
    
    // Search functionality for FAQ
    const faqSearch = document.createElement('div');
    faqSearch.className = 'mb-3';
    faqSearch.innerHTML = `
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search FAQ..." id="faqSearch">
            <button class="btn btn-primary-custom" type="button">
                <i class="bi bi-search"></i>
            </button>
        </div>
    `;
    
    // Insert search above FAQ accordion
    const faqAccordion = document.getElementById('faqAccordion');
    faqAccordion.parentNode.insertBefore(faqSearch, faqAccordion);
    
    // FAQ search functionality
    document.getElementById('faqSearch').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = '';
                
                // Open the accordion item if it contains the search term
                const collapse = item.querySelector('.accordion-collapse');
                if (!collapse.classList.contains('show')) {
                    const button = item.querySelector('.accordion-button');
                    button.click();
                }
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});