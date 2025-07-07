import { useEffect, useRef, useState } from "react";
import AdminPage from "@src/AdminPage";
import { apiProduction } from "@src/Persistance/API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "@src/Components/Pagination ";
import Select from "@src/Components/Select";
import { CiCalendarDate } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import Input from "@src/Components/Input";
import { MdAbc } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { formatDate } from '@src/Utility';

//[PR] level & fakultas_unit belum di set value dari login
const Aktivitas = ({selected="",level,fakultas_unit=null}) => {
    const [id, setId] = useState(null);
    const [openModal, setOpenModal] = useState(null);
    const modalRef = useRef();
    const modalDeleteRef = useRef();
    const modalInstanceRef = useRef(null);
    const modalDeleteInstanceRef = useRef(null);

    const [loadingModal, setLoadingModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [dataSource, setDataSource] = useState([]);

    const [mataProgram, setMataProgram] = useState(null);
    const [aktivitas, setAktivitas] = useState(null);
    const [pic, setPic] = useState(null);
    const [tanggalAwal, setTanggalAwal] = useState(null);
    const [tanggalAkhir, setTanggalAkhir] = useState(null);
    
    const [listMataProgram, setListMataProgram] = useState([]);
    const [loadingMataProgram, setLoadingMataProgram] = useState(false);
    
    async function loadData(){
        setLoading(true);
        try {
            console.log(`execute loadData to call /api/aktivitas`);
            const response = await apiProduction.get(`/api/aktivitas?page=${page}`, {
                filter: ""
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

    function loadSelect(target=null){
        if(target==="mataProgram"){
            setListMataProgram([]);
            loadMataProgram();
        }
    }
    function addHandler() {
        setId(null);
        setMataProgram(null)
        setAktivitas(null);
        setPic(null);
        setTanggalAwal(null);
        setTanggalAkhir(null);
        setOpenModal("add")
        loadSelect("mataProgram");
    }
    function editHandler(data) {
        console.log(data)
        setId(data.id);
        setMataProgram(data.id_mata_program)
        setAktivitas(data.aktivitas);
        setPic(data.PIC);
        setTanggalAwal(data.target_rk_awal);
        setTanggalAkhir(data.target_rk_akhir);
        setOpenModal("edit")
        loadSelect("mataProgram");
    }
    function deleteHandler(data) {
        setId(data.id);
        setMataProgram(data.mata_program)
        setAktivitas(null);
        setPic(null);
        setTanggalAwal(null);
        setTanggalAkhir(null);
        setOpenModal("delete")
    }
    async function deleteProcess() {
        setLoadingModal(true);
        openModalDelete()
        try {
            console.log(`execute loadData to call /api/mata_program`);
            const response = await apiProduction.delete(`/api/mata_program/${id}`);

            if (response.status === 200 || response.status === 204) {
                toast.success('Berhasil disimpan!');
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
            closeModalDelete();
        }
    }
    async function createProcess() {
        setLoadingModal(true);
        openModalForm();
        try {
            console.log(`execute loadData to call /api/aktivitas`);
            const response = await apiProduction.post("/api/aktivitas", {
                id_fakultas_unit:fakultas_unit,
                id_mata_program:mataProgram,
                aktivitas:aktivitas,
                PIC:pic,
                target_rk_awal:tanggalAwal,
                target_rk_akhir:tanggalAkhir,
                mata_program:mataProgram,
            });

            if (response.status === 200 || response.status === 204) {
                toast.success('Berhasil disimpan!');
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
    async function updateProcess() {
        setLoadingModal(true);
        openModalForm();
        try {
            console.log(`execute loadData to call /api/aktivitas`);
            const response = await apiProduction.put("/api/aktivitas", {
                id_fakultas_unit:fakultas_unit,
                id_mata_program:mataProgram,
                aktivitas:aktivitas,
                PIC:pic,
                target_rk_awal:tanggalAwal,
                target_rk_akhir:tanggalAkhir,
                mata_program:mataProgram,
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

    const openModalDelete = () => {
        modalDeleteInstanceRef.current?.show();
    };

    const closeModalDelete = () => {
        modalDeleteInstanceRef.current?.hide();
    };


    useEffect(() => {
        if (modalRef.current && !modalInstanceRef.current) {
            modalInstanceRef.current = new window.bootstrap.Modal(modalRef.current, {
                backdrop: 'static',
            });
        }
        if (modalDeleteRef.current && !modalDeleteInstanceRef.current) {
            modalDeleteInstanceRef.current = new window.bootstrap.Modal(modalDeleteRef.current, {
                backdrop: 'static',
            });
        }
    }, []);

    useEffect(()=>{
        loadData()
    },[page]);
    
    useEffect(() => {
        const modal = modalInstanceRef.current;
        const modalDelete = modalDeleteInstanceRef.current;

        if (!modal || !modalDelete) return;

        if (openModal === "delete") {
            modal.hide();
            modalDelete.show();
        } else if (openModal === "add" || openModal === "edit") {
            modalDelete.hide();
            modal.show();
        } else{
            modalDelete.hide();
            modal.hide();
        }
    }, [openModal]);


    return <AdminPage selected={selected} level={level}>
        <div className="pagetitle">
            <h1>Aktivitas</h1>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Aktivitas</li>
                </ol>
            </nav>
        </div>
        <section className="section dashboard">
            <div className="flex justify-end items-center mb-4">
                <button className="px-4 py-2 rounded transition bg-green-500 hover:bg-green-600 text-white" onClick={()=>addHandler()}>Tambah</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading
                    ? "Loading..."
                    : (dataSource?.data ?? []).map(source => <Items idx={source?.id} 
                                                                mataProgram={source?.mata_program}
                                                                aktivitas={source?.aktivitas}
                                                                pic={source?.PIC}
                                                                tanggalAwal={source?.target_rk_awal}
                                                                tanggalAkhir={source?.target_rk_akhir}
                                                                open={source?.open} 
                                                                actionHandler={()=>actionHandler(source?.id)}
                                                                editHandler={()=>editHandler(source)}
                                                                deleteHandler={()=>deleteHandler(source)}
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
        
        <div className="modal modal-lg fade" data-bs-backdrop='static' tabIndex="-1" ref={modalDeleteRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Konfirmasi</h5>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        disabled={loadingModal}
                        onClick={()=>setOpenModal(null)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <h5 className="modal-title">Anda yakin ingin hapus data "{mataProgram}" ?</h5>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            disabled={loadingModal}
                        >
                            Tidak
                        </button>
                        <button type="button" className="btn btn-success" disabled={loadingModal} onClick={()=>deleteProcess()}>
                            Ya
                        </button>
                    </div>
                </div>
            </div>
        </div>

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
                                        handlerChange={setMataProgram} 
                                        items={listMataProgram} 
                                        selected={mataProgram} 
                                        loading={loadingMataProgram}/>

                            <Input
                                label="Aktivitas"
                                placeholder="Masukkan aktivitas"
                                value={aktivitas}
                                onChange={(e) => setAktivitas(e.target.value)}
                            />

                            <Input
                                label="PIC"
                                placeholder="Masukkan pic"
                                value={pic}
                                onChange={(e) => setPic(e.target.value)}
                            />

                            <Input
                                label="Target RK Awal"
                                placeholder="Masukkan target RK awal"
                                value={tanggalAwal}
                                onChange={(e) => setTanggalAwal(e.target.value)}
                            />

                            <Input
                                label="Target RK Akhir"
                                placeholder="Masukkan target RK akhir"
                                value={tanggalAkhir}
                                onChange={(e) => setTanggalAkhir(e.target.value)}
                            />
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
const Items = ({idx, mataProgram, aktivitas, pic, tanggalAwal, tanggalAkhir, open=false, actionHandler=()=>{}, deleteHandler=()=>{}, editHandler=()=>{}}) => {
    return <div key={idx} className="relative bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm font-semibold break-words mb-3 me-4">{aktivitas}</p>
                    <div className="flex items-center text-purple-400">
                        <MdAbc size={16} className="mr-2" />
                        <span className="text-sm">{mataProgram}</span>
                    </div>
                    <div className="flex items-center text-purple-400">
                        <BiUser size={16} className="mr-2" />
                        <span className="text-sm">{pic}</span>
                    </div>
                    <div className="flex items-center text-purple-400">
                        <CiCalendarDate size={16} className="mr-2" />
                        <span className="text-sm">{formatDate(tanggalAwal)} - {formatDate(tanggalAkhir)}</span>
                    </div>
                    <div className="absolute top-3 right-3">
                        <button className="p-2 rounded-full hover:bg-gray-200" onClick={actionHandler}>
                            <BsThreeDotsVertical  />
                        </button>
                        {open && <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 rounded-md overflow-hidden z-50">
                            <ul className="!py-1 !px-1 mb-0">
                                <li className="py-2 text-black hover:bg-gray-100 cursor-pointer" onClick={()=>deleteHandler()}>Hapus</li>
                                <li className="py-2 text-black hover:bg-gray-100 cursor-pointer" onClick={()=>editHandler()}>Edit</li>
                            </ul>
                        </div>}
                    </div>
                </div>
}

export default Aktivitas;