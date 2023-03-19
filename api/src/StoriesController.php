<?php

class StoriesController
{
    private StoriesGateway $gateway;

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
        $story = $this->gateway->get($id);
        $data = (array) json_decode(file_get_contents("php://input"), true);

        switch ($method) {
            case 'GET':
                echo json_encode($story);
                break;

            case 'POST':
                if (isset($data['action']) && $data['action'] === 'createNewStoryPoint' ) {
                    $this->gateway->createStoryPoint($data);
                }
                break;

            case 'PATCH':
                $rows = $this->gateway->updateStoryStatus($id, $data);

                echo json_encode([
                    "message" => "Story $id status updated",
                    "rows" => $rows
                ]);
                break;

            case 'DELETE':
                $rows = $this->gateway->delete($id);

                echo json_encode([
                    "message" => "Story $id deleted",
                    "rows" => $rows
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

                if (isset($data['action']) && $data['action'] === 'getActiveUserStory' ) {
                    $this->gateway->getActiveStory($data);
                }
                break;

            default:
                http_response_code(405);
                header("Allow: GET, POST");
        }
    }
}
