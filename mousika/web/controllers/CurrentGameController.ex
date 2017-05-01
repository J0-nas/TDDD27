defmodule Mousika.CurrentGameController do
  use Mousika.Web, :controller

  def index(conn, _params) do
    currentGame = StateStore.getCurrentGame()
    cs = StateStore.getCurrentSong()
    ts = StateStore.getTimeStamp()
    res = %{:currentGame => currentGame, :currentSong => cs, :timeStamp => ts}
    IO.inspect(Poison.encode(res))
    case Poison.encode(res) do
      {:ok, json} -> send_resp(conn, 200, json)
      {:error, err} -> send_resp(conn, 500, err)
    end
  end
end
