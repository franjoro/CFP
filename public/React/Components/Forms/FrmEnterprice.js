const {useState} = React;

const App = (props) =>{
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

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
                        <div class="form-row m-2">
                            <div class="col-4">
                                <label htmlFor="txtEnterprice">Nombre de empresa</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Ejem: Cocacola" 
                                    id="txtEnterprice" 
                                    onChange={(e)=>{setName(e.target.value)}}
                                />
                            </div>
                            <div class="col-8">
                                <label htmlFor="txtAddress">Dirección de empresa</label>
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
                                <label htmlFor="txtEnterprice">Actividad economica</label>
                                <input type="text" class="form-control" placeholder="Ejem: Blindaje de vehículos" id="txtEnterprice" />
                            </div>
                            <div class="col-4">
                                <label htmlFor="txtTel">Teléfono</label>
                                <input type="tel" class="form-control" placeholder="Ejem: 7775-2577" id="txtTel"/>
                            </div>
                            <div class="col-4">
                                <label htmlFor="txtTel">NIT</label>
                                <input type="text" class="form-control" placeholder="Ejem: 0614-20098-135-9" id="txtTel"/>
                            </div>
                        </div>
                        <div class="form-row m-2">
                            <div class="col-4">
                                <label htmlFor="txtInput">Aportación insaforp</label>
                                <input type="number" class="form-control" placeholder="Ejem: Blindaje de vehículos" id="txtInput" />
                            </div>
                            <div class="col-4">
                                <label htmlFor="txtNumP">N° Patronal</label>
                                <input type="number" class="form-control" placeholder="Ejem: 8899545121-521231" id="txtNumP"/>
                            </div>
                            <div class="col-4">
                                <label htmlFor="txtNumEmp">N° Empleados</label>
                                <input type="number" class="form-control" placeholder="Ejem: 58" id="txtNumEmp"/>
                            </div>
                        </div>
                        <div class="form-row m-2">
                            <div class="col-4">
                                <label htmlFor="txtEmail">Correo</label>
                                <input type="number" class="form-control" placeholder="Ejem: Blindaje de vehículos" id="txtEmail" />
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
                                name:name,
                                address:address
                            }
                            test(json);
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