defmodule ResponseGenerator do
  def gen_json(m) do
     case Poison.encode(m) do
       {:ok, js} -> js
       {:error, _} -> "{\"status\": -1, \"value\":\"Encoding failed\"}"
     end
  end
end
