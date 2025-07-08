<?php

namespace App\Http\Controllers;
use App\Models\MataProgram;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiMataProgramController extends Controller
{
    public function index(Request $request){
        $page = (int) $request->get('page', 1); // default halaman 1
        $perPage = (int) $request->get('per_page', 10); // default 10 item per halaman
        if($page<=0 || $perPage<=0){
            return response()->json([
                "title"=>"MataProgram.Invalid",
                "description"=>"permintaaan ditolak karena tidak valid",
            ], 500);
        }

        $total = MataProgram::count(); // total semua data
        $offset = ($page - 1) * $perPage;

        $datas = MataProgram::with("MTahun")->offset($offset)
                    ->limit($perPage);

        if($request->get("level")=="auditee"){
            $datas = $datas->where("id_fakultas_unit", $request->fakultas_unit);
        }
        $datas = $datas->get();

        if($datas->count()==0){
            return response()->json([
                "title"=>"MataProgram.EmptyData",
                "description"=>"data kosong",
            ], 400);
        }

        return response()->json([
            "data" => $datas,
            "meta" => [
                "current_page" => $page,
                "per_page" => $perPage,
                "total" => $total,
                "last_page" => ceil($total / $perPage),
            ]
        ]);
    }

    public function list_select(Request $request){
        $datas = MataProgram::select("mata_program.id", DB::raw("concat(master_tahun.tahun,' | ',mata_program.mata_program) as text"))
                            ->leftJoin("master_tahun", "mata_program.id_master_tahun","=","master_tahun.id")
                            ->get();

        if($datas->count()==0){
            return response()->json([
                "title"=>"MataProgram.EmptyData",
                "description"=>"data kosong",
            ], 400);
        }

        return response()->json($datas);
    }

    public function detail($id){
        $data = MataProgram::where("id",$id)->first();
        if($data==null){
            return response()->json([
                "title"=>"MataProgram.NotFound",
                "description"=>"data tidak ditemukan",
            ], 400);
        }

        return response()->json($data);
    }

    public function store(Request $request) //done
    {
        try {
            //[PR] belum pasang validasi
            // $validator          = validator($request->all(), MataProgramReq::create());

            // if (count($validator->errors())) {
            //     return redirect()->route('jenis_file_renstra.create')->withInput()->withErrors($validator->errors());
            // }

            $MataProgram                        = new MataProgram();
            $MataProgram->id_master_tahun       = $request->id_master_tahun;
            $MataProgram->mata_program          = $request->mata_program;
            $MataProgram->id_fakultas_unit      = $request->id_fakultas_unit;
            $MataProgram->save();

            return response()->noContent();
        } catch (Exception $e) {
            return response()->json([
                "title"=>"MataProgram.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
        return;
    }

    public function update(Request $request) //done
    {
        try {
            // $validator          = validator($request->all(), MataProgramReq::update());

            // if (count($validator->errors())) {
            //     return redirect()->route('jenis_file_renstra.edit')->withInput()->withErrors($validator->errors());
            // }

            $MataProgram                        = MataProgram::findOrFail($request->id);
            $MataProgram->id_master_tahun       = $request->id_master_tahun;
            $MataProgram->mata_program          = $request->mata_program;
            $MataProgram->id_fakultas_unit      = $request->id_fakultas_unit;
            $MataProgram->save();

            return response()->noContent();
        } catch (Exception $e) {
           return response()->json([
                "title"=>"MataProgram.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
    }

    public function destroy($id) //done
    {
        try {
            $MataProgram = MataProgram::findOrFail($id);
            $MataProgram->delete();

            return response()->noContent();
        } catch (Exception $e) {
           return response()->json([
                "title"=>"MataProgram.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
    }
}
