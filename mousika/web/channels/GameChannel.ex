defmodule Mousika.GameChannel do
  use Phoenix.Channel

  def join("game:standings", message, socket) do
    #IO.inspect message
    {:ok, socket}
  end

  def join(_room, _params, _socket) do
    {:error, %{reason: "You can only join the channel game:standings"}}
  end

  def handle_in("new_msg", body, socket) do
    broadcast! socket, "new_message", body
    {:noreply, socket}
  end

  def broadcast_to_standings(msg) do
    Mousika.Endpoint.broadcast("game:standings", "new_msg", %{msg: msg})
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end
end
