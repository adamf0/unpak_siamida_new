import { useEffect, useRef, useState } from "react";
import AdminPage from "@src/AdminPage";
import { apiProduction } from "@src/Persistance/API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "@src/Components/Pagination ";
import Select from "@src/Components/Select";
import { BsThreeDotsVertical } from "react-icons/bs";
import Input from "@src/Components/Input";
import { formatDate } from '@src/Utility';
import RadioGroup from "../../Components/RadioGroup";

//[PR] level & fakultas_unit belum di set value dari login
const PelaporanPelaksanaan = ({selected="",level="",fakultas_unit=null}) => {
    const [id, setId] = useState(null);
    const [openModal, setOpenModal] = useState(null);
    const modalRef = useRef();
    const modalInstanceRef = useRef(null);
    
    const [loadingModal, setLoadingModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [dataSource, setDataSource] = useState([]);

    const [mataProgram, setMataProgram] = useState(null);
    const [aktivitas, setAktivitas] = useState(null);
    const [pic, setPic] = useState(null);
    const [tanggalAwal, setTanggalAwal] = useState(null);
    const [tanggalAkhir, setTanggalAkhir] = useState(null);

    const [statusRealisasi, setStatusRealisasi] = useState(null);
    const [tanggalRealisasiAwal, setTanggalRealisasiAwal] = useState(null);
    const [tanggalRealisasiAkhir, setTanggalRealisasiAkhir] = useState(null);
    const [detailPelaporam, setDetailPelaporam] = useState(null);

    const [listMataProgram, setListMataProgram] = useState([]);
    const [loadingMataProgram, setLoadingMataProgram] = useState(false);
    
    async function loadData(){
        setLoading(true);
        try {
            console.log(`execute loadData to call /api/aktivitas`);
            const response = await apiProduction.get(`/api/aktivitas`, {
                params: {
                    page:page,
                    filter: "",
                    level: level,
                    fakultas_unit: fakultas_unit
                }
            });

            if (response.status === 200 || response.status === 204) {
                const rawData = response?.data ?? {};
                const newData = (rawData.data ?? []).map(item => ({
                    ...item,
                    open: false,
                }));

                setDataSource({
                    ...rawData,
                    data: newData,
                });
            }
        } catch (error) {
            const status = error.response?.status;
            const rawResponse = error.response?.data;
            console.error(rawResponse);

            if(![200,204].includes(status) && rawResponse?.title!=="Aktivitas.EmptyData"){
                alert(rawResponse?.description ?? "ada masalah pada aplikasi");
            }
        } finally {
            setLoading(false);
        }
    }
    function actionHandler(id) {
        const newData = dataSource.data.map(item => ({
            ...item,
            open: item.id === id ? !item.open : false, 
        }));

        setDataSource({
            ...dataSource,
            data: newData,
        });
    }

    function editHandler(data) {
        setId(data.id);
        setMataProgram(data.id_mata_program)
        setAktivitas(data.aktivitas);
        setPic(data.PIC);
        setTanggalAwal(data.target_rk_awal);
        setTanggalAkhir(data.target_rk_akhir);

        setDetailPelaporam(data.detail);
        setStatusRealisasi(data.status_realisasi);
        setTanggalRealisasiAwal(data.target_r_awal);
        setTanggalRealisasiAkhir(data.target_r_akhir);
        setOpenModal("edit");
        loadSelect("mataProgram");
    }
    
    async function updateProcess() {
        setLoadingModal(true);
        openModalForm();
        try {
            console.log(`execute loadData to call /api/aktivitas/pelaporan_dokumen`);
            const response = await apiProduction.put("/api/aktivitas/pelaporan_dokumen", {
                id_fakultas_unit:fakultas_unit,
                status_realisasi:statusRealisasi,
                target_r_awal:tanggalRealisasiAwal,
                target_r_akhir:tanggalRealisasiAkhir,
                detail:detailPelaporam,
                id:id,
            });

            if (response.status === 200 || response.status === 204) {
                toast.success('Berhasil diupdate!');
                setPage(1)
                loadData()
            }
        } catch (error) {
            // console.error(error.response?.data)
            const status = error.response?.status;
            const detail =
                error.response?.description ?? "ada masalah pada aplikasi";

            toast.error(detail);
            console.error(detail);
        } finally {
            setLoadingModal(false);
            closeModalForm();
        }
    }
    
    const openModalForm = () => {
        modalInstanceRef.current?.show();
    };

    const closeModalForm = () => {
        modalInstanceRef.current?.hide();
    };

    async function loadMataProgram(){
        setLoadingMataProgram(true);
        try {
            console.log(`execute loadData to call /api/mata_program`);
            const response = await apiProduction.get(`/api/mata_program/list`, {
                filter: ""
            });

            if (response.status === 200 || response.status === 204) {
                const rawData = response?.data ?? {};
                setListMataProgram(rawData);
            }
        } catch (error) {
            const status = error.response?.status;
            const rawResponse = error.response?.data;
            console.error(rawResponse);

            if(![200,204].includes(status) && rawResponse?.title!=="MataProgram.EmptyData"){
                alert(rawResponse?.description!=null? "data mata program kosong":"ada masalah saat mengambil data mata program");
            }
        } finally {
            setLoadingMataProgram(false);
        }
    }

    function loadSelect(target=null){
        if(target==="mataProgram"){
            setListMataProgram([]);
            loadMataProgram();
        }
    }

    useEffect(() => {
        if (modalRef.current && !modalInstanceRef.current) {
            modalInstanceRef.current = new window.bootstrap.Modal(modalRef.current, {
                backdrop: 'static',
            });
        }
    }, []);

    useEffect(()=>{
        loadData()
    },[page]);
    
    useEffect(() => {
        const modal = modalInstanceRef.current;

        if (!modal) return;

        if (openModal === "add" || openModal === "edit") {
            modal.show();
        } else{
            modal.hide();
        }
    }, [openModal]);


    return <AdminPage selected={selected} level={level}>
        <div className="pagetitle">
            <h1>Pelaporan Pelaksanaan</h1>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Pelaporan Pelaksanaan</li>
                </ol>
            </nav>
        </div>
        <section className="section dashboard">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading
                    ? "Loading..."
                    : (dataSource?.data ?? []).map(source => <Items idx={source?.id} 
                                                                mataProgram={source?.mata_program}
                                                                aktivitas={source?.aktivitas}
                                                                pic={source?.PIC}
                                                                tanggalAwal={source?.target_rk_awal}
                                                                tanggalAkhir={source?.target_rk_akhir}

                                                                statusRealisasi={source?.status_realisasi}
                                                                tanggalRealisasiAwal={source?.target_r_awal}
                                                                tanggalRealisasiAkhir={source?.target_r_akhir}
                                                                detailPelaporam={source?.detail}

                                                                open={source?.open} 
                                                                actionHandler={()=>actionHandler(source?.id)}
                                                                editHandler={()=>editHandler(source)}
                                                                deleteHandler={()=>deleteHandler(source)}
                                                                level={level}
                                                                />)
                }
            </div>
            {!loading && <Pagination
                    currentPage={dataSource?.meta?.current_page ?? 1}
                    totalPages={dataSource?.meta?.last_page ?? 1}
                    onPageChange={(newPage) => setPage(newPage)}
                />}
        </section>
        
        <ToastContainer position="top-right" autoClose={3000} />
        
        <div className="modal modal-lg fade" data-bs-backdrop='static' tabIndex="-2" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{openModal=="add"? "Tambah":"Edit"}</h5>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={()=>setOpenModal(null)}
                        disabled={loadingModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-4">
                            <Select label={"Mata Program"} 
                                        items={listMataProgram} 
                                        selected={mataProgram} 
                                        loading={loadingMataProgram}
                                        disabled={true}/>

                            <Input
                                label="Aktivitas"
                                placeholder="Masukkan aktivitas"
                                value={aktivitas}
                                disabled={true}
                            />

                            <Input
                                label="PIC"
                                placeholder="Masukkan pic"
                                value={pic}
                                disabled={true}
                            />

                            <Input
                                label="Target RK Awal"
                                placeholder="Masukkan target RK awal"
                                value={tanggalAwal}
                                disabled={true}
                            />

                            <Input
                                label="Target RK Akhir"
                                placeholder="Masukkan target RK akhir"
                                value={tanggalAkhir}
                                disabled={true}
                            />

                            <RadioGroup
                                label="Status Realisasi"
                                items={[
                                    {
                                    id: "terlaksana",
                                    text: "Terlaksana",
                                    },
                                    {
                                    id: "belum_terlaksana",
                                    text: "Belum Terlaksana",
                                    },
                                ]}
                                selected={statusRealisasi}
                                handlerChange={setStatusRealisasi}
                                />

                            <Input
                                label="Target RK Awal"
                                placeholder="Masukkan target RK awal"
                                value={tanggalRealisasiAwal}
                                onChange={(e) => setTanggalRealisasiAwal(e.target.value)}
                            />

                            <Input
                                label="Target RK Akhir"
                                placeholder="Masukkan target RK akhir"
                                value={tanggalRealisasiAkhir}
                                onChange={(e) => setTanggalRealisasiAkhir(e.target.value)}
                            />

                            <div className="w-full relative">
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Detail
                                </label>
                                <div className="flex flex-col space-y-2">
                                    <textarea
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800 resize-none"
                                        rows={4}
                                        value={detailPelaporam}
                                        onChange={(e)=> setDetailPelaporam(e.target.value)}
                                        placeholder="Tulis sesuatu di sini..."/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-primary" disabled={loadingModal} onClick={()=> openModal=="add"? createProcess() : updateProcess()}>
                        Simpan
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </AdminPage>;
};
const Items = ({idx, mataProgram, aktivitas, pic, tanggalAwal, tanggalAkhir, statusRealisasi, tanggalRealisasiAwal, tanggalRealisasiAkhir, detailPelaporam, open=false, actionHandler=()=>{}, editHandler=()=>{},level}) => {
    return <div key={idx} className="relative bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm font-semibold break-words mb-3 me-4">{aktivitas}</p>
                    <table className="text-sm w-full table-fixed">
                        <tr>
                            <td width={100} className="w-28 align-top">Mata Program</td>
                            <td class="break-words">: {mataProgram}</td>
                        </tr>
                        <tr>
                            <td width={100} className="w-28 align-top">PIC</td>
                            <td class="break-words">: {pic}</td>
                        </tr>
                        <tr>
                            <td width={100} className="w-28 align-top">Tanggal RK</td>
                            <td class="break-words">: {formatDate(tanggalAwal)} - {formatDate(tanggalAkhir)}</td>
                        </tr>
                    </table>
                    <hr />
                    <table className="text-sm w-full table-fixed">
                        <tr>
                            <td class="w-28 align-top" width={100}>Status Realisasi</td>
                            <td class="break-words">:  
                                {statusRealisasi=="terlaksana"? 
                                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-700 text-white rounded-full">
                                        Terlaksana
                                    </span> : 
                                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-yellow-500 text-black rounded-full">
                                        Belum Terlaksana
                                    </span>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td class="w-28 align-top" width={100}>Tanggal Realisasi</td>
                            <td class="break-words">: {(tanggalRealisasiAwal!=null && tanggalRealisasiAkhir!=null)? `${formatDate(tanggalRealisasiAwal)}-${formatDate(tanggalRealisasiAkhir)}`:""}</td>
                        </tr>
                        <tr>
                            <td class="w-28 align-top" width={100}>Detail Pelaporan</td>
                            <td class="break-words">: {detailPelaporam ?? ""}</td>
                        </tr>
                    </table>
                    {
                        "auditee"===level && 
                        <div className="absolute top-3 right-3">
                            <button className="p-2 rounded-full hover:bg-gray-200" onClick={actionHandler}>
                                <BsThreeDotsVertical  />
                            </button>
                            {open && <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 rounded-md overflow-hidden z-50">
                                <ul className="!py-1 !px-1 mb-0">
                                    <li className="py-2 text-black hover:bg-gray-100 cursor-pointer" onClick={()=>editHandler()}>Edit</li>
                                </ul>
                            </div>}
                        </div>
                    }
                </div>
}

export default PelaporanPelaksanaan;