class SoundcloudController < ApplicationController
  def index
    client = SoundCloud.new(:client_id => "5d3aaf910add018f35ba65e325fcf227")
    @tracks = client.get('/tracks', :limit => 10, :order => 'hotness')
  end

  def player

  end
end
