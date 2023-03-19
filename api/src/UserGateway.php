<?php

class UserGateway
{
    private PDO $conn;
    private $database;

    public function __construct(Database $database)
    {
        $this->database = $database;
        $this->conn = $this->database->getConnection();
    }

    public function getAll(): array
    {
        $sql = "SELECT * FROM `Users`;";
        $stmt = $this->conn->query($sql);
        $data = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($data, $row);
        }

        return $data;
    }

    public function create($data)
    {
        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        try {
            $sql = "INSERT INTO `Users`(name, email, password) 
                    VALUES('$name', '$email', '$hashed_password')";

            $stmt = $this->conn->prepare($sql);

            $stmt->execute();

            echo json_encode([
                "success" => true,
                "message" => "User registered.",
                "id" => $this->conn->lastInsertId()
            ]); 
    
            return $this->conn->lastInsertId();
        } catch (Exception $error) {
            echo json_encode([
                "success" => false,
                "error" => $error
            ]);
        }
    }

    public function find($data)
    {
        $email = $data['email'];
        $sql = "SELECT *
                FROM `Users`
                WHERE email = '$email'";

        $stmt = $this->conn->prepare($sql);

        $stmt->execute();

        if ($stmt->rowCount() == 1) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $hashed_password = $row['password'];
            $password = $data['password'];

            if (password_verify($password, $hashed_password)) {
                echo json_encode([
                    "success" => true,
                    "message" => $row
                ]);
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "User not found."
                ]);
            }
        } else {
            echo json_encode([
                "success" => false
            ]);
        }

    }

    public function get(string $id)
    {
        $sql = "SELECT *
                FROM `Users`
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

    public function update()
    {
        $sql = "UPDATE `Users` SET name=:name, email=:email, password=:password WHERE id=:id";
    }

    public function delete(string $id): int
    {
        $sql = "DELETE FROM `Users`
                WHERE id ='$id'";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }
}
