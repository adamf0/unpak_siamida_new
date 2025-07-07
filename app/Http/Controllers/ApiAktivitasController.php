<?php

namespace App\Http\Controllers;
use App\Models\Aktivitas;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiAktivitasController extends Controller
{
    public function index(Request $request){
        $page = (int) $request->get('page', 1); // default halaman 1
        $perPage = (int) $request->get('per_page', 10); // default 10 item per halaman
        if($page<=0 || $perPage<=0){
            return response()->json([
                "title"=>"Aktivitas.Invalid",
                "description"=>"permintaaan ditolak karena tidak valid",
            ], 500);
        }

        $total = Aktivitas::count(); // total semua data
        $offset = ($page - 1) * $perPage;

        $datas = Aktivitas::select("aktivitas.*",DB::raw("concat(master_tahun.tahun,' | ',mata_program.mata_program) as mata_program"))
                    ->leftJoin("mata_program", "aktivitas.id_mata_program","=","aktivitas.id")
                    ->leftJoin("master_tahun", "mata_program.id_master_tahun","=","master_tahun.id")
                    ->offset($offset)
                    ->limit($perPage)
                    ->get();

        if($datas->count()==0){
            return response()->json([
                "title"=>"Aktivitas.EmptyData",
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
        $datas = Aktivitas::select("aktivitas.id",DB::raw("concat(master_tahun.tahun,' | ',mata_program.mata_program) as text"))
                    ->leftJoin("mata_program", "aktivitas.id_mata_program","=","aktivitas.id")
                    ->leftJoin("master_tahun", "mata_program.id_master_tahun","=","master_tahun.id")
                    ->where("id_fakultas_unit",$request->id_fakultas_unit)
                    ->get();

        if($datas->count()==0){
            return response()->json([
                "title"=>"Aktivitas.EmptyData",
                "description"=>"data kosong",
            ], 400);
        }

        return response()->json($datas);
    }

    public function detail($id){
        $data = Aktivitas::where("id",$id)->first();
        if($data==null){
            return response()->json([
                "title"=>"Aktivitas.NotFound",
                "description"=>"data tidak ditemukan",
            ], 400);
        }

        return response()->json($data);
    }

    public function store(Request $request) //done
    {
        try {
            //[PR] belum pasang validasi
            // $validator          = validator($request->all(), AktivitasReq::create());

            // if (count($validator->errors())) {
            //     return redirect()->route('jenis_file_renstra.create')->withInput()->withErrors($validator->errors());
            // }

            $Aktivitas                          = new Aktivitas();
            $Aktivitas->id_fakultas_unit        = $request->id_fakultas_unit;
            $Aktivitas->id_mata_program         = $request->id_mata_program;
            $Aktivitas->aktivitas               = $request->aktivitas;
            $Aktivitas->PIC                     = $request->PIC;
            $Aktivitas->target_rk_awal          = $request->target_rk_awal;
            $Aktivitas->target_rk_akhir         = $request->target_rk_akhir;
            $Aktivitas->id_fakultas_unit        = $request->id_fakultas_unit;
            $Aktivitas->save();

            return response()->noContent();
        } catch (Exception $e) {
            return response()->json([
                "title"=>"Aktivitas.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
        return;
    }

    public function update(Request $request) //done
    {
        try {
            // $validator          = validator($request->all(), AktivitasReq::update());

            // if (count($validator->errors())) {
            //     return redirect()->route('jenis_file_renstra.edit')->withInput()->withErrors($validator->errors());
            // }

            $Aktivitas                          = Aktivitas::findOrFail($request->id);
            $Aktivitas->id_fakultas_unit        = $request->id_fakultas_unit;
            $Aktivitas->id_mata_program         = $request->id_mata_program;
            $Aktivitas->aktivitas               = $request->aktivitas;
            $Aktivitas->PIC                     = $request->PIC;
            $Aktivitas->target_rk_awal          = $request->target_rk_awal;
            $Aktivitas->target_rk_akhir         = $request->target_rk_akhir;
            $Aktivitas->id_fakultas_unit        = $request->id_fakultas_unit;
            $Aktivitas->save();

            return response()->noContent();
        } catch (Exception $e) {
           return response()->json([
                "title"=>"Aktivitas.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
    }

    public function destroy($id) //done
    {
        try {
            $Aktivitas = Aktivitas::findOrFail($id);
            $Aktivitas->delete();

            return response()->noContent();
        } catch (Exception $e) {
           return response()->json([
                "title"=>"Aktivitas.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
    }
}
