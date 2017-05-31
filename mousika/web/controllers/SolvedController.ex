defmodule Mousika.SolvedController do
  use Mousika.Web, :controller

  def artist(conn, params) do
    IO.puts("artist solved")
    #IO.inspect(conn)
    {_, s} = Poison.encode(%{msg: "Artist solved"})
    send_resp(conn, 200, s)
  end

  def title(conn, params) do
    IO.puts("title solved")
    #IO.inspect(conn)
    {_, s} = Poison.encode(%{msg: "Title solved"})
    send_resp(conn, 200, s)
  end
end
