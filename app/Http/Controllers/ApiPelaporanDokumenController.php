<?php

namespace App\Http\Controllers;
use App\Models\PelaporanPelaksanaan;
use App\Rules\SafeFile;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class ApiPelaporanDokumenController extends Controller
{
    public function index(Request $request){
        $page = (int) $request->get('page', 1); // default halaman 1
        $perPage = (int) $request->get('per_page', 10); // default 10 item per halaman
        if($page<=0 || $perPage<=0){
            return response()->json([
                "title"=>"PelaporanPelaksanaan.Invalid",
                "description"=>"permintaaan ditolak karena tidak valid",
            ], 500);
        }

        $total = PelaporanPelaksanaan::count(); // total semua data
        $offset = ($page - 1) * $perPage;

        $datas = PelaporanPelaksanaan::with("MMataProgram")->offset($offset)
                    ->limit($perPage)
                    ->get();

        if($datas->count()==0){
            return response()->json([
                "title"=>"PelaporanPelaksanaan.EmptyData",
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
        $data = PelaporanPelaksanaan::with("MMataProgram")->where("id",$id)->first();
        if($data==null){
            return response()->json([
                "title"=>"PelaporanPelaksanaan.NotFound",
                "description"=>"data tidak ditemukan",
            ], 400);
        }

        return response()->json($data);
    }

    public function store(Request $request) //done
    {
        try {
            //[PR] belum pasang validasi
            $validator = Validator::make($request->all(), [
                // "id_fakultas_unit" => ["required"],
                "id_mata_program" => ["required"],
                "jenis_dokumen" => ["required"],
                "file" => ["required",'file', 'max:5120', new SafeFile(['application/pdf'])],
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    "title" => "PelaporanPelaksanaan.invalidValidation",
                    "description" => $validator->errors(),
                ], 500);
            }
            
            $check = PelaporanPelaksanaan::where("id_fakultas_unit",$request->id_fakultas_unit)
                                        ->where("id_mata_program",$request->id_mata_program)
                                        ->count();

            if($check>0){
                return response()->json([
                    "title"=>"PelaporanPelaksanaan.invalidRequest",
                    "description"=>"data pelaporan dengan mata program tersebut sudah ada",
                ], 400);
            }

            $file = null;
            if($request->has("file") && $request->hasFile("file")){
                $uuid = Uuid::uuid4()->toString();
                $file = $uuid.".".strtolower($request->file("file")->getClientOriginalExtension());
                $request->file("file")->storeAs('/', $file, ['disk' => "pelaporan_pelaksanaan"]);

                chmod(public_path('pelaporan_pelaksanaan/' . $file), 0644);
            }
            
            $PelaporanPelaksanaan                           = new PelaporanPelaksanaan();
            $PelaporanPelaksanaan->id_fakultas_unit         = $request->id_fakultas_unit;
            $PelaporanPelaksanaan->id_mata_program          = $request->id_mata_program;
            $PelaporanPelaksanaan->jenis_dokumen            = $request->jenis_dokumen;
            $PelaporanPelaksanaan->file                     = $file;
            $PelaporanPelaksanaan->save();

            return response()->noContent();
        } catch (Exception $e) {
            return response()->json([
                "title"=>"PelaporanPelaksanaan.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
        return;
    }

    public function update(Request $request) //done
    {
        try {
            $validator = Validator::make($request->all(), [
                "id" => ["required"],
                // "id_fakultas_unit" => ["required"],
                "id_mata_program" => ["required"],
                "jenis_dokumen" => ["required"],
                "file" => ['file', 'max:5120', new SafeFile(['application/pdf'])],
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    "title" => "PelaporanPelaksanaan.invalidValidation",
                    "description" => $validator->errors(),
                ], 500);
            }

            $file = null;
            if($request->has("file") && $request->hasFile("file")){
                $uuid = Uuid::uuid4()->toString();
                $file = $uuid.".".strtolower($request->file("file")->getClientOriginalExtension());
                $request->file("file")->storeAs('/', $file, ['disk' => "pelaporan_pelaksanaan"]);

                chmod(public_path('pelaporan_pelaksanaan/' . $file), 0644);
            }

            $PelaporanPelaksanaan                           = PelaporanPelaksanaan::findOrFail($request->id);
            $PelaporanPelaksanaan->id_fakultas_unit         = $request->id_fakultas_unit;
            $PelaporanPelaksanaan->id_mata_program          = $request->id_mata_program;
            $PelaporanPelaksanaan->jenis_dokumen            = $request->jenis_dokumen;
            if($file!=null){
                $PelaporanPelaksanaan->file                 = $file;
            }

            $check = PelaporanPelaksanaan::where("id_fakultas_unit",$request->id_fakultas_unit)
                                        ->where("id_mata_program",$request->id_mata_program)
                                        ->count();

            if($check>0 && $request->id_mata_program!=$PelaporanPelaksanaan->id_mata_program){
                return response()->json([
                    "title"=>"PelaporanPelaksanaan.invalidRequest",
                    "description"=>"data pelaporan dengan mata program tersebut sudah ada",
                ], 400);
            }

            $PelaporanPelaksanaan->save();

            return response()->noContent();
        } catch (Exception $e) {
           return response()->json([
                "title"=>"PelaporanPelaksanaan.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
    }

    public function destroy($id) //done
    {
        try {
            $PelaporanPelaksanaan = PelaporanPelaksanaan::findOrFail($id);
            $PelaporanPelaksanaan->delete();

            return response()->noContent();
        } catch (Exception $e) {
           return response()->json([
                "title"=>"PelaporanPelaksanaan.error",
                "description"=>$e->getMessage(),
            ], 400);
        }
    }
}
