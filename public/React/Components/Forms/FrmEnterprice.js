const {useState} = React;

const App = (props) =>{
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [economicAct, setEconomicAct] = useState('');
    const [phone, setPhone] = useState('');
    const [nit, setNit] = useState('');
    const [insaforp, setInsaforp] = useState('');
    const [numberP, setNumberP] = useState('');
    const [numEmp, setNumEmp] = useState('');
    const [email, setEmail] = useState('')

    return (
        <div class="modal fade" id="modalAddEnterprice" tabindex="-1" aria-labelledby="modalAddEnterpriceLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar empresa</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <p class="text-secondary">Las campos con asterisco (*) son obligatorios</p>
                            </div>
                        </div>
                        <div class="form-row m-2">
                            <div class="col-4">
                                <label htmlFor="txtEnterprice">Nombre de empresa*</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Ejem: Cocacola" 
                                    id="txtEnterprice" 
                                    onChange={(e)=>{setName(e.target.value)}}
                                />
                            </div>
                            <div class="col-8">
                                <label htmlFor="txtAddress">Dirección de empresa*</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Ejem: Res. La gloria Psje Lourdes Lot. 5B #56" 
                                    id="txtAddress"
                                    onChange={(e)=>{setAddress(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div class="form-row m-2">
                            <div class="col-4">
                                <label htmlFor="txtEnterprice">Actividad economica*</label>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    placeholder="Ejem: Blindaje de vehículos" 
                                    id="txtEnterprice" 
                                    onChange={(e)=>{setEconomicAct(e.target.value)}}
                                
                                    />
                            </div>
                            <div class="col-4">
                                <label htmlFor="txtTel">Teléfono*</label>
                                <input 
                                    type="tel" 
                                    class="form-control" 
                                    placeholder="Ejem: 7775-2577" 
                                    id="txtTel"
                                    onChange={(e)=>{setPhone(e.target.value)}}
                                />
                            </div>
                            <div class="col-4">
                                <label htmlFor="txtTel">NIT</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Ejem: 0614-20098-135-9" 
                                    id="txtTel"
                                    onChange={(e)=>{setNit(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div class="form-row m-2">
                            <div class="col-4">
                                <label htmlFor="txtInput">Aportación insaforp</label>
                                <input 
                                    type="number" 
                                    class="form-control" 
                                    placeholder="Ejem: Blindaje de vehículos"
                                    id="txtInput" 
                                    onChange={(e)=>{setInsaforp(e.target.value)}}
                                />
                            </div>
                            <div class="col-4">
                                <label htmlFor="txtNumP">N° Patronal</label>
                                <input 
                                    type="number" 
                                    class="form-control" 
                                    placeholder="Ejem: 8899545121-521231" 
                                    id="txtNumP"
                                    onChange={(e)=>{setNumberP(e.target.value)}}
                                />
                            </div>
                            <div class="col-4">
                                <label htmlFor="txtNumEmp">N° Empleados</label>
                                <input 
                                    type="number" 
                                    class="form-control" 
                                    placeholder="Ejem: 58" 
                                    id="txtNumEmp"
                                    onChange={(e)=>{setNumEmp(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div class="form-row m-2">
                            <div class="col-4">
                                <label htmlFor="txtEmail">Correo</label>
                                <input 
                                    type="number" 
                                    class="form-control" 
                                    placeholder="Ejem: Blindaje de vehículos" 
                                    id="txtEmail" 
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button 
                        type="button" 
                        class="btn btn-primary"
                        onClick={()=>{
                            const json = {
                                name,
                                address,
                                economicAct,
                                phone,
                                nit,
                                insaforp,
                                numberP,
                                numEmp,
                                email
                            }
                            createEnterprice(json);
                        }}
                    >Save changes</button>
                </div>
                </div>
                

            </div>
        </div>
        
    );
};

const rootElemet = document.getElementById("FrmEnterprice");
ReactDOM.render(<App/>, rootElemet);