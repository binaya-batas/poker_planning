<?php

class UserController
{
    private UserGateway $gateway;

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
        $user = $this->gateway->get($id);

        switch ($method) {
            case 'GET':
                echo json_encode($user);
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

                if (isset($data['submit_register']) && $data['submit_register'] == 'submit_register') {
                    $this->gateway->create($data);
                } elseif (isset($data['submit_login']) && $data['submit_login'] == 'submit_login') {
                    $this->gateway->find($data);
                }
                break;

            default:
                http_response_code(405);
                header("Allow: GET, POST");
        }
    }
}
