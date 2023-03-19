<?php
// Allow from any origin
if(isset($_SERVER["HTTP_ORIGIN"]))
{
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
else
{
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");    // cache for 10 minutes

if($_SERVER["REQUEST_METHOD"] == "OPTIONS")
{
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT, PATCH"); //Make sure you remove those you do not want to support

    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    //Just exit with 200 OK with the above headers for OPTIONS method
    exit(0);
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

spl_autoload_register(function ($class) {
    require __DIR__ . "/src/$class.php";
});

set_exception_handler("ErrorHandler::handleException");

header("Content-type: application/json; charset=UTF-8");

$database = new Database("localhost", "poker_planning", "root", "root");

$url = $_SERVER["REQUEST_URI"];
$newUrl = explode("/", $url);
$id = $newUrl[3] ?? null;

//switch case for routing.
switch ($newUrl[2]) {
    case 'login':
        $gateway = new UserGateway($database);
        $controller = new UserController($gateway);
        $controller->processRequest($_SERVER["REQUEST_METHOD"], $id);
        break;

    case 'signup':
        $gateway = new UserGateway($database);
        $controller = new UserController($gateway);
        $controller->processRequest($_SERVER["REQUEST_METHOD"], $id);
        break;
    
    case 'session':
        $gateway = new SessionGateway($database);
        $controller = new SessionController($gateway);
        $controller->processRequest($_SERVER["REQUEST_METHOD"], $id);
        break;

    case 'members':
        $gateway = new MembersGateway($database);
        $controller = new MembersController($gateway);
        $controller->processRequest($_SERVER["REQUEST_METHOD"], $id);
        break;

    case 'stories':
        $gateway = new StoriesGateway($database);
        $controller = new StoriesController($gateway);
        $controller->processRequest($_SERVER["REQUEST_METHOD"], $id);
        break;
        
    case 'storypoint':
        $gateway = new StoryPointGateway($database);
        $controller = new StoryPointController($gateway);
        $controller->processRequest($_SERVER["REQUEST_METHOD"], $id);
        break;

    default:
        echo "error";
        break;
}



