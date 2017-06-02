defmodule Mousika.CurrentGameController do
  use Mousika.Web, :controller

  def index(conn, _params) do
    currentGame = GameState.getCurrentGame()
    cs = GameState.getCurrentSong()
    ts = GameState.getTimeStamp()
    res = %{:currentGame => currentGame, :currentSong => cs, :timeStamp => ts}

    case Poison.encode(res) do
      {:ok, json} ->
        IO.puts("Returning the game: " <> json)
        update_resp_header(conn, "Access-Control-Allow-Origin", "cors", fn _ -> "cors" end) |> send_resp(200, json)
      {:error, err} -> send_resp(conn, 400, err)
    end
  end
end
