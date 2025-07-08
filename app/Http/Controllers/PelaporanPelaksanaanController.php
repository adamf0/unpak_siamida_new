<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PelaporanPelaksanaanController extends Controller
{
    public function __construct(public $level = null)
    {
        // $level = Session::get("level");
        $this->level = "auditee";
    }
    public function index(Request $request) //done
    {
        return Inertia::render("PelaporanPelaksanaan/PelaporanPelaksanaan",[
            "selected"=>"pelaporan_pelaksanaan",
            "level"=>$this->level,
        ]);
    }
}
