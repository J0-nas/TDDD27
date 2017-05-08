defmodule GameLogic do
  defmodule SV do
    use Supervisor

    def start_link do
      Supervisor.start_link(__MODULE__, :ok)
    end

    def init(:ok) do
      children = [
        worker(StateStore.Store, [:ok]),
        worker(Task, [GameLogic, :main, [:start]])
      ]
      #IO.inspect(children)
      supervise(children, strategy: :one_for_all)
    end
  end

  def main(:start) do
    IO.puts "Main of GameLogic"
    Process.sleep(1000)
    songs = Krotos.getGameSongs()
    StateStore.putNextGame(songs)
    #StateStore.increaseCurrentSong()
    #StateStore.putTimeStamp(:os.system_time(:millisecond))
    #spawn setNextGame
    main(:loop)
  end

  def main(:loop) do
    cs = StateStore.increaseCurrentSong()
    if cs == 0 do
      nextGame = StateStore.getNextGame()
      StateStore.putCurrentGame(nextGame)
      #push currentGame to clients
      spawn fn -> setNextGame end
      Process.sleep(1000*2)
    end

    ts = :os.system_time(:millisecond)
    StateStore.putTimeStamp(ts)

    IO.inspect ts
    IO.inspect cs

    #push ts, (cs) to clients
    Process.sleep(1000*32)
    main(:loop)
  end

  def setNextGame() do
    nextGame = Krotos.getGameSongs()
    StateStore.putNextGame(nextGame)
  end
end
