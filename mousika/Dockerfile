FROM elixir

RUN mkdir -p /app

ARG VERSION=0.0.1
COPY _build/prod/rel/mousika/releases/${VERSION}/mousika.tar.gz /app/mousika.tar.gz

WORKDIR /app
RUN tar xvzf mousika.tar.gz

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8

ENV NAPSTER_API_KEY MzRhNmYyNGMtNjgwMi00YzZmLTk0MGUtOGNkNmVlNWM3NzY0

EXPOSE 4000

RUN ls -lh /app/bin

RUN \
  apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0xcbcb082a1bb943db && \
  # echo "deb http://mariadb.mirror.iweb.com/repo/10.0/ubuntu `lsb_release -cs` main" > /etc/apt/sources.list.d/mariadb.list && \
  apt-get update && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y mariadb-server && \
  rm -rf /var/lib/apt/lists/* && \
  sed -i 's/^\(bind-address\s.*\)/# \1/' /etc/mysql/my.cnf && \
  echo "mysqld_safe &" > /tmp/config && \
  echo "mysqladmin --silent --wait=30 ping || exit 1" >> /tmp/config && \
  echo "mysql -e 'GRANT ALL PRIVILEGES ON *.* TO \"root\"@\"%\" WITH GRANT OPTION;'" >> /tmp/config && \
  bash /tmp/config && \
  rm -f /tmp/config

# Define mountable directories.
VOLUME ["/etc/mysql", "/var/lib/mysql"]

EXPOSE 3306

# RUN mysqld_safe
CMD /etc/init.d/mysql start
#RUN cat /etc/mysql/my.cnf
# CMD service mysql restart
COPY database.sql /app
CMD mysql -uroot -p < /app/database.sql

CMD ["/app/bin/mousika", "foreground"]
