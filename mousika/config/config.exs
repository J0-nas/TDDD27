# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :mousika,
  ecto_repos: [Mousika.Repo]

# Configures the endpoint
config :mousika, Mousika.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "gIWzNDfJfKjRlN6fDJRALxzhm0NW+Nu/eFQOu2d4eRZ0ejzd6y6TQQ6CUrKEJGlT",
  render_errors: [view: Mousika.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Mousika.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
