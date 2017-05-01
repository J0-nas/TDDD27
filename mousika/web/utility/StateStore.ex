defmodule StateStore do

  def getCurrentGame do
    StateStore.Store.get(:currentGame)
  end

  def putCurrentGame(gameArray) do
    StateStore.Store.put(:currentGame, gameArray)
  end

  def getNextGame do
    StateStore.Store.get(:nextGame)
  end

  def putNextGame(gameArray) do
    StateStore.Store.put(:nextGame, gameArray)
  end

  def getCurrentSong do
    StateStore.Store.get(:currentSong)
  end

  def increaseCurrentSong do
    res = rem (StateStore.Store.get(:currentSong) + 1), 10
    StateStore.Store.put(:currentSong, res)
    StateStore.Store.get(:currentSong)
  end

  def getTimeStamp do
    StateStore.Store.get(:timeStamp)
  end

  def putTimeStamp(ts) do
    StateStore.Store.put(:timeStamp, ts)
  end

  defmodule Store do
    def start_link(:ok) do
      Agent.start_link(fn -> %{
        :currentGame => [],
        :nextGame => [],
        :currentSong => -1,
        :timeStamp => -1
        } end, name: :store)
    end

    def get(key) do
      Agent.get(:store, &Map.get(&1, key))
    end

    def put(key, value) do
      Agent.update(:store, &Map.put(&1, key, value))
    end
  end
end
