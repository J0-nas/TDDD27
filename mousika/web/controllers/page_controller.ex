defmodule Mousika.PageController do
  use Mousika.Web, :controller

  @static_file File.read!("priv/static/index.html")

  def index(conn, _params) do
    #render conn, "index.html"
    IO.puts("Conn Path info:\t#{conn.path_info}")
    html(conn, @static_file)
  end
end
