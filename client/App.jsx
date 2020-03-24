// import Button from '@material-ui/core/Button';
const {
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  Container,
  Card
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
      this.setState({  selected: event.target.value}, this.props.onCategoryChange(event.target.value))
    }

    render() {
      const {
        categories,
        selected
      } = this.state
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          onChange={this.handleChange}>
          {
            categories.map(e =>
              <MenuItem value={e} key={e}>
                {e}
              </MenuItem>
            )}
          </Select>
        )
      }
    }

class QuizPanel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      answers: [],
      correctAnswer: null
    }

  }

  render() {
    return(
    <Grid container spacing={3}>
    <Grid item  sm={4}/>
    <Grid item  sm={4}>
      <Card children="qual è la domanda in questa box"/>
    </Grid>
    <Grid item  sm={4}/>
    <Grid item sm={6}>
      <Card children="aaaa"/>
    </Grid>
    <Grid item sm={6}>
      <Card children="aaaa"/>
    </Grid>
    <Grid item sm={6}>
      <Card children="aaaa"/>
    </Grid>
    <Grid item sm={6}>
      <Card children="aaaa"/>
    </Grid>
</Grid>
)
  }

    }

    class MainGrid extends React.Component {

      constructor(props) {
        super(props)
        this.state = {
          selectedCategory: null
        }
        this.onCategoryChange = this.onCategoryChange.bind(this)

      }

      onCategoryChange(value) {
        this.setState({
          selected: value
        })

      }


      render() {
        const {selected, selectedCategory} = this.state
        let quizContainer
        let header
        let pannelloCategoria
        if(selected && selected !==''){
          header = "Hai selezionato " + selected
          quizContainer = (
            <QuizPanel selectedCategory={selectedCategory}/>
          )
        }else{
          header = "Metti alla prova la tua conoscenza!"
          pannelloCategoria = (
            <div>
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <SelectCategory onCategoryChange={this.onCategoryChange}/>
            </div>
          )
        }
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} style={{textAlign: "center"}}>
              <h1>
                {header}
              </h1>
            </Grid>
            <Grid item sm={6}>
              {pannelloCategoria}
            </Grid>
            <Grid item sm={6}/>
            {quizContainer}
          </Grid>
        )
      }
    }


    class App extends React.Component {
      render() {
        return <div>
          <MainGrid/>
        </div>
      }
    }

    ReactDOM.render(
      <App />,
      document.getElementById('quizApp')
    )
