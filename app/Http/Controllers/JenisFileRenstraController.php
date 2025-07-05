<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class JenisFileRenstraController extends Controller
{
    public function __construct(public $level = null)
    {
        // $level = Session::get("level");
        $this->level = "admin";
    }
    public function index(Request $request) //done
    {
        return Inertia::render("JenisFile/JenisFile",[
            "selected"=>"jenis_file_renstra",
            "level"=>$this->level,
        ]);
    }
}
