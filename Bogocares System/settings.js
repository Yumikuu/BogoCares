// Settings page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Save settings functionality
    document.getElementById('saveSettingsBtn').addEventListener('click', function() {
        // In a real application, this would save all settings to the server
        alert('Settings saved successfully!');
        
        // Show a success message
        showAlert('Settings have been updated successfully.', 'success');
    });
    
    // Reset settings functionality
    document.getElementById('resetSettingsBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all settings to their default values? This action cannot be undone.')) {
            // In a real application, this would reset all settings
            alert('Settings have been reset to default values.');
            
            // Show a success message
            showAlert('Settings have been reset to default values.', 'info');
        }
    });
    
    // Create backup functionality
    document.getElementById('createBackupBtn').addEventListener('click', function() {
        // In a real application, this would create a backup
        alert('Backup created successfully!');
        
        // Show a success message
        showAlert('Backup has been created successfully.', 'success');
    });
    
    // Restore backup functionality
    document.getElementById('restoreBackupBtn').addEventListener('click', function() {
        const backupFile = document.getElementById('backupFile').files[0];
        if (!backupFile) {
            alert('Please select a backup file to restore.');
            return;
        }
        
        if (confirm('WARNING: Restoring from a backup will overwrite all current data. This action cannot be undone. Are you sure you want to continue?')) {
            // In a real application, this would restore from the backup file
            alert('Data restored successfully from backup!');
            
            // Show a success message
            showAlert('Data has been restored from backup.', 'success');
        }
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Function to show alert messages
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at the top of the page content
    const pageContent = document.querySelector('.container-fluid.py-4');
    pageContent.insertBefore(alertDiv, pageContent.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Form validation for settings
function validateSettings() {
    // Add validation logic here for different settings forms
    // This is a simplified example
    const orgName = document.getElementById('orgName').value;
    const orgEmail = document.getElementById('orgEmail').value;
    
    if (!orgName || !orgEmail) {
        showAlert('Please fill in all required fields.', 'danger');
        return false;
    }
    
    return true;
}