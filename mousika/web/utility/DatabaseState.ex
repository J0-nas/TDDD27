defmodule DatabaseState do
  def initDBConnection(id) do
    case Hermes.start() do
      {:ok, p} -> DatabaseState.Store.put(id, p)
      {:error, msg} ->
        IO.puts(msg)
        {:error, msg}
    end
  end

  def getDBConnection(id) do
    DatabaseState.Store.get(id)
  end

  defmodule Store do
    def start_link(:ok) do
      Agent.start_link(fn -> %{} end, name: :GameStateStore)
    end
    def get(key) do
      Agent.get(:GameStateStore, &Map.get(&1, key))
    end
    def put(key, value) do
      Agent.update(:GameStateStore, &Map.put(&1, key, value))
    end
  end
end
