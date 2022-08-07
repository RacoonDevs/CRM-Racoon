<?php

namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;

class Auth extends BaseController
{
    public function login()
    {
        $modelUsers = new \App\Models\UsersModel();
        $request = \Config\Services::request()->getPost();
        $db = \Config\Database::connect();
        $query   = $db->query("SELECT * FROM sys_users where email = '".$request["email"]."'");
        $login = false;
        if(password_verify($request["password"], $query->getResultArray()[0]['password'])){
            $login = true;
        }else {
            $login = false;
        }
        //$request["email"];
        //$request["password"];
        //var_dump("SELECT * FROM sys_users where email = '".$request["email"]."' AND password = '".password_hash($request["password"], PASSWORD_BCRYPT, ['cost' => 10])."'");
        /* if(password_verify()){

        } */
        
        $this->content['users'] = $login;
        $this->response->setJSON($this->content);
        $this->response->send();
    }
}