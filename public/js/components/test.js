const {useState} = React;

const test = () =>{
    axios.get('/admin/psicologia/studentsWithCadre')
    .then((response) => {
      console.log(response);
      
    });
};

const App = (props) =>{
    const [text, setText] = useState('hello');

    return (
      <div>
        <h1>{text}</h1>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button
            type="button"
            onClick={()=>{test()}}
            class="btn btn-success"
        >Enter</button>
      </div>
    );
};

const rootElemet = document.getElementById("like_button_container");
ReactDOM.render(<App/>, rootElemet);