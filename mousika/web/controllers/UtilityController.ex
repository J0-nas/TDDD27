defmodule Mousika.UtilityController do
  use Mousika.Web, :controller

  #@static_file File.read!("priv/static/hello.html")

  def get_csrf_token(conn, _params) do
    token = Plug.CSRFProtection.get_csrf_token
    IO.puts("set Token to: " <> to_string token) 
    send_resp(conn, 200, token)
  end
end
