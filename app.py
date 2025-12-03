from flask import Flask, render_template, send_from_directory, g

app = Flask(__name__)

@app.route('/')
def home():
    return send_from_directory('.' , 'index.html')

@app.route('/styles.css')
def css():
    return send_from_directory('.', 'styles.css')

@app.route('/timer.js')
def js():
    return send_from_directory('.', 'timer.js')

@app.route('/github-6980894_960_720.jpg')
def github_image():
    return send_from_directory('.', 'github-6980894_960_720.jpg')


if __name__ == '__main__':
    print("Starting Flask server...")
    print("Available routes:")
    print("- http://localhost:5000/ (Home page)")
    
    app.run(debug=True, host='0.0.0.0', port=5000)