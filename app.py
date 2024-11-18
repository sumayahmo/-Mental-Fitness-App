from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

# In-memory storage for simplicity
mood_data = []

# API endpoint to track mood
@app.route('/track_mood', methods=['POST'])
def track_mood():
    user_mood = request.json.get('mood')
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    # Save mood data
    mood_data.append({'mood': user_mood, 'timestamp': timestamp})
    return jsonify({'message': f'مرحبًا [Your Name]، تم تتبع المزاج بنجاح!'}), 200  # Personalized message

# API endpoint to get mood history
@app.route('/get_mood_history', methods=['GET'])
def get_mood_history():
    return jsonify(mood_data), 200

if __name__ == '__main__':
    app.run(debug=True)
