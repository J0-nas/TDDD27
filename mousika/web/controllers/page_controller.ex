defmodule Mousika.PageController do
  use Mousika.Web, :controller

  #@static_file File.read!("priv/static/index.html")
  @index "/index.html"

  def index(conn, _params) do
    #IO.puts("Conn Path info:\t#{conn.path_info}")
    #IO.puts("in PC")
    #html(conn, @static_file)
    #html(conn, "test")
    redirect(conn, to: @index)
  end
end
