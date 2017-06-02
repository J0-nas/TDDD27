defmodule Mousika.SolvedController do
  use Mousika.Web, :controller

  def artist(conn, params) do
    IO.puts("artist solved")
    #IO.inspect(conn)
    case {params["username"], params["time"]} do
      {nil, nil} -> send_resp(conn, 400, "Parameter missing")
      {_, nil} -> send_resp(conn, 400, "Parameter missing")
      {nil, _} -> send_resp(conn, 400, "Parameter missing")
      {username, time} ->
        GameLogic.handleSolvedArtist(username, time)
        {_, s} = Poison.encode(%{msg: "Artist solved"})
        send_resp(conn, 200, s)
    end
  end

  def title(conn, params) do
    IO.puts("title solved")
    #IO.inspect(conn)
    case {params["username"], params["time"]} do
      {nil, nil} -> send_resp(conn, 400, "Parameter missing")
      {_, nil} -> send_resp(conn, 400, "Parameter missing")
      {nil, _} -> send_resp(conn, 400, "Parameter missing")
      {username, time} ->
        GameLogic.handleSolvedTitle(username, time)
        {_, s} = Poison.encode(%{msg: "Artist solved"})
        send_resp(conn, 200, s)
    end
  end
end
