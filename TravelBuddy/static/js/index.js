document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    var message = document.getElementById('message-input').value;
    if (message.trim() !== '') {
        appendMessage(message, 'user');
        sendMessageToServer(message);
        document.getElementById('message-input').value = ''; // Clear input field
    }
}

function appendMessage(message, sender) {
    var chatWindow = document.getElementById('chat-window');
    var messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    messageElement.classList.add('message-bubble');
    if (sender === 'user') {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('server-message');
    }
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
}

function sendMessageToServer(message) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/send_message/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
            var response = JSON.parse(xhr.responseText);
            var serverMessage = response.message;
            appendMessage(serverMessage, 'TravelBuddy'); // Display the response in chat box
        }
    };
    xhr.send(JSON.stringify({message: message}));
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
