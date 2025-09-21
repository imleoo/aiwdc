// Pipeline visualization interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Initialize connection diagram
    initConnectionDiagram();
    
    // Safe Mermaid initialization
    function initializeMermaid() {
        if (typeof mermaid !== 'undefined') {
            mermaid.initialize({
                startOnLoad: false,
                theme: 'dark',
                flowchart: {
                    useMaxWidth: false,
                    htmlLabels: true,
                    curve: 'basis'
                },
                securityLevel: 'loose'
            });
            return true;
        }
        return false;
    }
    
    // Render YAML pipeline as flowchart
    function renderPipelineFlowchart() {
        const flowchartContainer = document.getElementById('mermaid-flowchart');
        if (!flowchartContainer) return;
        
        const pipelineConfig = `flowchart TD
    subgraph Sources[Data Sources]
        A[RSS Feed\\nTech News]
        B[Web Scraper\\nNews Sites]
        C[Database\\nMySQL/PostgreSQL]
        D[Search Engine\\nGoogle Custom Search]
    end
    
    subgraph AI_Processing[aixsu-processor]
        E[Unified AI Engine\\nMulti-Model Support]
    end
    
    subgraph Destinations[Content Destinations]
        I[WordPress\\nBlog Platform]
        J[Shopify\\nE-commerce]
        K[Twitter\\nSocial Media]
        L[Facebook\\nSocial Media]
        M[LinkedIn\\nProfessional Network]
    end
    
    A --> E
    B --> E
    C --> E
    D --> E
    E --> I
    E --> J
    E --> K
    E --> L
    E --> M`;
        
        flowchartContainer.innerHTML = pipelineConfig;
        
        // Only initialize mermaid if it's available
        if (typeof mermaid !== 'undefined') {
            try {
                mermaid.init(undefined, flowchartContainer);
            } catch (error) {
                console.warn('Mermaid rendering failed:', error);
                showFallbackVisualization();
            }
        } else {
            showFallbackVisualization();
        }
    }
    
    // Show fallback visualization
    function showFallbackVisualization() {
        const mermaidContainer = document.querySelector('.mermaid-container');
        const builderFlow = document.querySelector('.builder-flow');
        
        if (mermaidContainer) mermaidContainer.style.display = 'none';
        if (builderFlow) builderFlow.style.display = 'flex';
    }
    
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
        
        // Position connection lines
        setTimeout(() => {
            const sourceBoxes = document.querySelectorAll('.sources-column .connector-box');
            const destBoxes = document.querySelectorAll('.destinations-column .connector-box');
            const processorBox = document.querySelector('.processor-box');
            
            if (!processorBox) return;
            
            const processorRect = processorBox.getBoundingClientRect();
            const diagramRect = diagram.getBoundingClientRect();
            
            // Position source connection lines
            sourceBoxes.forEach((box, index) => {
                const rect = box.getBoundingClientRect();
                const line = document.getElementById(`line-${box.dataset.source}`);
                if (!line) return;
                
                const startX = rect.right - diagramRect.left;
                const startY = rect.top + rect.height/2 - diagramRect.top;
                const endX = processorRect.left - diagramRect.left;
                const endY = processorRect.top + processorRect.height/2 - diagramRect.top;
                
                line.style.left = `${startX}px`;
                line.style.top = `${startY}px`;
                line.style.width = `${endX - startX}px`;
                line.style.height = '3px';
                line.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX) * 180 / Math.PI}deg)`;
                line.style.transformOrigin = 'left center';
                
                // Add data particles
                createDataParticles(line, index * 500);
            });
            
            // Position destination connection lines
            destBoxes.forEach((box, index) => {
                const rect = box.getBoundingClientRect();
                const line = document.getElementById(`line-${box.dataset.dest}`);
                if (!line) return;
                
                const startX = processorRect.right - diagramRect.left;
                const startY = processorRect.top + processorRect.height/2 - diagramRect.top;
                const endX = rect.left - diagramRect.left;
                const endY = rect.top + rect.height/2 - diagramRect.top;
                
                line.style.left = `${startX}px`;
                line.style.top = `${startY}px`;
                line.style.width = `${endX - startX}px`;
                line.style.height = '3px';
                line.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX) * 180 / Math.PI}deg)`;
                line.style.transformOrigin = 'left center';
                
                // Add data particles
                createDataParticles(line, 2000 + index * 500);
            });
        }, 500);
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
    
    // Tab switching functionality
    const toggleButtons = safeQuerySelectorAll('.toggle-btn');
    const configContents = safeQuerySelectorAll('.config-content');
    
    if (toggleButtons.length > 0 && configContents.length > 0) {
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const target = this.dataset.target;
                
                // Update active button
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                configContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.classList.contains(target + '-content')) {
                        content.classList.add('active');
                        // Render flowchart when visual tab is activated
                        if (target === 'visual') {
                            setTimeout(renderPipelineFlowchart, 100);
                        }
                    }
                });
            });
        });
    }
    
    // Interactive pipeline steps
    const pipelineSteps = safeQuerySelectorAll('.pipeline-step');
    
    if (pipelineSteps.length > 0) {
        pipelineSteps.forEach(step => {
            step.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 220, 130, 0.2)';
            });
            
            step.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    // Animate pipeline flow (for fallback visualization)
    const flowItems = safeQuerySelectorAll('.flow-item');
    
    if (flowItems.length > 0) {
        let delay = 0;
        
        flowItems.forEach(item => {
            const element = item;
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
            
            delay += 200;
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
    
    // Initialize Mermaid and render
    const mermaidAvailable = initializeMermaid();
    
    if (mermaidAvailable) {
        // Initial render
        setTimeout(renderPipelineFlowchart, 500);
    } else {
        // Show fallback immediately if Mermaid not available
        showFallbackVisualization();
    }
});