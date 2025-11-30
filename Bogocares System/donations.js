// Donations page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Save donation button functionality
    document.getElementById('saveDonationBtn').addEventListener('click', function() {
        const form = document.getElementById('addDonationForm');
        if (form.checkValidity()) {
            // In a real application, you would send data to server here
            alert('Donation added successfully!');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addDonationModal'));
            modal.hide();
            form.reset();
        } else {
            form.reportValidity();
        }
    });
    
    // Search functionality
    document.getElementById('searchDonations').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#donationsTable tbody tr');
        
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
        const rows = document.querySelectorAll('#donationsTable tbody tr');
        
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
        alert('Exporting donation data...');
        // In a real application, this would trigger a file download
    });
    
    // Print button functionality
    document.getElementById('printBtn').addEventListener('click', function() {
        window.print();
    });
    
    // View donation functionality
    document.querySelectorAll('.view-donation').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const donationId = row.cells[0].textContent;
            const donorName = row.cells[1].textContent;
            const amount = row.cells[2].textContent;
            alert(`Viewing donation: ${donationId}\nDonor: ${donorName}\nAmount: ${amount}`);
            // In a real application, this would open a detailed view modal
        });
    });
    
    // Edit donation functionality
    document.querySelectorAll('.edit-donation').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const donationId = row.cells[0].textContent;
            const donorName = row.cells[1].textContent;
            alert(`Editing donation: ${donationId} from ${donorName}`);
            // In a real application, this would open an edit modal with pre-filled data
        });
    });
    
    // Refund donation functionality
    document.querySelectorAll('.refund-donation').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const donationId = row.cells[0].textContent;
            const amount = row.cells[2].textContent;
            
            if (confirm(`Are you sure you want to refund donation: ${donationId} (${amount})?`)) {
                // In a real application, this would process a refund
                alert(`Donation ${donationId} refunded successfully!`);
            }
        });
    });
    
    // Initialize donations trend chart
    if (document.getElementById('donationsTrendChart')) {
        const ctx = document.getElementById('donationsTrendChart').getContext('2d');
        const donationsTrendChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Donations ($)',
                    data: [3200, 4500, 5200, 4800, 6100, 7200],
                    backgroundColor: 'rgba(76, 175, 80, 0.7)',
                    borderColor: 'rgb(76, 175, 80)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Set default date to today in the add donation form
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('donationDate').value = today;
});