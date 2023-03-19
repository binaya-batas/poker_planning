<?php

class MembersGateway
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
        $sql = "SELECT * FROM `session`;";
        $stmt = $this->conn->query($sql);
        $data = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($data, $row);
        }

        return $data;
    }

    //gets all the members of a particular session.
    public function getMembers($id)
    {
        $data = array();

        //retrieves moderator of a session.
        $sql = "SELECT users.id,users.name from `users` 
                    LEFT JOIN `session` on users.id = session.moderator
                    WHERE session.id = '$id'
                    GROUP BY users.id";
        
        $stmt = $this->conn->query($sql);
        $stmt->execute();
        $moderator = $stmt->fetch(PDO::FETCH_ASSOC);

        array_push($data, $moderator);

        //retrieves all the members of a session.
        $sql2 = "SELECT users.id, users.name from `users`
                    LEFT JOIN `session_members` ON session_members.session_id = '$id'
                    WHERE users.id = session_members.member_id;";


        $stmt = $this->conn->query($sql2);
        
        $stmt->execute();
        
        while ($members = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($data, $members);
        }
        
        return $data;
    }

    //creates a new session
    public function create($data)
    {
        $name = $data['sessionName'];
        $moderator = $data['moderator'];
        $is_active = true;

        //creates an uuid
        $session_id_query = "SELECT UUID() as uuid";
        $session_id_result = $this->conn->prepare($session_id_query);
        $session_id_result->execute();
        $id_value = $session_id_result->fetch(PDO::FETCH_ASSOC);
        $session_id = $id_value['uuid'];

        try {
            $sql = "INSERT INTO `session`(id, name, moderator, is_active) 
                    VALUES('$session_id','$name', '$moderator', '$is_active')";

            $stmt = $this->conn->prepare($sql);

            $stmt->execute();

            return $session_id;
        } catch (Exception $error) {
            echo json_encode($error);
        }
    }

    //create new story point.
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

    //Adds new memebers to the session
    public function join($data)
    {
        $session_id = $data['sessionId'];
        $member_id = $data['memberId'];

        try {
            $sql = "INSERT INTO `session_members`(session_id, member_id) 
                    VALUES('$session_id', '$member_id')";

            $stmt = $this->conn->prepare($sql);

            $stmt->execute();

            return $session_id;
        } catch (Exception $error) {
            echo json_encode($error);
        }
    }

    // get single session.
    public function get($id)
    {
        $sql = "SELECT *
                FROM `session_members`
                WHERE session_id = '$id'";
        
        $stmt = $this->conn->prepare($sql);
        
        $stmt->execute();
        
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

    public function update()
    {
    }

    public function delete(string $id): int
    {
        $sql = "DELETE FROM `session_members`
                WHERE id ='$id'";

        $stmt = $this->conn->prepare($sql);

        $stmt->execute();

        return $stmt->rowCount();
    }
}
