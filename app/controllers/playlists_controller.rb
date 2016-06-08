class PlaylistsController < ApplicationController
  def index
    @playlists = Playlist.all
  end

  def create
    @playlist = Playlist.new(params.require(:playlist).permit(:name))
    @playlist.user = current_user

    if @playlist.save
      respond_to do |format|
        format.json { render json: @playlist }
      end
    else
      flash.now[:alert] = "Unable to creat playlist"
    end
  end
end
