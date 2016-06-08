class PlaylistSongsController < ApplicationController
  def create
    @playlist_song = Playlist.new(params.require(:playlist_song).permit([:song_host, :song_id, :song_name, :song_artist, :thumbnail_link, :popularity, :playlist_id]))

    if @playlist_song.save
      respond_to do |format|
        format.json { render json: @playlist_song }
      end
    else
      flash.now[:alert] = "Unable to add to song"
    end
  end
end
