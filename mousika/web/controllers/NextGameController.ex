defmodule Mousika.NextGameController do
  use Mousika.Web, :controller

  def index(conn, _params) do
    nextGame = GameState.getNextGame()
    res = %{:nextGame => nextGame}

    case Poison.encode(res) do
      {:ok, json} ->
        IO.puts("Returning the next game: " <> json)
        update_resp_header(conn, "Access-Control-Allow-Origin", "cors", fn _ -> "cors" end) |> send_resp(200, json)
      {:error, err} -> send_resp(conn, 400, err)
    end
  end
end
