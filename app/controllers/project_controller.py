from flask import Blueprint, jsonify, request
from app.models.project import Project
from app import db

project_bp = Blueprint('project', __name__, url_prefix='/api/projects')

@project_bp.route('/', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@project_bp.route('/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.query.get_or_404(project_id)
    return jsonify(project.to_dict()) 