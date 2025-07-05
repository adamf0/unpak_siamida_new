<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterStandarRenstraController extends Controller
{
    public function __construct(public $level = null)
    {
        // $level = Session::get("level");
        $this->level = "admin";
    }
    public function index(Request $request) //done
    {
        return Inertia::render("StandarRenstra/StandarRenstra",[
            "selected"=>"master_standar_renstra",
            "level"=>$this->level,
        ]);
    }
}
