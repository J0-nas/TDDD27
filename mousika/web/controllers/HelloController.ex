defmodule Mousika.HelloController do
  use Mousika.Web, :controller
  import Krotos

  #@static_file File.read!("priv/static/hello.html")

  def index(conn, _params) do
    #render conn, "index.html"
    #IO.puts("Conn Path info:\t#{conn.path_info}")
    #IO.puts("in HC")
    #html(conn, @static_file)
    #{name, artist, album, _, _} = Enum.at Krotos.getTopTracksForGenre("g.115"), 0
    #s = name <> " " <> artist <> " " <> album
    #IO.puts s
    html(conn, "test hello")
  end
end
