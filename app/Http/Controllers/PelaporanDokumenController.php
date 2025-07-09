<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PelaporanDokumenController extends Controller
{
    public function __construct(public $level = null)
    {
        // $level = Session::get("level");
        $this->level = "admin";
    }
    public function index(Request $request) //done
    {
        return Inertia::render("PelaporanDokumen/PelaporanDokumen",[
            "selected"=>"pelaporan_dokumen",
            "level"=>$this->level,
        ]);
    }
}
