class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.string :host
      t.integer :sond_id
      t.string :song_name
      t.string :aong_artist
      t.string :thumbnail_link
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
