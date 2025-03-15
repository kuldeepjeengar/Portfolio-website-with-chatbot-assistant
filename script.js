document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    const toggleChat = document.getElementById('toggle-chat');
    const chatBody = document.getElementById('chat-body');

    // Toggle chat visibility
    toggleChat.addEventListener('click', () => {
        chatBody.style.display = chatBody.style.display === 'none' ? 'flex' : 'none';
    });

    // Send message function
    const sendMessage = async () => {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage('user', message);
        userInput.value = '';

        try {
            // Send message to backend
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

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
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Initial greeting
    addMessage('bot', 'Hello! I\'m your portfolio assistant. How can I help you today?');
}); 