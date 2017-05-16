defmodule Mousika.UserController do
  use Mousika.Web, :controller
  
  def register(conn) do

  end

  def login(conn) do
    case Plug.Conn.read_body(conn) do
      {:ok, body, conn} ->
        case UserLogic.login(body) do
          {:ok, js} -> send_resp(conn, 200, js)
          {:error, js} -> send_resp(conn, 500, js)
        end
      {:more, pbody, conn} ->
        IO.puts("Only partial body")
        Poison.encode!(%{state: "error", msg: "Only partial body"}) |> send_resp(conn, 500)
      {:error, msg} ->
        IO.puts(msg)
        Poison.encode!(%{state: "error", msg: msg}) |> send_resp(conn, 500)
    end

  end

  def logout(conn) do

  end
end
