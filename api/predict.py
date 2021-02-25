import random 

NUM_SONGS = 12

def create_recommendations(song_ids):
  return random.sample(song_ids, NUM_SONGS)