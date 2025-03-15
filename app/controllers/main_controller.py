from flask import Blueprint, render_template
from app.models.project import Project

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    projects = Project.query.all()
    return render_template('index.html', projects=projects)

@main_bp.route('/about')
def about():
    return render_template('about.html')