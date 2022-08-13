<?php

namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;

class Auth extends BaseController
{
    
    public function login()
    {
        $session = \Config\Services::session();
        $modelUsers = new \App\Models\UsersModel();
        $request = \Config\Services::request()->getPost();
        $db = \Config\Database::connect();
        $query   = $db->query("SELECT * FROM sys_users where email = '".$request["email"]."'");
        $login = false;
        if(password_verify($request["password"], $query->getResultArray()[0]['password'])){
            $login = true;
            $array = [
                'user_name'  => $query->getResultArray()[0]['user_name'],
                'email'     => $query->getResultArray()[0]['email'],
                'id' => $query->getResultArray()[0]['id'],
                'status' => true,
            ];
            
            $session->set($array);
        }else {
            $login = false;
        }

        //$request["email"];
        //$request["password"];
        //var_dump("SELECT * FROM sys_users where email = '".$request["email"]."' AND password = '".password_hash($request["password"], PASSWORD_BCRYPT, ['cost' => 10])."'");
        /* if(password_verify()){

        } */
        $this->content['datos_sesion'] = $session->get();
        $this->content['sesion'] = $login;
        $this->response->setJSON($this->content);
        $this->response->send();
    }

    public function logout()
    {
        $session = \Config\Services::session();
        $session->remove($session->get());
        $this->content['sesion'] = $session;
        $this->response->setJSON($this->content);
        $this->response->send();
    }
}