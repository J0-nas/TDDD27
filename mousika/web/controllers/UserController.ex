defmodule Mousika.UserController do
  use Mousika.Web, :controller

  def register(conn, params) do
    case UserLogic.register(params) do
      {:ok, js} -> send_resp(conn, 200, js)
      {:nix, msg} -> send_resp(conn, 400, msg)
      {:error, js} -> send_resp(conn, 500, js)
    end
  end

  def login(conn, params) do
    case UserLogic.login(params) do
      {:ok, js} -> send_resp(conn, 200, js)
      {:nix, msg} -> send_resp(conn, 400, msg)
      {:error, js} -> send_resp(conn, 500, js)
    end
  end

  def logout(conn) do

  end
end
