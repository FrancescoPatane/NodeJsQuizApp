

const {
  Grid,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  Container,
  Card,
  Button,
  Dialog,
  DialogTitle
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
      index: 0,
      questions: [],
      answers: [],
      correctAnswer: null,
      outcome: null,
      openDialog: false,
      loading: true
    }

  }

  componentDidMount() {
    fetch("http://localhost:3000/quiz/category/" + this.props.selectedCategory).then(res => res.json()).then((result) => {
      this.setState({
        questions: result.payload.questions,
        currentQuestion: result.payload.questions[this.state.index],
        answers: result.payload.questions[this.state.index].answers,
        loading: false
      })
    }, (error) => {
      console.log(error)
    })
  }

  next = () => {
    this.setState({
    			index: this.state.index + 1,
    			currentQuestion: this.state.questions[this.state.index + 1],
          answers: this.state.questions[this.state.index + 1].answers
    		});
}

previous = () => {

  this.setState({
  			index: this.state.index - 1,
  			currentQuestion: this.state.questions[this.state.index -1],
        answers: this.state.questions[this.state.index -1].answers
  		});
}


 selectAnswer(number) {
   let selectionOutcome = number === this.state.currentQuestion.correctAnswer
   console.log(selectionOutcome)

  this.setState({
  			outcome: selectionOutcome,
        openDialog: true
  		});
}


 handleClose = () => {

   this.setState({
         openDialog: false
      });
 }


  render() {
    const {currentQuestion, answers, index, questions} = this.state
    if (currentQuestion) {
      return (<Grid container="container" spacing={6} style={{margin: "4%"}}>
        <Grid item="item" sm={4}/>
        <Grid item="item" sm={4}>
          <Card children={currentQuestion.text}/>
            <Dialog  open={this.state.openDialog && this.state.outcome} onClose={this.handleClose} >
              <DialogTitle>Risposta esatta</DialogTitle>
            </Dialog>
            <Dialog  open={this.state.openDialog && !this.state.outcome} onClose={this.handleClose} >
              <DialogTitle>Risposta sbagliata</DialogTitle>
            </Dialog>
        </Grid>
        <Grid item="item" sm={4}/>
        <Grid item="item" sm={6}>
          <Button variant="contained" color="primary" children={answers[0].text} onClick={() => this.selectAnswer(1)} style={{width: "100%"}}/>
        </Grid>
        <Grid item="item" sm={6}>
          <Button variant="contained" color="primary" children={answers[1].text} onClick={() => this.selectAnswer(2)} style={{width: "100%"}}/>
        </Grid>
        <Grid item="item" sm={6}>
          <Button variant="contained" color="primary" children={answers[2].text} onClick={() => this.selectAnswer(3)} style={{width: "100%"}}/>
        </Grid>
        <Grid item="item" sm={6}>
          <Button variant="contained" color="primary" children={answers[3].text} onClick={() => this.selectAnswer(4)} style={{width: "100%"}}/>
        </Grid>
        <Grid item="item" sm={3}/>
        <Grid item="item" sm={3}>
          {index > 0 && (
          <Button variant="contained" color="primary" onClick={this.previous} children="<<" style={{width: "100%"}}></Button>
          )}
        </Grid>
        <Grid item="item" sm={3}>
          {index < questions.length-1 && (
          <Button variant="contained" color="primary" onClick={this.next} children=">>" style={{width: "100%"}}></Button>
          )}
        </Grid>
        <Grid item="item" sm={3}/>
      </Grid>)
    } else {
      return (<Grid container="container" spacing={6}/>)
    }
  }

}

    class MainGrid extends React.Component {

      constructor(props) {
        super(props)
        this.state = {
          selectedCategory: null
        }
        this.onCategoryChange = this.onCategoryChange.bind(this)
        this.reset = this.reset.bind(this)

      }

      onCategoryChange(value) {
        this.setState({
          selectedCategory: value
        })

      }

      reset() {
        this.setState({
          selectedCategory: null
        })

      }


      render() {
        const {selectedCategory} = this.state
        let quizContainer
        let header
        let pannelloCategoria
        if(selectedCategory && selectedCategory !==''){
          header = "Hai selezionato " + selectedCategory
          pannelloCategoria = (
            <div>
              <Button variant="contained" color="primary" onClick={this.reset} children="<<" style={{width: "100%"}}/>
            </div>
          )
          quizContainer = (
            <QuizPanel selectedCategory={selectedCategory} onCategoryChange={this.onCategoryChange}/>
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
          <Grid container spacing={6}>
            <Grid item xs={12} style={{textAlign: "center"}}>
              <h1>
                {header}
              </h1>
            </Grid>
            <Grid item sm={2}/>
            <Grid item sm={2}>
              {pannelloCategoria}
            </Grid>
            <Grid item sm={2}/>
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
