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
    IO.puts "GameLogic started"
    _ = DatabaseState.initDBConnection(:default)
    Process.sleep(1000)
    songs = Krotos.getGameSongs()
    GameState.putNextGame(songs)
    #spawn setNextGame
    main(:loop)
  end

  def main(:loop) do
    begin_timer = :os.system_time(:millisecond)
    GameState.resetSolved()
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

    #IO.inspect ts
    IO.puts("Round " <> to_string(cs) <> " starts.")
    #Mousika.GameChannel.broadcast_to_standings("Server started new song.")
    #push ts, (cs) to clients
    diff = :os.system_time(:millisecond) - begin_timer
    Process.sleep(1000*32 - diff)
    main(:loop)
  end

  def setNextGame() do
    nextGame = Krotos.getGameSongs()
    GameState.putNextGame(nextGame)
  end

  def handleSolvedArtist(username, time) do
    standings = GameState.getStandings()
    newScore =
      case Map.get(standings, username) do
        {points, _, t_s, _} ->
          case t_s do
            true -> {points+3, true, true, time}
            false -> {points+1, true, false, 0}
          end
        nil -> {1, true, false, 0}
      end
    standings = Map.put(standings, username, newScore)
    GameState.putStandings(standings)
    {points, a_s, t_s, time} = newScore
    case Poison.encode(%{event: "NewScore" , value: %{username: username, points: points, artistSolved: a_s, titleSolved: t_s, time: time}}) do
      {:ok, msg} ->
         Mousika.GameChannel.broadcast_to_standings(msg)
      {:error, err} -> IO.inspect err
    end
  end

  def handleSolvedTitle(username, time) do
    standings = GameState.getStandings()
    #IO.inspect(standings)
    newScore =
      case Map.get(standings, username) do
        {points, a_s, _, _} ->
          case a_s do
            true -> {points+3, true, true, time}
            false -> {points+1, false, true, 0}
          end
        nil -> {1, false, true, 0}
      end
    standings = Map.put(standings, username, newScore)
    GameState.putStandings(standings)
    #IO.inspect(GameState.getStandings())
    {points, a_s, t_s, time} = newScore
    case Poison.encode(%{event: "NewScore" , value: %{username: username, points: points, artistSolved: a_s, titleSolved: t_s, time: time}}) do
      {:ok, msg} ->
         Mousika.GameChannel.broadcast_to_standings(msg)
      {:error, err} -> IO.inspect err
    end
  end
end
