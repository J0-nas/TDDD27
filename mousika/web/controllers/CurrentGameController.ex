defmodule Mousika.CurrentGameController do
  use Mousika.Web, :controller

  def index(conn, _params) do
    currentGame = StateStore.getCurrentGame()
    cs = StateStore.getCurrentSong()
    ts = StateStore.getTimeStamp()
    res = %{:currentGame => currentGame, :currentSong => cs, :timeStamp => ts}

    IO.puts "new request at: "
    IO.inspect :os.system_time(:millisecond)

    case Poison.encode(res) do
      {:ok, json} -> update_resp_header(conn, "Access-Control-Allow-Origin", "cors", fn v -> "cors" end) |> send_resp(200, json)
      {:error, err} -> send_resp(conn, 500, err)
    end
  end
end
