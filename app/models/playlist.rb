class Playlist < ActiveRecord::Base
  belongs_to :user

  has_many :playlist_songs, dependent: :destroy
end
