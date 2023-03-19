<?php

class Database 
{
    private string $host;
    private string $dbname;
    private string $username;
    private string $password;

    public function __construct($host, $dbname, $username, $password){
        $this->host = $host;
        $this->dbname = $dbname;
        $this->username = $username;
        $this->password = $password;
    }

    public function getConnection(): PDO {
        $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset=utf8";
        
        return new PDO($dsn, $this->username, $this->password, [
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_STRINGIFY_FETCHES => false
        ]);
    }
}