defmodule Mousika.PageController do
  #import Plug.Conn
  use Mousika.Web, :controller

  @static_file File.read!("priv/static/index.html")
  #@index "/index.html"
  #@f_name (to_string System.cwd) <> "/priv/static/index.html"

  def index(conn, _params) do
    #IO.puts System.cwd()
    #IO.puts __DIR__
    #IO.puts("Conn Path info:\t#{conn.path_info}")
    #IO.puts @static_file
    html(conn, @static_file)
    #redirect(conn, to: @index)
    #send_resp(conn, 200, @static_file)
    #Plug.Conn.send_file(conn, 200, @f_name)
  end
end
