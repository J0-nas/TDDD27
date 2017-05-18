defmodule UserLogic do

  def check_password(pw, cred) do
    unless length(cred) == 1 do
      {:error, "Internal Database error - more or less results for the credentials"}
    else
      IO.puts("in else")
      pw_hash = Enum.at(cred, 0)
      IO.inspect(pw_hash)
      case Comeonin.Bcrypt.checkpw(pw, pw_hash) do
        true -> {:ok, ResponseGenerator.gen_json(%{:status => 1, :value => "Logged in"})}
        false -> {:ok, ResponseGenerator.gen_json(%{:status => 2, :value => "Password is incorrect"})}
      end
    end
  end

  def login(body) do
    IO.puts("body:")
    IO.inspect(body)
    username = body["username"]
    password = body["password"]

    IO.inspect(username)
    IO.inspect(password)

    cond do
      is_nil(username) and is_nil(password) -> {:nix, ResponseGenerator.gen_json(%{:status => 0, :value => "Both parameter missing in login form"})}
      is_nil(username) -> {:nix, ResponseGenerator.gen_json(%{:status => 0, :value => "Username missing in login form"})}
      is_nil(password) -> {:nix, ResponseGenerator.gen_json(%{:status => 0, :value => "Password missing in login form"})}
      true ->
        case DatabaseState.getDBConnection(:default) do
          {:ok, p} ->
            case Hermes.get_user_credentials(p, username) do
              {:ok, cred} ->
                check_password(password, cred)
              {:nix, m} -> {:nix, m}
              {:error, err} -> {:error, ResponseGenerator.gen_json(%{:status => -1, :value => "Internal Database error"})}
            end
          {:error, msg} -> {:error, ResponseGenerator.gen_json(%{:status => -1, :value => msg})}
        end
    end

  end

  def register(body) do
    username = body["username"]
    email = body["email"]
    password = body["password"]

    if Enum.any?([username, email, password], fn(x) -> is_nil(x) end) do
      {:nix, ResponseGenerator.gen_json(%{:status => 0, :value => "At least one parameter missing in register form"})}
    else
      case DatabaseState.getDBConnection(:default) do
        {:ok, p} ->
          case Hermes.create_user(p, username, email, Comeonin.Bcrypt.hashpwsalt(password)) do
            {:ok, msg} -> {:ok, ResponseGenerator.gen_json(%{:status => 1, :value => msg})}
            {:nix, msg} -> {:nix, ResponseGenerator.gen_json(%{:status => 2, :value => msg})}
            {:error, err} -> {:error, ResponseGenerator.gen_json(%{:status => -1, :value => "Internal Database error"})}
          end
        {:error, msg} -> {:error, ResponseGenerator.gen_json(%{:status => -1, :value => msg})}
      end
    end
  end
end
