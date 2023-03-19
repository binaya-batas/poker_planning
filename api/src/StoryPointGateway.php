<?php

class StoryPointGateway
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
        $story_id = $data['storyId'];
        $user_id = $data['userId'];
        $story_point = $data['storyPoint'];

        try {
            $sql = "INSERT INTO `stories_points`(story_id, user_id, story_point) 
                    VALUES('$story_id', '$user_id', '$story_point')";

            $stmt = $this->conn->prepare($sql);

            $stmt->execute();

            echo json_encode([
                "success" => true,
                "message" => "Story point added.",
            ]); 
    
            return $this->conn->lastInsertId();
        } catch (Exception $error) {
            echo json_encode([
                "success" => false,
                "error" => $error
            ]);
        }
    }

    public function revealStoryPoints($id)
    {

        $sql = "SELECT users.name, session_stories.story_title as Story, stories_points.story_point as Points FROM `Users`
            INNER JOIN stories_points on Users.id = stories_points.user_id
            INNER JOIN session_stories on session_stories.id = stories_points.story_id
            WHERE session_stories.session_id = '$id'";

        $stmt = $this->conn->prepare($sql);

        $stmt->execute();

        $data = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($data, $row);
        }

        echo json_encode([
            "storypoints" => $data
        ]);
        exit;

        return $data;
    }

    public function update()
    {

    }

}
