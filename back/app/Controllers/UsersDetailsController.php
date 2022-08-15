<?php

namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use App\Models\UsersDetailsModel;
class UsersDetailsController extends BaseController
{
    protected $format    = 'json';
    public $content = ['result' => false, 'message' => ['title' => 'Error!', 'content' => 'Internal Server Error.']];
    
    public function getUsersDetails()
    {
        $db = \Config\Database::connect();
        $query   = $db->query("SELECT * FROM sys_user_details");
        $this->content['users'] = $query->getResultArray();
        $this->response->setJSON($this->content);
        $this->response->send();
    }

    public function create()
    {
        try{
            $session = Services::session();
            $dataSession = $session->get();
            $modelUsers = new UsersDetailsModel();
            $request = \Config\Services::request()->getPost();
            $validation = \Config\Services::validation();
            $validation->setRules(
                [
                    /* 'photo_url' => 'is_unique[sys_user_details.photo_url]', */
                    'phone' => 'is_unique[sys_user_details.phone]',
                ],
                [
                    /* 'photo_url' => [
                        'is_unique' => 'Lo siento, esta foto ya se encuentra en uso.',
                    ], */
                    'phone' => [
                        'is_unique' => 'Lo siento, este telefono ya se encuentra en uso.',
                    ],
                ]
            );
            $data = [
                'photo_url' => $request["photo_url"],
                'addres' => $request["addres"],
                'phone' => $request["phone"],
                'created_by' => $dataSession["id"],
                'updated_at' => null,
                'id_user' => intval($request["id_user"]),
            ];
            
            if ($modelUsers->insert($data)) {
                $this->content['users'] = "Detalle agregado correctamente";
            }else{
                $this->content['erros'] = $modelUsers->errors();
                $this->content['users'] = "No se pudo insertar el detalle";
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
            $session = Services::session();
            $dataSession = $session->get();
            $modelUsers = new UsersDetailsModel();
            $request = \Config\Services::request()->getPost();
            $validation = \Config\Services::validation();
            $validation->setRules([
                /* 'photo_url' => ["is_unique[sys_user_details.photo_url,id,$id]"], */
                'phone' => "is_unique[sys_user_details.phone,id,$id]",
            ]);
            $data = [
                'id' => $id,
                'photo_url' => $request["photo_url"],
                'addres' => $request["addres"],
                'phone' => $request["phone"],
                'created_by' => $dataSession["id"],
                'updated_at' => null,
                'id_user' => intval($request["id_user"]),
            ];
            
            if ($modelUsers->update(intval($id),$data)) {
                $this->content['users'] = "Detalle agregado correctamente";
            }else{
                $this->content['erros'] = $modelUsers->errors();
                $this->content['users'] = "No se pudo insertar el detalle";
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
        $this->response->setJSON($this->content);
        $this->response->send();
    }
}