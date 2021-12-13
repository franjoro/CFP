const {useState, useEffect} = React;
const {useCookies} = ReactCookie;
const {Button, Modal, Form} = ReactBootstrap

const Interview = () => {
    //#region  global enviroments whit useState
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [modality, setModality] = useState('');
    const [date, setDate] = useState('');
    const [importantInformation, setImportantInformation] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('');
    const [erCentralId, setErCentralId] = useState('');
    const [list, setList] = useState([]);
    const [urlServer, setUrlServer] = useState('http://localhost:3000');
    // const [urlServer, setUrlServer] = useState('http://localhost:3000');
    const [show, setShow] = useState(false)
    const [ cookies ,  setCookie ,  removeCookie ]  =  useCookies ( [ 'tokenapi' ] ) ;
    //#endregion

    
    useEffect(() => {
        read();
    }, [])


    //#region modalFunctions
    const handleClose = ()=>{setShow(false)};
    const handleShow = ()=>{setShow(true)};
    //#endregion


    const create = (e) =>{
        e.preventdefault();
        alert("Creando");
    };

    const read = () =>{
        axios.get(`${urlServer}/er-interview/read/${cookies.tokenapi}`)
        .then((res) => {
          setList(res.data);
        });
    };

    const readWhitParams = () =>{

    };

    const updateItem = () =>{

    };

    const deleteItem = ()=>{

    };

    return (
        <div className="col-12">
            <div className="card">
                <div className="card-body rounded shadow-sm">
                    <div className="row">
                        <div className="col-6">
                            <p>
                                <span 
                                    style={{"fontSize":"large", "fontWeight": "bold"}}
                                >Entrevistas
                                </span>
                                <span className="badge badge-success m-1 " 
                                    style={{"cursor":"pointer"}} 
                                    onClick={()=>{handleShow()}}
                                > 
                                    Agregar entrevista
                                </span>
                                
                            </p>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-responsive" table-responsive>
                                <thead>
                                    <tr >
                                        <th scope="col">#</th>
                                        <th scope="col">Empresa</th>
                                        <th scope="col">Modalidad</th>
                                        <th scope="col">Dirección</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Información importante</th>
                                        <th scope="col" width="80">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list.map((item) =>{
                                            return(
                                                <tr key={item.id}>
                                                    <th scope="row">1</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.modality}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.important_information}</td>
                                                    <td>
                                                        <div className="row mp-0">
                                                            <div className="col-12" >
                                                                <div className="btn-group" role="group" aria-label="">
                                                                    <Button className="btn btn-sm btn-info"><i className="fas fa-arrow-right"></i></Button>
                                                                    <Button className="btn btn-sm btn-primary"><i className="fas fa-eye"></i></Button>
                                                                    <Button className="btn btn-sm btn-warning"><i className="fas fa-pen"></i></Button>
                                                                    <Button className="btn btn-sm btn-danger"><i className="fas fa-trash"></i></Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                            
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Mantenimiento entrevista</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    <div className="row">
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="txtNameInterview" class="form-label">Nombre de entrevista</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="txtNameInterview" 
                                    placeholder="Ejem: Entrevista con Cocacola Julio 2021" 
                                    value={name}
                                    onChange={(e)=>{setName(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="txtNameInterview" class="form-label">Empresa</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="txtNameInterview" 
                                    placeholder="Ejem: Entrevista con Cocacola Julio 2021" 
                                    value={name}
                                    onChange={(e)=>{setName(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="txtModalityInteview" class="form-label">Modalidad</label>
                                <select 
                                    id="txtModalityInteview" 
                                    class="form-control"
                                    value={modality}
                                    onChange={(e)=>{setModality(e.target.value)}}
                                >
                                    <option selected>Escoge una opción</option>
                                    <option value="presencial">Presencial</option>
                                    <option value="virtual">Virtual</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-4">
                            <div class="mb-3">
                                <label for="dtDateInterview" class="form-label">Fecha</label>
                                <input 
                                    type="date" 
                                    class="form-control" 
                                    id="dtDateInterview" 
                                    placeholder="Ejem: Cocacola" 
                                    value={date}
                                    onChange={(e)=>{setDate(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div className="col-8">
                            <div class="mb-3">
                                <label for="txtAddressInterview" class="form-label">Dirección</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="txtAddressInterview" 
                                    placeholder="Ejem: Res. San Benito Col 2 Psje 1 N° 2D" 
                                    value={address}
                                    onChange={(e)=>{setAddress(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div class="mb-3">
                                <label for="txtImportantInformationInterview" class="form-label">Información importante</label>
                                <textarea 
                                    type="text" 
                                    class="form-control" 
                                    id="txtImportantInformationInterview" 
                                    placeholder="Ejem: Tiene que llegar a las 3 pm con 15 min de anticipación y preguntar en porteria por el Ing. Guillermo" 
                                    rows="3"
                                    value={importantInformation}
                                    onChange={(e)=>{setImportantInformation(e.target.value)}}
                                ></textarea>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="">
                                <button 
                                    type="button" 
                                    class="btn btn-success m-1 btn-sm float-rigth"
                                    onClick={(e)=>{alert("Hello")}}
                                    >Guardar
                                </button>
                                <button type="button" class="btn btn-secondary m-1 btn-sm" onClick={()=>{handleClose()}}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </div>   
    )
}

const rootElemet = document.getElementById("blockInterview");
ReactDOM.render(<Interview />, rootElemet);
