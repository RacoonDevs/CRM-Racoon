<?php

namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use App\Models\UsersModel;
class UsersController extends BaseController
{
    protected $modelName = 'App\Models\Medicine';
    protected $format    = 'json';
    public $content = ['result' => false, 'message' => ['title' => 'Error!', 'content' => 'Internal Server Error.']];
    
    public function getUsers()
    {
        $db = \Config\Database::connect();
        $query   = $db->query("SELECT * FROM sys_users");
        $this->content['users'] = $query->getResultArray();
        $this->response->setJSON($this->content);
        $this->response->send();
    }

    public function create()
    {
        try{
            $session = Services::session();
            $dataSession = $session->get();
            $modelUsers = new UsersModel();
            $validation = \Config\Services::validation();
            $validation->setRules(
                [
                    'email' => 'is_unique[sys_users.email]',
                ],
                [
                    'email' => [
                        'is_unique' => 'Lo siento, este email ya esta registrado intenta con otro por favor.',
                    ],
                ]
            );

            $request = \Config\Services::request()->getPost();
            
            $data = [
                'user_name' => $request["user_name"],
                'status' => $request["status"],
                'email' => $request["email"],
                'password' => password_hash($request["password"], PASSWORD_BCRYPT, ['cost' => 10]),
                'name' => $request["name"],
                'created_by' => intval($dataSession["id"]),
                'updated_at' => null,
            ];
            
            if ($modelUsers->insert($data)) {
                $this->content['users'] = "Se insertó correctamente el usuario";
            }else{
                $this->content['erros'] = $modelUsers->errors();
                $this->content['users'] = "No se pudo insertar el usuario";
            }
            $this->content['info'] = $data;
        } catch (Exception $e) {
            $this->content['errors'] = $e;
        }
        
        $this->response->setJSON($this->content);
        $this->response->send();
    }
    public function update($id)
    {
        try{
<<<<<<< HEAD
            $session = Services::session();
            $dataSession = $session->get();
            $modelUsers = new UsersModel();
            $validation = \Config\Services::validation();
            $validation->setRules([
                'email' => 'is_unique[sys_users.email]',
            ]);
=======
            $session = \Config\Services::session();
            // var_dump($session->get());
            // die();
            $modelUsers = new \App\Models\UsersModel();
>>>>>>> 3b25e64b5b0d455dda832e73c4fad22d666ae29d
            $request = \Config\Services::request()->getPost();
            //var_dump($dataSession["id"]);
            $data = [
                'user_name' => $request["user_name"],
                'status' => $request["status"],
                'email' => $request["email"],
                'password' => password_hash($request["password"], PASSWORD_BCRYPT, ['cost' => 10]),
                'name' => $request["name"],
                'updated_by' => intval($dataSession["id"]),
                'updated_at' => date("Y-m-d H:i:s"),
            ];
            
            if ($modelUsers->update(intval($id), $data)) {
                $this->content['users'] = "Se actualizó correctamente el usuario";
            }else{
                $this->content['users'] = "No se pudo actualizar el usuario";
                $this->content['errors'] = $modelUsers->error();
            }
            $this->content['info'] = $data;
        } catch (Exception $e) {
            $this->content['errors'] = $e;
        }
        $this->response->setJSON($this->content);
        $this->response->send();
    
    }
    public function disbaleUser($id)
    {
        try{
            $session = Services::session();
            $dataSession = $session->get();
            $modelUsers = new UsersModel();
            $request = \Config\Services::request()->getPost();
            
            $data = [
                'status' => $request["status"],
                'updated_at' => date("Y-m-d H:i:s"),
                'updated_by' => intval($dataSession["id"]),
            ];
            
            if ($modelUsers->update($id, $data)) {
                $this->content['users'] = "Se deshabilitó correcamente le usuario.";
            }else{
                $this->content['users'] = "No se pudo deshabilitar el usuario.";
            }
            $this->content['info'] = $data;
        } catch (Exception $e) {
            $this->content['errors'] = $e;
        }
        $this->response->setJSON($this->content);
        $this->response->send();
    }
}