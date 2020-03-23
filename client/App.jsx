// import Button from '@material-ui/core/Button';
const {
    Button,
    Grid,
    Paper,
    Select,
    MenuItem,
    InputLabel
} = MaterialUI;



class SelectCategory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: '',
            categories: []
        }
        this.handleChange = this.handleChange.bind(this)

    }

    componentDidMount() {
        fetch("http://localhost:3000/quiz/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        categories: result.payload,
                    })
                },
                (error) => {
                    console.log(error)
                })
    }

    handleChange(event) {
        this.setState({
            selected: event.target.value
        });
    }

    render() {
        const {
            categories,
            selected
        } = this.state
        return (
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selected} onChange={this.handleChange}>
              {
                categories.map(e => <MenuItem value={e} key={e}>{e}</MenuItem>)}
              </Select>)
    }
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



class App extends React.Component {
    render() {
        return <div><MainGrid/></div>
    }
}

ReactDOM.render(<App />, document.getElementById('quizApp'))
