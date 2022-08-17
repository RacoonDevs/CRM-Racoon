<?php

namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use App\Models\UsersModel;
use App\Models\UsersDetailsModel;
class UsersController extends BaseController
{
    protected $modelName = 'App\Models\Medicine';
    protected $format    = 'json';
    public $content = ['result' => false, 'message' => ['title' => 'Error!', 'content' => 'Internal Server Error.']];
    
    public function getUsers()
    {
        $request = \Config\Services::request()->getPost();
        $db = \Config\Database::connect();
        $query   = $db->query("SELECT * FROM sys_users WHERE created_by = ".$request["id"]."");
        $this->content['users'] = $query->getResultArray();
        $this->response->setJSON($this->content);
        $this->response->send();
    }

    public function create()
    {
        try{
            $db = \Config\Database::connect();
            $db->transStart();
            $session = Services::session();
            // $dataSession = $session->get();
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
                'created_by' => intval($request["created_by"]),
                'updated_at' => null,
            ];
            if ($modelUsers->insert($data)) {
                $modelUsersDetails = new UsersDetailsModel();
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
                $dataDetails = [
                    'photo_url' => null,
                    'addres' => null,
                    'phone' => null,
                    'created_by' => intval($request["created_by"]),
                    'updated_at' => null,
                    'id_user' => intval($modelUsers->getInsertID()),
                ];
                
                if ($modelUsersDetails->insert($dataDetails)) {
                    $db->transComplete();
                    if ($db->transStatus() == false) {
                        $this->content['errors_users'] = $modelUsers->errors();
                        $this->content['errors_users:details'] = $modelUsers->errors();
                        $db->transRollback();
                    }else{
                        $this->content['users'] = "Usuario registrado correctamente.";
                        $db->transCommit();
                    }
                }
                
            }else{
                $this->content['errors_users'] = $modelUsers->errors();
            }
            $this->content['info'] = $data;
            $db->close();
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
            $modelUsers = new UsersModel();
            $validation = \Config\Services::validation();
            $validation->setRules([
                'email' => "is_unique[sys_users.email,id,$id]",
            ]);
            $request = \Config\Services::request()->getPost();
            $data = [
                'id' => $id,
                'user_name' => $request["user_name"],
                'status' => $request["status"],
                'email' => $request["email"],
                // 'password' => password_hash($request["password"], PASSWORD_BCRYPT, ['cost' => 10]),
                'name' => $request["name"],
                'updated_by' => intval($request["updated_by"]),
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
    public function disableUser($id)
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