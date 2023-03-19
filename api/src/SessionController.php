<?php

class SessionController
{
    private SessionGateway $gateway;
    
    public function __construct($gateway)
    {
        $this->gateway = $gateway;
    }

    public function processRequest(string $method, ?string $id): void
    {
        if ($id) {
            $this->processResourceRequest($method, $id);
        } else {
            $this->processCollectionRequest($method);
        }
    }

    private function processResourceRequest(string $method, string $id): void
    {
        $session = $this->gateway->get($id);
        $data = (array) json_decode(file_get_contents("php://input"), true);
        
        switch ($method) {
            case 'GET':
                echo json_encode($this->gateway->getSessionStories($id));
                break;

            case 'PATCH':
                $this->gateway->endSession($id);

                echo json_encode([
                    "message" => "Session end",
                ]);
                break;

            case 'POST':
                if (isset($data['action']) && $data['action'] === 'createNewStoryPoint' ) {
                    $this->gateway->createStoryPoint($data);
                }
                break;
            
            case 'DELETE':
                $rows = $this->gateway->delete($id);
                
                echo json_encode([
                    "message" => "Session $id deleted",
                    "rows" => $rows
                ]);
                break;

            default:
                echo "error";
                break;
        }
        
    }

    private function processCollectionRequest($method): void
    {
        $sessions = $this->gateway->getAll();
        switch ($method) {
            case 'GET':
                echo json_encode($sessions);
                break;

            case 'POST':
                $data = json_decode(file_get_contents("php://input"), true);

                if (isset($data['action']) && $data['action'] === 'createSession' ) {
                    $id = $this->gateway->create($data);
                    
                    if (isset($id)) {
                        echo json_encode([
                            "message" => "Session created.",
                            "id" => $id
                        ]); 
                    }    
                } elseif (isset($data['action']) && $data['action'] === 'joinSession') {
                    $sessionArray = array();
                    foreach ($sessions as $session) {
                        array_push($sessionArray, $session['id']);
                    }
                    
                    //checks if the session exists or not.
                    if (in_array($data['sessionId'], $sessionArray)) {
                        $id = $this->gateway->join($data);
    
                        if (isset($id)) {
                            echo json_encode([
                                "success" => true,
                                "message" => "Session joined.",
                                "id" => $id
                            ]); 
                        } 
                    } else {
                        echo json_encode([
                            "success" => false,
                            "message" => "No such session"
                        ]); 
                    }
                } elseif (isset($data['action']) && $data['action'] === 'getSessionHistory') {
                    $sessionHistory = $this->gateway->getSessionHistory($data);

                    echo json_encode([
                        "history" => $sessionHistory
                    ]);
                }
                
                break;

            default:
                http_response_code(405);
                header("Allow: GET, POST");
        }
    }
}
