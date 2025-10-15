with import <nixpkgs> {};
mkShell {
  nativeBuildInputs = [
    nodePackages.nodejs
    mariadb
  ];
  shellHook =''
    if [ ! -d "/tmp/habittracker" ]; then
      mkdir -p /tmp/habittracker/tmp
      mysql_install_db --datadir=/tmp/habittracker --tmpdir=/tmp/habittracker/tmp 
      touch /tmp/habittracker/mysql_init

      echo "MariaDB initialized."
    fi
    if [ ! -e /tmp/habittracker/mysql.pid ]; then
      systemd-run --user --property=Type=simple /run/current-system/sw/bin/mysqld_safe --defaults-file=/home/jfh/.local/share/akonadi/mysql.conf --log-error=/tmp/habittracker/error.log --datadir=/tmp/habittracker/ --socket=/tmp/habittracker/mysql.socket --pid-file=/tmp/habittracker/mysql.pid --tmpdir=/tmp/habittracker/tmp
    fi
    false
    while([ "$?" -eq "1" ]); do
      mysqladmin --socket=/tmp/habittracker/mysql.socket ping
    done
    echo "create database if not exists habittracker; GRANT ALL PRIVILEGES ON habittracker.* TO 'jfh'@'localhost';" | mysql --socket=/tmp/habittracker/mysql.socket 
  '';
}
