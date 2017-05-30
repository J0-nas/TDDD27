defmodule GameLogic do
  defmodule SV do
    use Supervisor

    def start_link do
      Supervisor.start_link(__MODULE__, :ok)
    end

    def init(:ok) do
      children = [
        worker(GameState.Store, [:ok]),
        worker(DatabaseState.Store, [:ok]),
        worker(Task, [GameLogic, :main, [:start]])
      ]
      #IO.inspect(children)
      supervise(children, strategy: :one_for_all)
    end
  end

  def main(:start) do
    IO.puts "Main of GameLogic"
    r = DatabaseState.initDBConnection(:default)
    IO.inspect r
    Process.sleep(1000)
    songs = Krotos.getGameSongs()
    GameState.putNextGame(songs)
    #spawn setNextGame
    main(:loop)
  end

  def main(:loop) do
    cs = GameState.increaseCurrentSong()
    if cs == 0 do
      nextGame = GameState.getNextGame()
      GameState.putCurrentGame(nextGame)
      #push currentGame to clients
      spawn fn -> setNextGame() end
      Process.sleep(1000*2)
    end

    ts = :os.system_time(:millisecond)
    GameState.putTimeStamp(ts)

    IO.inspect ts
    IO.inspect cs
    Mousika.UserSocket.broadcast_to_standings("Server started new song.")
    #push ts, (cs) to clients
    Process.sleep(1000*32)
    main(:loop)
  end

  def setNextGame() do
    nextGame = Krotos.getGameSongs()
    GameState.putNextGame(nextGame)
  end
end
