(function() {
    'use strict';

    function hasAcceptedTerms() {
        return localStorage.getItem('taxmitra_terms_accepted') === 'true';
    }

    function acceptTerms() {
        localStorage.setItem('taxmitra_terms_accepted', 'true');
        localStorage.setItem('taxmitra_terms_accepted_date', new Date().toISOString());
        closeTermsModal();
    }

    function showTermsModal() {
        if (hasAcceptedTerms()) return;

        const modalHTML = `
            <div id="taxmitra-terms-modal" class="taxmitra-modal-overlay">
                <div class="taxmitra-modal-content">
                    <button class="taxmitra-modal-close" onclick="document.getElementById('taxmitra-terms-modal').remove();">×</button>
                   
                    <div class="taxmitra-modal-header">
                        <h2>TaxMitra - Terms & Disclaimer</h2>
                        <p class="taxmitra-modal-subtitle">Please review before using the app</p>
                    </div>

                    <div class="taxmitra-modal-body">
                        <div class="taxmitra-warning-box">
                            <strong>⚠️ IMPORTANT DISCLAIMER</strong>
                            <p>TaxMitra is a calculator tool, NOT professional tax advice. You must consult a qualified Chartered Accountant (CA) before filing any returns.</p>
                        </div>

                        <h3>Key Points:</h3>
                        <ul>
                            <li><strong>Not Professional Advice:</strong> This app provides calculations only, not tax or legal advice</li>
                            <li><strong>Verify Results:</strong> Always verify calculations with official sources before filing</li>
                            <li><strong>Consult a CA:</strong> Consult a qualified Chartered Accountant before submitting any returns</li>
                            <li><strong>Your Responsibility:</strong> You are solely responsible for tax accuracy and filing compliance</li>
                            <li><strong>No Liability:</strong> DJ Associates is not liable for tax penalties or losses from miscalculation</li>
                            <li><strong>Data Backup:</strong> Back up your data separately; we're not responsible for data loss</li>
                        </ul>

                        <h3>You acknowledge:</h3>
                        <ul>
                            <li>✓ You understand this is a calculator tool, not professional tax advice</li>
                            <li>✓ You will verify all calculations independently</li>
                            <li>✓ You will consult a CA before filing</li>
                            <li>✓ You accept all risks and release DJ Associates from liability</li>
                        </ul>

                        <div class="taxmitra-policies-links">
                            <p style="margin-top: 15px;">
                                <a href="policies.html" target="_blank" style="color: #2e75b6; text-decoration: none;">
                                    📄 Read Full Policies & Disclaimer
                                </a>
                            </p>
                        </div>
                    </div>

                    <div class="taxmitra-modal-footer">
                        <button class="taxmitra-btn-secondary" onclick="document.getElementById('taxmitra-terms-modal').remove();">
                            Cancel
                        </button>
                        <button class="taxmitra-btn-primary" onclick="window.taxmitraAcceptTerms();">
                            I Agree & Accept
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    function closeTermsModal() {
        const modal = document.getElementById('taxmitra-terms-modal');
        if (modal) {
            modal.style.animation = 'taxmitra-fadeOut 0.3s ease forwards';
            setTimeout(() => modal.remove(), 300);
        }
    }

    window.taxmitraAcceptTerms = acceptTerms;
    window.closeTermsModal = closeTermsModal;

    document.addEventListener('DOMContentLoaded', function() {
        if (!hasAcceptedTerms()) {
            setTimeout(showTermsModal, 500);
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showTermsModal);
    } else {
        setTimeout(function() {
            if (!hasAcceptedTerms()) {
                showTermsModal();
            }
        }, 500);
    }
})();

const styleSheet = document.createElement('style');
styleSheet.textContent = `
.taxmitra-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: taxmitra-fadeIn 0.3s ease forwards;
}

@keyframes taxmitra-fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes taxmitra-fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.taxmitra-modal-content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    animation: taxmitra-slideUp 0.3s ease forwards;
}

@keyframes taxmitra-slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.taxmitra-modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.taxmitra-modal-close:hover {
    color: #1f4e78;
}

.taxmitra-modal-header {
    padding: 25px 30px;
    border-bottom: 2px solid #f0f0f0;
}

.taxmitra-modal-header h2 {
    margin: 0 0 8px 0;
    color: #1f4e78;
    font-size: 1.5em;
}

.taxmitra-modal-subtitle {
    margin: 0;
    color: #666;
    font-size: 0.9em;
}

.taxmitra-modal-body {
    padding: 25px 30px;
}

.taxmitra-modal-body h3 {
    color: #2e75b6;
    font-size: 1.1em;
    margin: 15px 0 10px 0;
}

.taxmitra-modal-body ul {
    margin: 10px 0 20px 20px;
    padding-left: 15px;
}

.taxmitra-modal-body li {
    margin-bottom: 8px;
    line-height: 1.5;
}

.taxmitra-warning-box {
    background-color: #fff3cd;
    border-left: 4px solid #ffc107;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 4px;
}

.taxmitra-warning-box strong {
    color: #856404;
}

.taxmitra-warning-box p {
    margin: 8px 0 0 0;
    color: #856404;
    font-size: 0.95em;
}

.taxmitra-policies-links {
    text-align: center;
    padding-top: 15px;
    border-top: 1px solid #ddd;
}

.taxmitra-modal-footer {
    padding: 20px 30px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    background-color: #f9f9f9;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.taxmitra-btn-primary,
.taxmitra-btn-secondary {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.95em;
    font-weight: bold;
    transition: all 0.2s ease;
}

.taxmitra-btn-primary {
    background-color: #1f4e78;
    color: white;
}

.taxmitra-btn-primary:hover {
    background-color: #2e75b6;
}

.taxmitra-btn-secondary {
    background-color: #e0e0e0;
    color: #333;
}

.taxmitra-btn-secondary:hover {
    background-color: #d0d0d0;
}

@media (max-width: 600px) {
    .taxmitra-modal-content {
        width: 95%;
        max-height: 90vh;
    }

    .taxmitra-modal-footer {
        flex-direction: column-reverse;
    }

    .taxmitra-modal-footer button {
        width: 100%;
    }
}
`;

document.head.appendChild(styleSheet); 
