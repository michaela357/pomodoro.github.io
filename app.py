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

@app.route('/switchtheme.js')
def js2():
    return send_from_directory('.', 'switchtheme.js')

@app.route('/editname.js')
def js3():
    return send_from_directory('.', 'editname.js')

@app.route('/github-6980894_960_720.jpg')
def github_image():
    return send_from_directory('.', 'github-6980894_960_720.jpg')

@app.route('/icons8-sun-50.png')
def sun_image():
    return send_from_directory('.', 'icons8-sun-50.png')

@app.route('/icons8-moon-and-stars-30.png')
def moon_image():
    return send_from_directory('.', 'icons8-moon-and-stars-30.png')


if __name__ == '__main__':
    print("Starting Flask server...")
    print("Available routes:")
    print("- http://localhost:5000/ (Home page)")
    
    app.run(debug=True, host='0.0.0.0', port=5000)