import os
from flask import Flask, request, redirect
import requests
from urllib.parse import urlencode

SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize'
SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
SPOTIFY_REDIRECT_URI = f'{os.environ.get("APP_BASE_URL")}/api/spotify_callback'

app = Flask(__name__)

@app.route('/api/hello')
def hello_world():
    return 'Some crazy model prediction!'

@app.route('/api/spotify_login')
def spotify_login():
    params = urlencode({
        'response_type': 'code',
        'client_id': os.environ.get('SPOTIFY_CLIENT_ID'),
        'scope': 'user-read-private user-read-email',
        'redirect_uri': SPOTIFY_REDIRECT_URI
    })
    return redirect(f'{SPOTIFY_AUTH_URL}?{params}')

@app.route('/api/spotify_callback')
def spotify_callback():
    response = requests.post(SPOTIFY_TOKEN_URL, data={
        'grant_type': 'authorization_code',
        'code': str(request.args['code']),
        'redirect_uri': SPOTIFY_REDIRECT_URI,
        'client_id': os.environ.get('SPOTIFY_CLIENT_ID'),
        'client_secret': os.environ.get('SPOTIFY_CLIENT_SECRET'),
    }).json()
    # Send response (including access + refresh tokens) to client as query params
    return redirect(f'{os.environ.get("APP_BASE_URL")}/postlogin?{urlencode(response)}')

@app.route('/api/spotify_refresh')
def spotify_refresh():
    refresh_token = request.args.get('refreshToken')
    response = requests.post(SPOTIFY_TOKEN_URL, data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': os.environ.get('SPOTIFY_CLIENT_ID'),
        'client_secret': os.environ.get('SPOTIFY_CLIENT_SECRET'),
    }).json()
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))