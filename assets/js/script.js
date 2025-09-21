// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize connection diagram
    initConnectionDiagram();
    
    // Safe element selection with null checks
    function safeQuerySelector(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn('Element not found:', selector);
        }
        return element;
    }
    
    // Safe element selection for multiple elements
    function safeQuerySelectorAll(selector) {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
            console.warn('No elements found:', selector);
        }
        return elements;
    }
    
    // Initialize connection diagram with dynamic positioning
    function initConnectionDiagram() {
        const diagram = document.querySelector('.connection-diagram');
        if (!diagram) return;
        
        // Position connection lines after layout is complete
        function positionLines() {
            const sourceBoxes = document.querySelectorAll('.sources-column .connector-box');
            const destBoxes = document.querySelectorAll('.destinations-column .connector-box');
            const processorBox = document.querySelector('.processor-box');
            
            if (!processorBox || sourceBoxes.length === 0 || destBoxes.length === 0) return;
            
            try {
                const diagramRect = diagram.getBoundingClientRect();
                const processorRect = processorBox.getBoundingClientRect();
                
                // Calculate processor center relative to diagram
                const processorCenterX = processorRect.left + processorRect.width/2 - diagramRect.left;
                const processorCenterY = processorRect.top + processorRect.height/2 - diagramRect.top;
            
                // Position source connection lines
                sourceBoxes.forEach((box, index) => {
                    try {
                        const rect = box.getBoundingClientRect();
                        const line = document.getElementById(`line-${box.dataset.source}`);
                        if (!line) return;
                        
                        // Calculate start point (right edge center of source box)
                        const startX = rect.right - diagramRect.left;
                        const startY = rect.top + rect.height/2 - diagramRect.top;
                        
                        // Calculate end point (left edge center of processor box)
                        const endX = processorRect.left - diagramRect.left;
                        const endY = processorCenterY;
                        
                        // Calculate line properties
                        const deltaX = endX - startX;
                        const deltaY = endY - startY;
                        const width = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                        
                        // Apply styles
                        line.style.left = `${startX}px`;
                        line.style.top = `${startY}px`;
                        line.style.width = `${width}px`;
                        line.style.height = '3px';
                        line.style.transform = `rotate(${angle}deg)`;
                        line.style.transformOrigin = 'left center';
                        line.style.opacity = '1';
                        
                        // Add data particles
                        createDataParticles(line, index * 500);
                    } catch (error) {
                        console.warn('Error positioning source connection line:', error);
                    }
                });
                
                // Position destination connection lines
                destBoxes.forEach((box, index) => {
                    try {
                        const rect = box.getBoundingClientRect();
                        const line = document.getElementById(`line-${box.dataset.dest}`);
                        if (!line) return;
                        
                        // Calculate start point (right edge center of processor box)
                        const startX = processorRect.right - diagramRect.left;
                        const startY = processorCenterY;
                        
                        // Calculate end point (left edge center of destination box)
                        const endX = rect.left - diagramRect.left;
                        const endY = rect.top + rect.height/2 - diagramRect.top;
                        
                        // Calculate line properties
                        const deltaX = endX - startX;
                        const deltaY = endY - startY;
                        const width = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                        
                        // Apply styles
                        line.style.left = `${startX}px`;
                        line.style.top = `${startY}px`;
                        line.style.width = `${width}px`;
                        line.style.height = '3px';
                        line.style.transform = `rotate(${angle}deg)`;
                        line.style.transformOrigin = 'left center';
                        line.style.opacity = '1';
                        
                        // Add data particles
                        createDataParticles(line, 2000 + index * 500);
                    } catch (error) {
                        console.warn('Error positioning destination connection line:', error);
                    }
                });
                
            } catch (error) {
                console.warn('Error initializing connection diagram:', error);
            }
        }
        
        // Position lines after a delay to ensure layout is complete
        setTimeout(positionLines, 100);
        
        // Re-position on window resize
        window.addEventListener('resize', () => {
            setTimeout(positionLines, 100);
        });
    }
    
    // Create animated data particles on connection lines
    function createDataParticles(line, delay) {
        if (!line) return;
        
        // Create particle element
        const particle = document.createElement('div');
        particle.className = 'data-particle';
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(99, 102, 241, 0.8)';
        particle.style.boxShadow = '0 0 10px rgba(99, 102, 241, 0.6)';
        particle.style.top = '-3px';
        particle.style.left = '0';
        particle.style.transform = 'translateY(-50%)';
        particle.style.zIndex = '3';
        
        line.appendChild(particle);
        
        // Animate particle
        function animateParticle() {
            particle.style.transition = 'none';
            particle.style.left = '0';
            particle.style.opacity = '1';
            
            setTimeout(() => {
                particle.style.transition = 'left 2s linear, opacity 0.3s ease-in';
                particle.style.left = `calc(100% - 8px)`;
                particle.style.opacity = '0';
                
                setTimeout(() => {
                    animateParticle();
                }, 2000);
            }, 50);
        }
        
        setTimeout(() => {
            animateParticle();
        }, delay);
    }
    

    
    // Pricing toggle functionality
    const billingToggle = document.getElementById('billing-toggle');
    const priceAmount = document.getElementById('price-amount');
    const pricePeriod = document.getElementById('price-period');
    const priceNote = document.getElementById('price-note');
    const pricingBtn = document.getElementById('pricing-btn');
    
    if (billingToggle && priceAmount && pricePeriod && priceNote && pricingBtn) {
        billingToggle.addEventListener('change', function() {
            if (this.checked) {
                // Annual pricing (10 months = $499.00, save $100)
                priceAmount.textContent = '499.00';
                pricePeriod.textContent = '/ year';
                priceNote.style.display = 'block';
                pricingBtn.textContent = 'Start Annual Subscription';
            } else {
                // Monthly pricing
                priceAmount.textContent = '49.90';
                pricePeriod.textContent = '/ month';
                priceNote.style.display = 'none';
                pricingBtn.textContent = 'Start Monthly Subscription';
            }
        });
    }

    // Add click to copy functionality for code blocks
    const codeBlocks = safeQuerySelectorAll('pre code');
    
    if (codeBlocks.length > 0) {
        codeBlocks.forEach(code => {
            code.addEventListener('click', function() {
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied to clipboard!';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.warn('Copy to clipboard failed:', err);
                });
            });
        });
    }
    

});