<?php

namespace App\Http\Controllers;

use App\Models\MasterIndikatorRenstra;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiIndikatorController extends Controller
{
    public function index(Request $request){
        $page = (int) $request->get('page', 1); // default halaman 1
        $perPage = (int) $request->get('per_page', 10); // default 10 item per halaman
        if($page<=0 || $perPage<=0){
            return response()->json([
                "title"=>"Indikator.Invalid",
                "description"=>"permintaaan ditolak karena tidak valid",
            ], 500);
        }

        $total = MasterIndikatorRenstra::count(); // total semua data
        $offset = ($page - 1) * $perPage;

        $datas = MasterIndikatorRenstra::with(["StandarRenstra","SubIndikator"])->offset($offset)
                    ->limit($perPage)
                    ->get();

        if($datas->count()==0){
            return response()->json([
                "title"=>"Indikator.EmptyData",
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
        $datas = MasterIndikatorRenstra::select("id", DB::raw("indikator as text"))->get();

        if($datas->count()==0){
            return response()->json([
                "title"=>"Indikator.EmptyData",
                "description"=>"data kosong",
            ], 400);
        }

        return response()->json($datas);
    }

    public function detail($id){
        $data = MasterIndikatorRenstra::where("id",$id)->first();
        if($data==null){
            return response()->json([
                "title"=>"Indikator.NotFound",
                "description"=>"data tidak ditemukan",
            ], 400);
        }

        return response()->json($data);
    }

    public function store(Request $request) //done
    {
        try {
            //[PR] belum pasang validasi
            // $validator          = validator($request->all(), IndikatorRenstraReq::create());

            // if (count($validator->errors())) {
            //     return redirect()->route('jenis_file_renstra.create')->withInput()->withErrors($validator->errors());
            // }

            $indikatorRenstra                       = new MasterIndikatorRenstra();
            $indikatorRenstra->tahun                = $request->tahun;
            $indikatorRenstra->id_master_standar    = $request->id_master_standar;
            $indikatorRenstra->indikator            = $request->indikator;
            $indikatorRenstra->parent               = $request->parent;
            $indikatorRenstra->tipe_target          = $request?->tipe_target;
            $indikatorRenstra->operator             = $request?->tipe_target == "range" ? $request?->operator : null;
            $indikatorRenstra->save();

            return response()->noContent();
        } catch (Exception $e) {
            return response()->json([
                "title"=>"Indikator.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
        return;
    }

    public function update(Request $request) //done
    {
        try {
            // $validator          = validator($request->all(), IndikatorRenstraReq::update());

            // if (count($validator->errors())) {
            //     return redirect()->route('jenis_file_renstra.edit')->withInput()->withErrors($validator->errors());
            // }

            $indikatorRenstra                       = MasterIndikatorRenstra::findOrFail($request->id);
            $indikatorRenstra->tahun                = $request->tahun;
            $indikatorRenstra->id_master_standar    = $request->id_master_standar;
            $indikatorRenstra->indikator            = $request->indikator;
            $indikatorRenstra->parent               = $request->parent;
            $indikatorRenstra->tipe_target          = $request?->tipe_target;
            $indikatorRenstra->operator             = $request?->tipe_target == "range" ? $request?->operator : null;
            $indikatorRenstra->save();

            return response()->noContent();
        } catch (Exception $e) {
           return response()->json([
                "title"=>"Indikator.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
    }

    public function destroy($id) //done
    {
        try {
            $IndikatorRenstra = MasterIndikatorRenstra::findOrFail($id);
            $IndikatorRenstra->delete();

            return response()->noContent();
        } catch (Exception $e) {
           return response()->json([
                "title"=>"Indikator.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
    }
}
