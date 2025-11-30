// Donors page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Save donor button functionality
    document.getElementById('saveDonorBtn').addEventListener('click', function() {
        const form = document.getElementById('addDonorForm');
        if (form.checkValidity()) {
            // In a real application, you would send data to server here
            alert('Donor added successfully!');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addDonorModal'));
            modal.hide();
            form.reset();
        } else {
            form.reportValidity();
        }
    });
    
    // Search functionality
    document.getElementById('searchDonors').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#donorsTable tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    // Filter by status
    document.getElementById('filterStatus').addEventListener('change', function() {
        const status = this.value;
        const rows = document.querySelectorAll('#donorsTable tbody tr');
        
        rows.forEach(row => {
            if (status === '') {
                row.style.display = '';
            } else {
                const rowStatus = row.querySelector('td:nth-child(7)').textContent.toLowerCase();
                if (rowStatus.includes(status)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    });
    
    // Export button functionality
    document.getElementById('exportBtn').addEventListener('click', function() {
        alert('Exporting donor data...');
        // In a real application, this would trigger a file download
    });
    
    // Print button functionality
    document.getElementById('printBtn').addEventListener('click', function() {
        window.print();
    });
    
    // View donor functionality
    document.querySelectorAll('.view-donor').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const donorId = row.cells[0].textContent;
            const donorName = row.cells[1].textContent;
            alert(`Viewing donor: ${donorName} (${donorId})`);
            // In a real application, this would open a detailed view modal
        });
    });
    
    // Edit donor functionality
    document.querySelectorAll('.edit-donor').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const donorId = row.cells[0].textContent;
            const donorName = row.cells[1].textContent;
            alert(`Editing donor: ${donorName} (${donorId})`);
            // In a real application, this would open an edit modal with pre-filled data
        });
    });
    
    // Delete donor functionality
    document.querySelectorAll('.delete-donor').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const donorId = row.cells[0].textContent;
            const donorName = row.cells[1].textContent;
            
            if (confirm(`Are you sure you want to delete donor: ${donorName} (${donorId})?`)) {
                // In a real application, this would send a delete request to the server
                row.remove();
                alert(`Donor ${donorName} deleted successfully!`);
            }
        });
    });
    
    // Filter by campaign
    document.getElementById('filterCampaign').addEventListener('change', function() {
        const campaign = this.value;
        // In a real application, this would filter donors by their campaign donations
        alert(`Filtering by campaign: ${campaign}`);
    });
});