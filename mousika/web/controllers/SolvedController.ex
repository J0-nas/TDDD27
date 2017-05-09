defmodule Mousika.SolvedController do
  use Mousika.Web, :controller

  def artist(conn, _params) do
    IO.puts("artist solved")
    IO.inspect(conn)
  end

  def title(conn, _params) do
    IO.puts("artist solved")
    IO.inspect(conn)
  end
end
