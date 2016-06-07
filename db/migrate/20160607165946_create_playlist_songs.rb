class CreatePlaylistSongs < ActiveRecord::Migration
  def change
    create_table :playlist_songs do |t|
      t.string :song_host
      t.integer :song_id
      t.string :song_name
      t.string :song_artist
      t.string :thumbnail_link
      t.integer :popularity
      t.references :playlist, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
