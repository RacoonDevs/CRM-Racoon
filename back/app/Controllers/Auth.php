<?php

namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
class Auth extends BaseController
{
    //public $session = null;
    public function login()
    {
        $modelUsers = new \App\Models\UsersModel();
        $request = \Config\Services::request()->getPost();
        $db = \Config\Database::connect();
        $query   = $db->query("SELECT * FROM sys_users where email = '".$request["email"]."'and status = 1");
        $login = false;
        if(password_verify($request["password"], $query->getResultArray()[0]['password'])){
            $login = true;
            $array = [
                'user_name'  => $query->getResultArray()[0]['user_name'],
                'email'     => $query->getResultArray()[0]['email'],
                'name' => $query->getResultArray()[0]['name'],
                'id' => $query->getResultArray()[0]['id'],
                'status' => true,
            ];
            
            $this->session->set($array);
        }else {
            $array = [
                'user_name'  => null,
                'email'     => null,
                'name' => null,
                'id' => null,
                'status' => false,
            ];
            $this->session->set($array);
            $login = false;
        }

        //$request["email"];
        //$request["password"];
        //var_dump("SELECT * FROM sys_users where email = '".$request["email"]."' AND password = '".password_hash($request["password"], PASSWORD_BCRYPT, ['cost' => 10])."'");
        /* if(password_verify()){

        } */
        $this->content['datos_sesion'] = $this->session->get();
        $this->content['sesion'] = $login;
        $this->response->setJSON($this->content);
        $this->response->send();
    }

    public function logout()
    {
        //$session = session();
        //$this->session->remove($this->session->get());
        $this->session->destroy();
        $this->content['sesion'] = false;
        $this->response->setJSON($this->content);
        $this->response->send();
    }
}