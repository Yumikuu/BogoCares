// AI Verification System for BogoCares
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AI verification system
    initializeAIVerification();
    
    // Run AI verification when button is clicked
    document.getElementById('runAiVerificationBtn').addEventListener('click', function() {
        runAIVerification();
    });
    
    // Confidence threshold slider
    const confidenceSlider = document.getElementById('aiConfidenceThreshold');
    const thresholdValue = document.getElementById('thresholdValue');
    
    confidenceSlider.addEventListener('input', function() {
        thresholdValue.textContent = this.value + '%';
        updateAIThreshold(this.value);
    });
    
    // Request action handlers
    document.querySelectorAll('.view-request').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const requestId = row.cells[0].textContent;
            viewRequestDetails(requestId);
        });
    });
    
    document.querySelectorAll('.approve-request').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const requestId = row.cells[0].textContent;
            approveRequest(requestId, row);
        });
    });
    
    document.querySelectorAll('.decline-request').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const requestId = row.cells[0].textContent;
            declineRequest(requestId, row);
        });
    });
});

// Initialize AI verification system
function initializeAIVerification() {
    // Load saved settings from localStorage
    const savedThreshold = localStorage.getItem('aiConfidenceThreshold');
    const savedAutoApprove = localStorage.getItem('aiAutoApprove');
    const savedNotification = localStorage.getItem('aiNotification');
    
    if (savedThreshold) {
        document.getElementById('aiConfidenceThreshold').value = savedThreshold;
        document.getElementById('thresholdValue').textContent = savedThreshold + '%';
    }
    
    if (savedAutoApprove !== null) {
        document.getElementById('aiAutoApprove').checked = savedAutoApprove === 'true';
    }
    
    if (savedNotification !== null) {
        document.getElementById('aiNotification').checked = savedNotification === 'true';
    }
    
    // Update request counts
    updateRequestCounts();
}

// Update AI confidence threshold
function updateAIThreshold(threshold) {
    localStorage.setItem('aiConfidenceThreshold', threshold);
    console.log(`AI confidence threshold updated to: ${threshold}%`);
}

// Run AI verification on pending requests
function runAIVerification() {
    const pendingRows = document.querySelectorAll('#aiVerificationTable tbody tr');
    const threshold = parseInt(document.getElementById('aiConfidenceThreshold').value);
    const autoApprove = document.getElementById('aiAutoApprove').checked;
    
    let processedCount = 0;
    
    pendingRows.forEach(row => {
        const confidenceElement = row.querySelector('.progress-bar');
        const confidence = parseInt(confidenceElement.style.width);
        const verdictElement = row.cells[6];
        const currentVerdict = verdictElement.querySelector('.badge').textContent.trim();
        
        // Only process pending requests
        if (currentVerdict === 'Pending Review') {
            processedCount++;
            
            // Simulate AI processing delay
            setTimeout(() => {
                if (confidence >= threshold) {
                    if (autoApprove) {
                        // Auto-approve high confidence requests
                        verdictElement.innerHTML = '<span class="badge bg-success">Approved</span>';
                        row.classList.add('table-success');
                        showAlert(`Request ${row.cells[0].textContent} automatically approved by AI`, 'success');
                    } else {
                        verdictElement.innerHTML = '<span class="badge bg-warning">AI Recommended: Approve</span>';
                    }
                } else {
                    // Flag low confidence requests
                    verdictElement.innerHTML = '<span class="badge bg-danger">AI Recommended: Decline</span>';
                    row.classList.add('table-danger');
                    
                    // Send notification to admins if enabled
                    if (document.getElementById('aiNotification').checked) {
                        sendAdminNotification(row.cells[0].textContent, 'declined');
                    }
                    
                    showAlert(`Request ${row.cells[0].textContent} flagged for manual review`, 'warning');
                }
            }, processedCount * 500); // Stagger the processing for visual effect
        }
    });
    
    if (processedCount > 0) {
        showAlert(`AI verification completed. Processed ${processedCount} requests.`, 'info');
    } else {
        showAlert('No pending requests to verify.', 'info');
    }
    
    // Update request counts
    setTimeout(updateRequestCounts, processedCount * 500 + 1000);
}

// View request details
function viewRequestDetails(requestId) {
    // In a real application, this would fetch detailed request data
    const requestData = {
        'REQ-1001': {
            donor: 'John Smith',
            amount: '$500',
            campaign: 'Education for All',
            date: 'May 16, 2023',
            paymentMethod: 'Credit Card',
            donorHistory: '3 previous donations',
            riskFactors: 'None identified',
            aiNotes: 'High confidence - donor has established history'
        },
        'REQ-1002': {
            donor: 'Sarah Johnson',
            amount: '$1,000',
            campaign: 'Clean Water Initiative',
            date: 'May 16, 2023',
            paymentMethod: 'PayPal',
            donorHistory: 'First-time donor',
            riskFactors: 'Large amount for first donation',
            aiNotes: 'Medium confidence - recommend verification'
        },
        'REQ-1003': {
            donor: 'Michael Brown',
            amount: '$250',
            campaign: 'Medical Aid Program',
            date: 'May 15, 2023',
            paymentMethod: 'Credit Card',
            donorHistory: 'No previous donations',
            riskFactors: 'Suspicious email pattern, high-risk country',
            aiNotes: 'Low confidence - multiple risk factors detected'
        }
    };
    
    const data = requestData[requestId] || {};
    
    // Create and show modal with request details
    const modalHtml = `
        <div class="modal fade" id="requestDetailsModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Request Details - ${requestId}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Donation Information</h6>
                                <p><strong>Donor:</strong> ${data.donor || 'N/A'}</p>
                                <p><strong>Amount:</strong> ${data.amount || 'N/A'}</p>
                                <p><strong>Campaign:</strong> ${data.campaign || 'N/A'}</p>
                                <p><strong>Date:</strong> ${data.date || 'N/A'}</p>
                                <p><strong>Payment Method:</strong> ${data.paymentMethod || 'N/A'}</p>
                            </div>
                            <div class="col-md-6">
                                <h6>AI Analysis</h6>
                                <p><strong>Donor History:</strong> ${data.donorHistory || 'N/A'}</p>
                                <p><strong>Risk Factors:</strong> ${data.riskFactors || 'None'}</p>
                                <p><strong>AI Notes:</strong> ${data.aiNotes || 'N/A'}</p>
                            </div>
                        </div>
                        <div class="mt-3">
                            <h6>Verification History</h6>
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Initial Screening
                                    <span class="badge bg-primary rounded-pill">Completed</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    AI Verification
                                    <span class="badge bg-warning rounded-pill">In Progress</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Final Approval
                                    <span class="badge bg-secondary rounded-pill">Pending</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('requestDetailsModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to document and show it
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('requestDetailsModal'));
    modal.show();
}

// Approve a request
function approveRequest(requestId, row) {
    if (confirm(`Are you sure you want to approve request ${requestId}?`)) {
        row.cells[6].innerHTML = '<span class="badge bg-success">Approved</span>';
        row.classList.add('table-success');
        row.classList.remove('table-danger', 'table-warning');
        
        showAlert(`Request ${requestId} has been approved.`, 'success');
        updateRequestCounts();
        
        // In a real application, this would update the backend
        console.log(`Request ${requestId} approved by admin`);
    }
}

// Decline a request
function declineRequest(requestId, row) {
    if (confirm(`Are you sure you want to decline request ${requestId}?`)) {
        row.cells[6].innerHTML = '<span class="badge bg-danger">Declined</span>';
        row.classList.add('table-danger');
        row.classList.remove('table-success', 'table-warning');
        
        showAlert(`Request ${requestId} has been declined.`, 'warning');
        updateRequestCounts();
        
        // In a real application, this would update the backend and notify the donor
        console.log(`Request ${requestId} declined by admin`);
    }
}

// Update request counts
function updateRequestCounts() {
    const rows = document.querySelectorAll('#aiVerificationTable tbody tr');
    let total = rows.length;
    let approved = 0;
    let pending = 0;
    let declined = 0;
    
    rows.forEach(row => {
        const verdict = row.cells[6].querySelector('.badge').textContent.trim();
        
        if (verdict.includes('Approved')) {
            approved++;
        } else if (verdict.includes('Pending') || verdict.includes('Recommended')) {
            pending++;
        } else if (verdict.includes('Declined')) {
            declined++;
        }
    });
    
    // Update counts in the UI
    document.getElementById('totalRequests').textContent = total;
    document.getElementById('approvedRequests').textContent = approved;
    document.getElementById('pendingRequests').textContent = pending;
    document.getElementById('declinedRequests').textContent = declined;
    document.getElementById('pendingRequestsCount').textContent = `${pending} Pending`;
}

// Send notification to admins
function sendAdminNotification(requestId, status) {
    // In a real application, this would send real notifications
    console.log(`Admin notification: Request ${requestId} has been ${status} by AI verification`);
    
    // Show a visual notification
    showAlert(`Request ${requestId} has been ${status}. Admin notification sent.`, 'warning');
}

// Show alert messages
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}