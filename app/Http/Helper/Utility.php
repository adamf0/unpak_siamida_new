<?php

namespace App\Http\Helper;

use Illuminate\Support\Facades\Session;

trait Utility {
     public static function getName(){
        return Session::get('name')??'N/A';
     }
     public static function getLevel(){
        if(Session::get('level')=="admin"){
            return "Admin";
        } else if(Session::get('level')=="auditee"){
            return "Auditee";
        } else if(Session::get('level')=="auditor1"){
            return "Auditor (Utama)";
        } else if(Session::get('level')=="auditor2"){
            return "Auditor (Pendamping)";
        }
        return "N/A";
     }
     public static function hasAdmin(){
        return Session::get('level')=="admin";
     }
     public static function hasAuditee(){
        return Session::get('level')=="auditee";
     }
     public static function hasPrimaryAuditor(){
        return Session::get('level')=="auditor1";
     }
     public static function hasSecondaryAuditor(){
        return Session::get('level')=="auditor2";
     }
     public static function loadAsset($path){
        return env('DEPLOY','dev')=='dev'? asset($path):secure_asset($path);
     }
     public static function formatNamaStandar($point=null,$number=null,$nama_standar=null){
      if(
         (empty($point) || is_null($point)) && 
         (empty($number) || is_null($number)) && 
         (empty($nama_standar) || is_null($nama_standar))
      ) return "N/A";
      if(
         (empty($point) || is_null($point)) && 
         (empty($number) || is_null($number)) && 
         (!empty($nama_standar) || !is_null($nama_standar))
      ) return $nama_standar;
      if(
         (!empty($point) || !is_null($point)) && 
         (empty($number) || is_null($number)) && 
         (!empty($nama_standar) || !is_null($nama_standar))
      ) return "$point.$nama_standar";
      
      return "$point.$number.$nama_standar";
     }
     public static function getClass($type=null){
         $type = strtolower($type); 
         if(empty($type) || !in_array($type,['minor','mayor','-'])) return "bg-secondary text-black";

         if($type=="minor") return "bg-warning text-black";
         else if($type=="mayor") return "bg-danger text-white";
         else return "bg-success text-white";         
    }  

    public static function getSqlWithBindings($query)
    {
        return vsprintf(str_replace('?', '%s', $query->toSql()), collect($query->getBindings())->map(function ($binding) {
            return is_numeric($binding) ? $binding : "'{$binding}'";
        })->toArray());
    } 
}