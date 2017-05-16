defmodule UserLogic do
  def login(body) do
    case DatabaseState.getDBConnection(:default) do
      {:ok, p} ->
        Hermes.login_user(p, "user")
      {:error, msg} -> {:error, Poison.encode!(%{state: "error", msg: msg})}
    end
  end
end
