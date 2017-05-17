defmodule DatabaseState do
  def initDBConnection(id) do
    IO.puts("in initDBConnection")
    case Hermes.start("root") do
      {:ok, p} ->
        IO.puts("started new mariadb link on ")
        IO.inspect(p)
        DatabaseState.Store.put(id, p)
      {:error, msg} ->
        IO.puts("initDB error " <> msg)
        {:error, msg}
    end
  end

  def getDBConnection(id) do
    case DatabaseState.Store.get(id) do
      nil -> {:error, "No element for " <> to_string id}
      p -> {:ok, p}
    end
  end

  defmodule Store do
    def start_link(:ok) do
      IO.puts("started store")
      Agent.start_link(fn -> %{} end, name: :DatabaseStateStore)
    end
    def get(key) do
      p = Agent.get(:DatabaseStateStore, &Map.get(&1, key))
      IO.puts("Store get returns:")
      IO.inspect(p)
      p
    end
    def put(key, value) do
      Agent.update(:DatabaseStateStore, &Map.put(&1, key, value))
    end
  end
end
