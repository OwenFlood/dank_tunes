class SoundcloudController < ApplicationController
  def index
    if user_signed_in?
      @playlists = Playlist.where(user_id: current_user.id)
    end
  end

  def player

  end
end
