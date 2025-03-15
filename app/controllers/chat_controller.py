from flask import Blueprint, request, jsonify
from app.services.chat_service import ChatService
from app.models.message import Message
from app import db

chat_bp = Blueprint('chat', __name__, url_prefix='/api')

chat_service = ChatService()

@chat_bp.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    # Save user message
    user_msg = Message(content=user_message, sender='user')
    db.session.add(user_msg)
    
    # Get bot response
    bot_response = chat_service.get_response(user_message)
    
    # Save bot message
    bot_msg = Message(content=bot_response, sender='bot')
    db.session.add(bot_msg)
    db.session.commit()

    return jsonify({
        'response': bot_response,
        'timestamp': bot_msg.timestamp.isoformat()
    }) 