<?php

class MembersController
{
    private MembersGateway $gateway;

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

    private function processResourceRequest($method, $id): void
    {
        $user = $this->gateway->get($id);
        $data = (array) json_decode(file_get_contents("php://input"), true);

        switch ($method) {
            case 'GET':
                
                echo json_encode($this->gateway->getMembers($id));
                break;

            case 'PATCH':

                $rows = $this->gateway->update($user, $data);

                echo json_encode([
                    "message" => "User $id updated",
                    "rows" => $rows
                ]);
                break;

            case 'DELETE':
                $rows = $this->gateway->delete($id);

                echo json_encode([
                    "message" => "User $id deleted",
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

                break;

            default:
                http_response_code(405);
                header("Allow: GET, POST");
        }
    }
}
