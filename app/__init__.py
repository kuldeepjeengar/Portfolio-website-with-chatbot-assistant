from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from app.config import Config

# Initialize SQLAlchemy with no settings
db = SQLAlchemy()

def create_app():
    app = Flask(__name__, 
                static_folder='views/static',
                template_folder='views/templates')
    app.config.from_object(Config)
    
    # Initialize extensions
    CORS(app)
    db.init_app(app)
    
    # Import blueprints
    from app.controllers.main_controller import main_bp
    from app.controllers.chat_controller import chat_bp
    from app.controllers.project_controller import project_bp

    # Register blueprints
    app.register_blueprint(main_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(project_bp)

    return app 