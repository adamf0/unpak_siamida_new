<?php

namespace App\Http\Controllers;

use App\Models\MasterStandarRenstra;
use Exception;
use Illuminate\Http\Request;

class ApiStandarRenstraController extends Controller
{
    public function index(Request $request){
        $page = (int) $request->get('page', 1); // default halaman 1
        $perPage = (int) $request->get('per_page', 10); // default 10 item per halaman
        if($page<=0 || $perPage<=0){
            return response()->json([
                "title"=>"StandarRenstra.Invalid",
                "description"=>"permintaaan ditolak karena tidak valid",
            ], 500);
        }

        $total = MasterStandarRenstra::count(); // total semua data
        $offset = ($page - 1) * $perPage;

        $datas = MasterStandarRenstra::offset($offset)
                    ->limit($perPage)
                    ->get();

        if($datas->count()==0){
            return response()->json([
                "title"=>"StandarRenstra.EmptyData",
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

    public function detail($id){
        $data = MasterStandarRenstra::where("id",$id)->first();
        if($data==null){
            return response()->json([
                "title"=>"StandarRenstra.NotFound",
                "description"=>"data tidak ditemukan",
            ], 400);
        }

        return response()->json($data);
    }

    public function store(Request $request) //done
    {
        try {
            //[PR] belum pasang validasi
            // $validator          = validator($request->all(), StandarRenstraReq::create());

            // if (count($validator->errors())) {
            //     return redirect()->route('jenis_file_renstra.create')->withInput()->withErrors($validator->errors());
            // }

            $StandarRenstra               = new MasterStandarRenstra();
            $StandarRenstra->nama         = $request->nama;
            $StandarRenstra->save();

            return response()->noContent();
        } catch (Exception $e) {
            return response()->json([
                "title"=>"StandarRenstra.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
        return;
    }

    public function update(Request $request) //done
    {
        try {
            // $validator          = validator($request->all(), StandarRenstraReq::update());

            // if (count($validator->errors())) {
            //     return redirect()->route('jenis_file_renstra.edit')->withInput()->withErrors($validator->errors());
            // }

            $StandarRenstra               = MasterStandarRenstra::findOrFail($request->id);
            $StandarRenstra->nama         = $request->nama;
            $StandarRenstra->save();

            return response()->noContent();
        } catch (Exception $e) {
           return response()->json([
                "title"=>"StandarRenstra.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
    }

    public function destroy($id) //done
    {
        try {
            $StandarRenstra = MasterStandarRenstra::findOrFail($id);
            $StandarRenstra->delete();

            return response()->noContent();
        } catch (Exception $e) {
           return response()->json([
                "title"=>"StandarRenstra.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
    }
}
