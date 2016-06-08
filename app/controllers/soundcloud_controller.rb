class SoundcloudController < ApplicationController
  def index
    if user_signed_in?
      @playlists = current_user.playlists.as_json(include: :playlist_songs)
    end
  end

  def player

  end
end
