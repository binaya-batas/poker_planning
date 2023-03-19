<?php

class StoriesGateway
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
        $sql = "SELECT * FROM `session_stories`;";
        $stmt = $this->conn->query($sql);
        $data = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($data, $row);
        }

        return $data;
    }

    public function getActiveStory($data)
    {
        $status = $data['status'];
        $session_id = $data['sessionId'];

        $sql = "SELECT * FROM `session_stories` WHERE status='$status' AND session_id='$session_id'";
        $stmt = $this->conn->query($sql);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        //     array_push($data, $row);
        // }

        echo json_encode([
            "user" => $row
        ]);
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

    // creates new story point.
    public function createStoryPoint($data)
    {   
        $session_id = $data['sessionId'];
        $story_title = $data['storyTitle'];
        $story_description = $data['storyDescription'];
        $status = $data['status'];


        try {
            $sql = "INSERT INTO `session_stories`(session_id, story_title, story_description, status) 
                    VALUES('$session_id','$story_title', '$story_description', '$status')";

            $stmt = $this->conn->prepare($sql);

            $stmt->execute();

            echo json_encode([
                "message" => "Story added."
            ]);
        } catch (Exception $error) {
            echo json_encode($error);
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

    public function get($id)
    {
        $sql = "SELECT *
                FROM `session_stories`
                WHERE id = '$id'";

        $stmt = $this->conn->prepare($sql);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

    public function updateStoryStatus($id, $data)
    {
        $status = $data['status'];

        $sql = "UPDATE `session_stories` SET status='$status' WHERE id='$id'";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->execute();
    }

    public function delete(string $id): int
    {
        $sql = "DELETE FROM `session_stories`
                WHERE id ='$id'";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }
}
