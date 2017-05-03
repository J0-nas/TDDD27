FROM elixir

RUN mkdir -p /app

ARG VERSION=0.0.1
COPY _build/prod/rel/mousika/releases/${VERSION}/mousika.tar.gz /app/mousika.tar.gz

WORKDIR /app
RUN tar xvzf mousika.tar.gz

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8

EXPOSE 4000

RUN ls -lh /app/bin

CMD ["/app/bin/mousika", "foreground"]