import { useEffect, useRef, useState } from "react";
import AdminPage from "@src/AdminPage";
import { apiProduction } from "@src/Persistance/API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "@src/Components/Pagination ";
import Select from "@src/Components/Select";
import { CiCalendarDate } from "react-icons/ci";
import { BsListNested, BsThreeDotsVertical } from "react-icons/bs";
import { IoText } from "react-icons/io5";
import { VscSymbolOperator } from "react-icons/vsc";
import Input from "@src/Components/Input";

const Indikator = ({selected="",level}) => {
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

    const [tahun, setTahun] = useState(null);
    const [standarRenstra, setStandarRenstra] = useState(null);
    const [indikator, setIndikator] = useState(null);
    const [subIndikator, setSubIndikator] = useState(null);
    const [tipetarget, setTipetarget] = useState(null);
    const [operator, setOperator] = useState(null);
    
    const [listStandarRenstra, setListStandarRenstra] = useState([]);
    const [loadingStandarRenstra, setLoadingStandarRenstra] = useState(false);

    const [listSubIndikator, setListSubIndikator] = useState([]);
    const [loadingSubIndikator, setLoadingSubIndikator] = useState(false);

    const listTipeTarget = [
        {
            id:"numerik",
            text:"numerik",
        },
        {
            id:"kategori",
            text:"kategori",
        },
        {
            id:"range",
            text:"range",
        },
    ];
    const listOperator = [
        {
            id:">",
            text:">",
        },
        {
            id:">=",
            text:">=",
        },
        {
            id:"<",
            text:"<",
        },
        {
            id:"<=",
            text:"<=",
        },
    ];
    
    async function loadData(){
        setLoading(true);
        try {
            console.log(`execute loadData to call /api/master_indikator_renstra`);
            const response = await apiProduction.get(`/api/master_indikator_renstra?page=${page}`, {
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

            if(![200,204].includes(status) && rawResponse?.title!=="Indikator.EmptyData"){
                alert(rawResponse?.description ?? "ada masalah pada aplikasi");
            }
        } finally {
            setLoading(false);
        }
    }
    async function loadStandarRenstra(){
        setLoadingStandarRenstra(true);
        try {
            console.log(`execute loadData to call /api/master_standar_renstra`);
            const response = await apiProduction.get(`/api/master_standar_renstra/list`, {
                filter: ""
            });

            if (response.status === 200 || response.status === 204) {
                const rawData = response?.data ?? {};
                setListStandarRenstra(rawData);
            }
        } catch (error) {
            // console.error(error.response?.data)
            const status = error.response?.status;
            const detail =
                error.response?.description ?? "ada masalah pada aplikasi";

            alert(detail);
            console.error(detail);
        } finally {
            setLoadingStandarRenstra(false);
        }
    }
    async function loadIndikator(){
        setLoadingSubIndikator(true);
        try {
            console.log(`execute loadData to call /api/master_indikator_renstra`);
            const response = await apiProduction.get(`/api/master_indikator_renstra/list`, {
                filter: ""
            });

            if (response.status === 200 || response.status === 204) {
                const rawData = response?.data ?? {};
                setListSubIndikator(rawData);
            }
        } catch (error) {
            // console.error(error.response?.data)
            const status = error.response?.status;
            const detail =
                error.response?.description ?? "ada masalah pada aplikasi";

            alert(detail);
            console.error(detail);
        } finally {
            setLoadingSubIndikator(false);
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
        if(target==="standarRenstra"){
            setListStandarRenstra([]);
            loadStandarRenstra();
        }
        if(target==="indikator"){
            setListSubIndikator([]);
            loadIndikator();
        }
    }
    function addHandler() {
        setId(null);
        setTahun(null)
        setStandarRenstra(null)
        setIndikator(null)
        setSubIndikator(null)
        setTipetarget(null)
        setOperator(null)
        setOpenModal("add")
        loadSelect("standarRenstra");
        loadSelect("indikator");
    }
    function editHandler(data) {
        console.log(data)
        setId(data.id);
        setTahun(data.tahun)
        setStandarRenstra(data.standar_renstra?.id)
        setIndikator(data.indikator)
        setSubIndikator(data.parent)
        setTipetarget(data.tipe_target)
        setOperator(data.operator)
        setOpenModal("edit")
        loadSelect("standarRenstra");
        loadSelect("indikator");
    }
    function deleteHandler(data) {
        setId(data.id);
        setTahun(null)
        setStandarRenstra(null)
        setIndikator(data.indikator)
        setSubIndikator(null)
        setTipetarget(null)
        setOperator(null)
        setOpenModal("delete")
    }
    async function deleteProcess() {
        setLoadingModal(true);
        openModalDelete()
        try {
            console.log(`execute loadData to call /api/master_indikator_renstra`);
            const response = await apiProduction.delete(`/api/master_indikator_renstra/${id}`);

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
            console.log(`execute loadData to call /api/master_indikator_renstra`);
            const response = await apiProduction.post("/api/master_indikator_renstra", {
                tahun:tahun,
                id_master_standar:standarRenstra,
                indikator:indikator,
                parent:subIndikator,
                tipe_target:tipetarget,
                operator:operator,
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
            console.log(`execute loadData to call /api/master_indikator_renstra`);
            const response = await apiProduction.put("/api/master_indikator_renstra", {
                tahun:tahun,
                id_master_standar:standarRenstra,
                indikator:indikator,
                parent:subIndikator,
                tipe_target:tipetarget,
                operator:operator,
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
            <h1>Indikator Renstra</h1>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Indikator Renstra</li>
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
                                                                tahun={source?.tahun} 
                                                                standarRenstra={source?.standar_renstra} 
                                                                indikator={source?.indikator} 
                                                                subIndikator={source?.sub_indikator} 
                                                                tipeTarget={source?.tipe_target}
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
                        <h5 className="modal-title">Anda yakin ingin hapus data "{indikator}" ?</h5>
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
                            <Input
                                label="Tahun"
                                placeholder="Masukkan tahun"
                                value={tahun}
                                onChange={(e) => setTahun(e.target.value)}
                            />

                            <Select label={"Standar Renstra"} 
                                        handlerChange={setStandarRenstra} 
                                        items={listStandarRenstra} 
                                        selected={standarRenstra} 
                                        loading={loadingStandarRenstra}/>

                            <Input
                                label="Indikator"
                                placeholder="Masukkan indikator"
                                value={indikator}
                                onChange={(e) => setIndikator(e.target.value)}
                            />
                            
                            <Select label={"Sub Indikator"} 
                                        handlerChange={setSubIndikator} 
                                        items={listSubIndikator} 
                                        selected={subIndikator} 
                                        loading={loadingSubIndikator}/>

                            <Select label={"Tipe Target"} 
                                        handlerChange={setTipetarget} 
                                        items={listTipeTarget} 
                                        selected={tipetarget}/>

                            {tipetarget=="range" && 
                            <Select label={"Operator"} 
                                        handlerChange={setOperator} 
                                        items={listOperator} 
                                        selected={operator}/>
                            }
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
const Items = ({idx, tahun, standarRenstra, indikator, subIndikator, tipeTarget, open=false, actionHandler=()=>{}, deleteHandler=()=>{}, editHandler=()=>{}}) => {
    return <div key={idx} className="relative bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm font-semibold break-words mb-3 me-4">{indikator}</p>
                    {
                        subIndikator && 
                        <div className="flex items-center text-purple-400">
                            <BsListNested size={16} className="mr-2" />
                            <span className="text-sm">{subIndikator?.indikator}</span>
                        </div>
                    }
                    <div className="flex items-center text-purple-400">
                        <IoText size={16} className="mr-2" />
                        <span className="text-sm">{standarRenstra?.nama}</span>
                    </div>
                    <div className="flex items-center text-purple-400">
                        <CiCalendarDate size={16} className="mr-2" />
                        <span className="text-sm">{tahun}</span>
                    </div>
                    <div className="flex items-center text-purple-400">
                        <VscSymbolOperator size={16} className="mr-2" />
                        <span className="text-sm">{tipeTarget}</span>
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

export default Indikator;