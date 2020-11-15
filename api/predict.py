import os
import requests
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_samples

TOP_50_PLAYLIST_URI = '37i9dQZEVXbMDoHDwVN2tF'
FEATURE_KEYS = ['danceability',	'energy',	'key',	'loudness',	'mode',	'speechiness',	'acousticness',	'instrumentalness',	'liveness',	'valence',	'tempo',	'duration_ms',	'time_signature']

def get_access_token():
  response = requests.post('https://accounts.spotify.com/api/token', {
    'grant_type': 'client_credentials',
    'client_id': os.environ.get('SPOTIFY_CLIENT_ID'),
    'client_secret': os.environ.get('SPOTIFY_CLIENT_SECRET'),
  }).json()
  return response['access_token']

def create_recommendations(song_ids):
  access_token = get_access_token()

  def get_track_features(ids):
    return requests.get(f'https://api.spotify.com/v1/audio-features/?ids={ids}', headers={
        'Authorization': f'Bearer {access_token}'
    }).json()

  def get_new_releases():
    # Pulling data from top 50 chart
    return requests.get(f'https://api.spotify.com/v1/playlists/{TOP_50_PLAYLIST_URI}/tracks', headers={
        'Authorization': f'Bearer {access_token}'
    }).json()

  ids = ",".join(song_ids)
  songs = pd.DataFrame(get_track_features(ids)['audio_features'])

  features = songs[FEATURE_KEYS]
  features_dummy = pd.get_dummies(features, columns=['key', 'mode', 'time_signature'])
  # Creating Train dataset
  train = features_dummy
  
  # Creating Test dataset
  ids = get_new_releases()['items']
  add = []
  for i in range(50):
    add.append(ids[i]['track']['uri'][-22:])

  new_ids = ','.join(add)
  test_songs = pd.DataFrame(get_track_features(new_ids)['audio_features'])
  test_features = test_songs[FEATURE_KEYS]
  test = pd.get_dummies(test_features, columns=['key', 'mode', 'time_signature'])

  song_id = test.index
  test = test.reset_index(drop = True)

  kmeans = KMeans(n_clusters=8, random_state=0).fit(train)
  predict = kmeans.predict(test)
  cluster_labels = kmeans.fit_predict(test)
  sample_silhouette_values = silhouette_samples(test, cluster_labels)

  data_tuples = list(zip(predict, sample_silhouette_values))
  compare = pd.DataFrame(data_tuples, columns=['predict', 'silhouette'])
  compare = compare.reset_index()
  compare = compare.sort_values(by='silhouette', ascending=False)
  compare = compare[compare['silhouette'] > .80]

  song_id = song_id[compare.index]
  top_recs = songs.iloc[song_id]
  top_recs = top_recs['uri'].str[-22:]

  return top_recs.to_list()