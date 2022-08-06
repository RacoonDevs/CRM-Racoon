<?php

namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
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
        $this->content['data'] = "Respondiendo";
        return $this->response->setJSON($this->content);
    
    }

    public function create()
    {
        try{
            $modelUsers = new \App\Models\UsersModel();
            $request = \Config\Services::request()->getPost();
            
            $data = [
                'user_name' => $request["user_name"],
                'status' => $request["status"],
                'email' => $request["email"],
                'password' => $request["password"],
                'name' => $request["name"],
                'created_by' => $request["created_by"],
                'updated_at' => null,
            ];
            
            if ($modelUsers->insert($data)) {
                $this->content['users'] = "Se insertó correctamente el usuario";
            }else{
                $this->content['users'] = "No se pudo insertar el usuario";
            }
            $this->content['info'] = $data;
        } catch (Exception $e) {
            $this->content['errors'] = $e;
        }
        
        return $this->response->setJSON($this->content);
    
    }
    public function update($id)
    {
        try{
            $modelUsers = new \App\Models\UsersModel();
            $request = \Config\Services::request()->getPost();
            
            $data = [
                'user_name' => $request["user_name"],
                'status' => $request["status"],
                'email' => $request["email"],
                'password' => $request["password"],
                'name' => $request["name"],
                'created_by' => $request["created_by"],
                'updated_at' => date("Y-m-d H:i:s"),
            ];
            
            if ($modelUsers->update($id, $data)) {
                $this->content['users'] = "Se actualizó correctamente el usuario";
            }else{
                $this->content['users'] = "No se pudo actualizar el usuario";
            }
            $this->content['info'] = $data;
        } catch (Exception $e) {
            $this->content['errors'] = $e;
        }
        return $this->response->setJSON($this->content);
    
    }
    public function disbaleUser($id)
    {
        try{
            $modelUsers = new \App\Models\UsersModel();
            $request = \Config\Services::request()->getPost();
            
            $data = [
                'status' => 1,
                'updated_at' => date("Y-m-d H:i:s"),
                'updated_by' => 1,
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
        return $this->response->setJSON($this->content);
    
    }
}