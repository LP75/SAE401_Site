<?php

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
    session_regenerate_id();
}
	class Controller {
		private $action;

        public function __construct(array $arguments = array()){
			if(!empty($arguments)){
				foreach($arguments as $property=>$argument){
					$this->{$property}=$argument;
				}
			}
		}
        public function __get($n){
			return $this->$n;
		}
		public function __set($n, $v){
			$this->$n=$v;
		}
        public function invoke(){	
 
			if(isset($this->action)){
                if(!isset($_COOKIE["role"])) {
                    header("Location: index.php");
                }
                switch($this->action){
                    
                    case "login":
                        include("view/login.php");
                        break;
                    
                    case "home":
                        $page="home";
                        include_once("www/header.inc.php");
                        include_once("www/nav.inc.php");
                        include("view/home.php");
                        include_once("www/footer.inc.php");
                        break;
                    
                    case "addition":
                                                
                        //Forbidden for client
                        if ($_COOKIE["role"]=="client"){
                            include_once("www/header.inc.php");
                            include("view/error403.php");
                            include_once("www/footer.inc.php");
                            break;
                        }
                        $page="addition";
                        include_once("www/header.inc.php");
                        include_once("www/nav.inc.php");
                        include("view/addition.php");
                        include_once("www/footer.inc.php");
                        break;

                    case "account":
                                                
                        //Forbidden for client
                        if ($_COOKIE["role"]=="client"){
                            include_once("www/header.inc.php");
                            include("view/error403.php");
                            include_once("www/footer.inc.php");
                            break;
                        }
                        $page="account";
                        include_once("www/header.inc.php");
                        include_once("www/nav.inc.php");
                        include("view/account.php");
                        include_once("www/footer.inc.php");
                        break;

                    case "consultation":

                        //Forbidden for client and employee
                        if ($_COOKIE["role"]=="client" || $_COOKIE["role"]=="employee"){
                            include_once("www/header.inc.php");
                            include("view/error403.php");
                            include_once("www/footer.inc.php");
                            break;
                        }
                        $page="consultation";
                        include_once("www/header.inc.php");
                        include_once("www/nav.inc.php");
                        include("view/consultation.php");
                        include_once("www/footer.inc.php");
                        break;

                    case "modification":
                                                
                        //Forbidden for client
                        if ($_COOKIE["role"]=="client"){
                            include_once("www/header.inc.php");
                            include("view/error403.php");
                            include_once("www/footer.inc.php");
                            break;
                        }
                        $page="modification";
                        include_once("www/header.inc.php");
                        include_once("www/nav.inc.php");
                        include("view/modification.php");
                        include_once("www/footer.inc.php");
                        break;

                    case "products":

                        $page="products";
                        include_once("www/header.inc.php");
                        include_once("www/nav.inc.php");
                        include("view/products.php");
                        include_once("www/footer.inc.php");
                        break;
                        
                    case "deletion":
                                                
                        //Forbidden for client
                        if ($_COOKIE["role"]=="client"){
                            include_once("www/header.inc.php");
                            include("view/error403.php");
                            include_once("www/footer.inc.php");
                            break;
                        }
                        $page="deletion";
                        include_once("www/header.inc.php");
                        include_once("www/nav.inc.php");
                        include("view/deletion.php");
                        include_once("www/footer.inc.php");
                        break;
                    
                    case "terms":
                        $page="terms";
                        include_once("www/header.inc.php");
                        include_once("www/nav.inc.php");
                        include("view/termsConditions.php");
                        include_once("www/footer.inc.php");
                        break;

                    case "logout":

                        header("Location: index.php");
                        session_destroy();
                        break;
                        
                    default:
                        include_once("www/header.inc.php");
                        include("view/error404.php");
                        include_once("www/footer.inc.php");
                        break;
                }

            } else {
                $page="login";
                include_once("www/header.inc.php");
                include("view/login.php");
                include_once("www/footer.inc.php");
            }
        }

    }


?>