<?php

namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use App\Models\ProjectModel;
class ProjectController extends BaseController
{
    protected $format    = 'json';
    public $content = ['result' => false, 'message' => ['title' => 'Error!', 'content' => 'Internal Server Error.']];
    
    public function getProjects()
    {
        
        $request = \Config\Services::request()->getPost();
        $db = \Config\Database::connect();
        $query   = $db->query("SELECT * FROM sls_project WHERE created_by ='".$request["id"]."' and (delete_project = 0 or delete_project is null)");
        $this->content['projects'] = $query->getResultArray();;
        $this->response->setJSON($this->content);
        $this->response->send();
    }

    public function create()
    {
        try{
            $db = \Config\Database::connect();
            $db->transStart();
            /* var_dump($this->session->get());
            die(); */
            $project = new ProjectModel();
            
            $request = \Config\Services::request()->getPost();
            
            $data = [
                'name' => $request["name"],
                'icono_url' => $request["icono_url"],
                'descripcion' => $request["descripcion"],
                'status' => $request["status"],
                'start_date' => $request["start_date"],
                'end_date' => $request["end_date"],
                'created_by' => intval($request["created_by"]),
                'updated_at' => null,
            ];
            if ($project->insert($data)) {
                
                $db->transComplete();
                if ($db->transStatus() == false) {
                    $this->content['projects_errors'] = $project->errors();
                    $db->transRollback();
                }else{
                    $this->content['projects'] = "Proyecto registrado correctamente.";
                    $db->transCommit();
                }
                
            }else{
                $this->content['errors_projects'] = $project->errors();
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
            $project = new ProjectModel();
            $request = \Config\Services::request()->getPost();
            $data = [
                //'id' => $id,
                'name' => $request["name"],
                'icono_url' => $request["icono_url"],
                'descripcion' => $request["descripcion"],
                'status' => $request["status"],
                'start_date' => $request["start_date"],
                'end_date' => $request["end_date"],
                'updated_by' => intval($request["updated_by"]),
                'updated_at' => date("Y-m-d H:i:s"),
            ];
            
            if ($project->update(intval($id), $data)) {
                $this->content['projects'] = "Proyecto actualizado correctamente.";
            }else{
                $this->content['users'] = "No se pudo actualizar el proyecto.";
                $this->content['errors'] = $project->error();
            }
            $this->content['info'] = $data;
        } catch (Exception $e) {
            $this->content['errors'] = $e;
        }
        $this->response->setJSON($this->content);
        $this->response->send();
    
    }
    public function delete($id)
    {
        try{
            $session = Services::session();
            $dataSession = $session->get();
            $project = new ProjectModel();
            $request = \Config\Services::request()->getPost();
            
            $data = [
                //'id' => $id,
                'delete_project' => $request["delete_project"], // 1 eliminado, 0 no eliminado
                'updated_at' => date("Y-m-d H:i:s"),
                'updated_by' => intval($request["updated_by"]),
            ];
            
            if ($project->update($id, $data)) {
                $this->content['project'] = "Se eliminó correcamente el proyecto.";
            }else{
                $this->content['project'] = "No se pudo eliminar el proyecto.";
            }
            $this->content['info'] = $data;
        } catch (Exception $e) {
            $this->content['errors'] = $e;
        }
        $this->response->setJSON($this->content);
        $this->response->send();
    }
}