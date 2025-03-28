import os
import logging
import json
from datetime import datetime, timedelta
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Create the Flask application
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/long-distance')
def long_distance():
    # This is our new page for long-distance relationship features
    return render_template('long_distance.html')

@app.route('/choose')
def choose():
    return render_template('choose.html')

@app.route('/message', methods=['GET', 'POST'])
def message():
    if request.method == 'POST':
        gift = request.form.get('gift')
        if gift:
            session['gift'] = gift
            return render_template('message.html', gift=gift)
    return redirect(url_for('choose'))

@app.route('/custom', methods=['GET', 'POST'])
def custom():
    if request.method == 'POST':
        custom_gift = request.form.get('custom_gift')
        if custom_gift:
            session['gift'] = custom_gift
            return render_template('message.html', gift=custom_gift)
    return render_template('custom.html')

@app.route('/final', methods=['GET', 'POST'])
def final():
    if request.method == 'POST':
        message = request.form.get('message')
        gift = session.get('gift', 'something special')
        if message:
            session['message'] = message
            return render_template('final.html', gift=gift, message=message)
    return redirect(url_for('message'))

# Error handlers
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404

@app.errorhandler(500)
def server_error(e):
    return render_template('index.html'), 500
