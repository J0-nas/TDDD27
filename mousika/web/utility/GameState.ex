defmodule GameState do

  def getCurrentGame do
    GameState.Store.get(:currentGame)
  end

  def putCurrentGame(gameArray) do
    GameState.Store.put(:currentGame, gameArray)
  end

  def getNextGame do
    GameState.Store.get(:nextGame)
  end

  def putNextGame(gameArray) do
    GameState.Store.put(:nextGame, gameArray)
  end

  def getCurrentSong do
    GameState.Store.get(:currentSong)
  end

  def increaseCurrentSong do
    res = rem (GameState.Store.get(:currentSong) + 1), 10
    GameState.Store.put(:currentSong, res)
    GameState.Store.get(:currentSong)
  end

  def getTimeStamp do
    GameState.Store.get(:timeStamp)
  end

  def putTimeStamp(ts) do
    GameState.Store.put(:timeStamp, ts)
  end

  def getStandings() do
    GameState.Store.get(:standings)
  end

  def putStandings(newStandings) do
    GameState.Store.put(:standings, newStandings)
  end

  defmodule Store do
    def start_link(:ok) do
      IO.puts("Started GameState.Store")
      Agent.start_link(fn -> %{
        :currentGame => [],
        :nextGame => [],
        :currentSong => -1,
        :timeStamp => -1,
        :standings => %{}
        } end, name: :GameStateStore)
    end

    def get(key) do
      Agent.get(:GameStateStore, &Map.get(&1, key))
    end

    def put(key, value) do
      Agent.update(:GameStateStore, &Map.put(&1, key, value))
    end
  end
end
