defmodule Mousika.SolvedController do
  use Mousika.Web, :controller

  def artist(conn, params) do
    IO.puts("artist solved")
    IO.inspect(conn)
    send_resp(conn, 200, "")
  end

  def title(conn, params) do
    IO.puts("title solved")
    IO.inspect(conn)
    send_resp(conn, 200, "")
  end
end
