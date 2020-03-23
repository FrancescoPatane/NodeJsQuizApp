// import Button from '@material-ui/core/Button';
const {
    Button,
    Grid,
    Paper,
    Select,
    MenuItem,
    InputLabel
} = MaterialUI;


function SelectCategory() {

    const [category, setCategory] = React.useState('Storia');

    const changeCategory = event => {
        setCategory(event.target.value)
    };

    return (
        <Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={category}
  onChange={changeCategory}
>
<MenuItem value={'Storia'}>Storia</MenuItem>
<MenuItem value={'Geografia'}>Geografia</MenuItem>
<MenuItem value={'Biologia'}>Biologia</MenuItem>
</Select>)
}


function MainGrid() {
    return (
        <Grid container spacing={3}>
        <Grid item xs={12} style={{textAlign: "center"}}>
          <h1>Metti alla prova la tua conoscenza!</h1>
        </Grid>
        <Grid item sm={6}>
        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
        <SelectCategory />
        </Grid>
        <Grid item  sm={6}>
          <Paper>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>xs=6 sm=3</Paper>
        </Grid>
      </Grid>)
}



const handleChange = event => {
    setAge(event.target.value);
};

class App extends React.Component {
    render() {
        return <div><MainGrid/></div>
    }
}

ReactDOM.render(<App />, document.getElementById('quizApp'))
