<?php

class StoryPointController
{
    private StoryPointGateway $gateway;

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
        $user = '';

        switch ($method) {
            case 'GET':
                $this->gateway->revealStoryPoints($id);
                break;

            case 'PATCH':
                $data = (array) json_decode(file_get_contents("php://input"), true);

                $rows = $this->gateway->update($user, $data);

                echo json_encode([
                    "message" => "User $id updated",
                    "rows" => $rows
                ]);
                break;

            case 'DELETE':
                echo json_encode([
                    "message" => "Story point deleted"
                ]);
                break;

            default:
                # code...
                break;
        }
    }

    private function processCollectionRequest($method): void
    {
        switch ($method) {
            case 'GET':
                echo json_encode($this->gateway->getAll());
                break;

            case 'POST':
                $data = json_decode(file_get_contents("php://input"), true);

                if (isset($data['action']) && $data['action'] == 'addStoryPoint') {
                    $this->gateway->create($data);
                }
                break;

            default:
                http_response_code(405);
                header("Allow: GET, POST");
        }
    }
}
