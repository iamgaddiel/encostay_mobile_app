from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/image_kit/upload', methods=['POST'])
def handle_upload():
    try:
        # Accessing files sent in the FormData request
        file1 = request.files['image1']
        file2 = request.files['image2']
        file3 = request.files['image3']

        print(file1)

        # Handle the uploaded files as needed
        # For demonstration purposes, we save the files to the server
        # file1.save(f'uploads/{file1.filename}')
        # file2.save(f'uploads/{file2.filename}')
        # file3.save(f'uploads/{file3.filename}')

        return jsonify({"message": "Files uploaded successfully"})
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to process the request"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)
