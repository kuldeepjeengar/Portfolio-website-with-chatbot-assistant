document.addEventListener('DOMContentLoaded', () => {
    // Chat functionality
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    const toggleChat = document.getElementById('toggle-chat');
    const chatBody = document.getElementById('chat-body');
    const chatTrigger = document.getElementById('chat-trigger');
    const chatContainer = document.querySelector('.chatbot-container');

    // Initially hide the chat body
    chatBody.style.display = 'none';
    
    // Toggle chat visibility - close the chat
    toggleChat.addEventListener('click', () => {
        chatContainer.classList.remove('chat-open');
        setTimeout(() => {
            chatBody.style.display = 'none';
            chatTrigger.style.display = 'flex';
        }, 300);
    });

    // Open chat when trigger button is clicked
    chatTrigger.addEventListener('click', () => {
        chatTrigger.style.display = 'none';
        chatBody.style.display = 'flex';
        setTimeout(() => {
            chatContainer.classList.add('chat-open');
        }, 10);
        
        // If first time opening, show initial message
        if (chatMessages.children.length === 0) {
            setTimeout(() => {
                addMessage('bot', 'Hello! I\'m Kuldeep\'s AI assistant. I can tell you about his skills, experience, or projects. How can I help you today?');
            }, 600);
        }
    });

    // Send message function
    const sendMessage = async () => {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage('user', message);
        userInput.value = '';

        try {
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('message', 'bot', 'typing');
            typingIndicator.innerHTML = '<div class="typing-animation"><span></span><span></span><span></span></div>';
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Send message to backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            addMessage('bot', data.response);
        } catch (error) {
            console.error('Error:', error);
            addMessage('bot', 'Sorry, I encountered an error. Please try again.');
        }
    };

    // Add message to chat
    const addMessage = (sender, text) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">${text}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">${text}</div>
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
            `;
        }
        
        // Add with animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        chatMessages.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Navbar scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition - 100) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    
    // Call once on page load
    animateOnScroll();
    
    // Add animate-on-scroll class to elements
    document.querySelectorAll('.section-title, .project-card, .service-card, .testimonial-card').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
}); 