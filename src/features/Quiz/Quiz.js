import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { getOwnedCoursesThatNeedQuiz } from '../../services/coursesService';

import './Quiz.css';
import { toast } from 'react-toastify';
import { addQuiz, getQuiz, updateQuiz } from '../../services/quizService';
const coursesMockUpData = [{'_id':'123','name':'aloha mi amore'}]

const TrueFalseQuiz = ( props ) => {

  const [ questions, setQuestions ] = useState( null );
  const [ questionTempState, setQuestionTempState ] = useState( null );
  const [ selectedQuestion, setSelectedQuestion ] = useState( 0 );
  const [ isLoading, setIsLoading ] = useState( true );
  

  // will run once to init data.
  useEffect( () => {
    debugger;
    // init data first if there is any.
    if( props.questions ) {
      setQuestionTempState(props.questions);
      setQuestions(props.questions);
      setIsLoading(false);

    }

    // init data based on question number if no question is presented
    if ( !props.questions ) {
      const questionsData = new Array( props.questionsNumber  ).fill().map( ( object ) => { return { 'question':'', 'answers':[ 'true', 'false' ], 'answer': 0 } } );
      setQuestionTempState( questionsData );
      setQuestions(questionsData);
      setIsLoading(false);
    }


  },[]);

  // will re-init depending on the data 
  useEffect( () =>{
      
      if( questionTempState ) {
      const buffer = [...questionTempState];

      if( props.questionsNumber <= buffer.length ) {
        setQuestions(buffer.slice( 0, props.questionsNumber ));
      }else{

          const data = new Array( Number(props.questionsNumber) ).fill().map( ( object,index ) => { 
          let returnValue;

          if( buffer[index] ) { 
              returnValue = buffer[index];
          }else{
              returnValue = { 'question':'', 'answers':['true','false'], 'answer':0 };
          }



          return returnValue;

          }
          );

        setQuestions(data);
       
      }
      }
  }, [ props.questionsNumber ] )



  // react to questions change on data state 

  useEffect(()=>{
    if(questions && questionTempState){
      const buffer = [...questionTempState];
      questions.forEach(( question,index )=> {
        buffer[index] = question;
      }
      )
      setQuestionTempState(buffer);
      props.setQuestionsStateOnParent(questions);
    }
  },[questions] );


  const handleQuestionChange = ( questionIndex,value ) => {
    const buffer = [...questions];
    buffer[ questionIndex ].question = value;
    setQuestions(buffer);
  }

  const handleAnswerChange = ( questionIndex, answerIndex, value ) => {
    const buffer = [...questions];
    buffer[ questionIndex ].answers[answerIndex] = value;
    setQuestions(buffer);
  }


  const setCorrectAnswer = (questionIndex,answerIndex) => {
    const buffer = [...questions];
    buffer[questionIndex].answer = Number(answerIndex);
    console.log(buffer);
    setQuestions(buffer);
  
  }
   
  if(!isLoading){
  return(
    <div className='add_quiz_faq pb-0'>
            <div className='add_quiz px-3 pt-3 mt-0 pb-5'>
              <div className='intructor-question-area pt-2'>
                
                <div className='quiz-pagintion-btn-area q_page_btn'>

                  {questions.map((question,index)=>{
                    return ( <button onClick={ () => setSelectedQuestion(index) } className={ `quiz-pagintion-btn ${ index == selectedQuestion ? 'MaltiQuizAct_btn' : '' }` } > {index + 1} </button> )
                  })}
                  
                </div>
                


              {
              questions.map(( question, questionIndex ) => {
                  return(
                    <div hidden={questionIndex != selectedQuestion}>
                        <h6 className='h6 fw-normal mt-3'>Question</h6>
                        <FloatingLabel controlId='floatingTextarea2' label='Type in Question' className='d-block'>
                      <Form.Control
                        as='textarea'
                        value={question.question}
                        onChange={(event) => handleQuestionChange(questionIndex,event.target.value) }
                        placeholder='Add question text'
                        style={{ height: '120px', width: '683px' }}
                      />
                        </FloatingLabel>

                        <div>
                        <h6 className='h6 fw-normal mt-3'>Answers</h6>
                        <Form>
                        <div className='s_ans_block1 mx-3'>
                  <div className='select-answer-are s_ans_area_or'>
                  
              { question.answers.map( (answer, answerIndex ) => {
                return(
                  <>
                  
                  
                    <div className='select-answer-inner  '>
                        
                      <div className='d-flex mt-2'>
                        <Form.Check value={ answerIndex } onChange={(event) => setCorrectAnswer( questionIndex, event.target.value) } name={`group-${questionIndex}`} type={'radio'} aria-label='option 1' checked={ question.answer == answerIndex } />
                        <p className='mx-1'>{answer.toString()}</p>
                      </div>
                    </div>
       
    
    
    
    
                 
    

                  </>
                )
              })}
                  
              </div>
                        </div>
                        </Form>
                        </div>

                    </div>
                  )
                  
                })
              
              
              }
                
                
              </div>
            </div>
          </div>
         
  )
            }
}
const MultipleQuestionsQuiz = ( props ) => {

  const [ questions, setQuestions ] = useState( null );
  const [ questionTempState, setQuestionTempState ] = useState( null );
  const [ selectedQuestion, setSelectedQuestion ] = useState( 0 );
  const [ isLoading, setIsLoading ] = useState( true );
  

  // will run once to init data.
  useEffect( () => {
    // init data first if there is any.
    console.log('I work each time i got re-rendred');
    if( props.questions ) {
      setQuestionTempState(props.questions);
      setQuestions(props.questions);
      setIsLoading(false);

    }

    // init data based on question number if no question is presented
    if ( !props.questions ) {
      const questionsData = new Array( props.questionsNumber  ).fill().map( ( object ) => { return { 'question':'', 'answers':['','','',''], 'answer':0 } } );
      setQuestionTempState( questionsData );
      setQuestions(questionsData);
      setIsLoading(false);
    }


  },[]);

  // will re-init depending on the data 
  useEffect( () =>{
      
      if( questionTempState ) {
      const buffer = [...questionTempState];

      if( props.questionsNumber <= buffer.length ) {
        setQuestions(buffer.slice( 0, props.questionsNumber ));
      }else{

          const data = new Array( Number(props.questionsNumber) ).fill().map( ( object,index ) => { 
          let returnValue;

          if( buffer[index] ) { 
              returnValue = buffer[index];
          }else{
              returnValue = { 'question':'', 'answers':['','','',''], 'answer':0 };
          }



          return returnValue;

          }
          );

        setQuestions(data);
       
      }
      }
  }, [ props.questionsNumber ] )

  // react to questions change on data state 

  useEffect(()=>{
    if(questions && questionTempState){
      const buffer = [...questionTempState];
      questions.forEach(( question,index )=> {
        buffer[index] = question;
      }
      )
      setQuestionTempState(buffer);
      props.setQuestionsStateOnParent(questions);
    }
  },[questions] );


  const handleQuestionChange = ( questionIndex,value ) => {
    const buffer = [...questions];
    buffer[ questionIndex ].question = value;
    setQuestions(buffer);
  }

  const handleAnswerChange = ( questionIndex, answerIndex, value ) => {
    const buffer = [...questions];
    buffer[ questionIndex ].answers[answerIndex] = value;
    setQuestions(buffer);
  }


  const setCorrectAnswer = (questionIndex,answerIndex) => {
    const buffer = [...questions];
    buffer[questionIndex].answer = Number(answerIndex);
    console.log(buffer);
    setQuestions(buffer);
  
  }
   
  if(!isLoading){
  return(
    <div className='add_quiz_faq pb-0'>
            <div className='add_quiz px-3 pt-3 mt-0 pb-5'>
              <div className='intructor-question-area pt-2'>
                
                <div className='quiz-pagintion-btn-area q_page_btn'>

                  {questions.map((question,index)=>{
                    return ( <button onClick={ () => setSelectedQuestion(index) } className={ `quiz-pagintion-btn ${ index == selectedQuestion ? 'MaltiQuizAct_btn' : '' }` } > {index + 1} </button> )
                  })}
                  
                </div>
                


              {
              questions.map(( question, questionIndex ) => {
                  
                  return(
                    <div hidden={questionIndex != selectedQuestion}>
                        <h6 className='h6 fw-normal mt-3'>Question</h6>
                        <FloatingLabel controlId='floatingTextarea2' label='Type in Question' className='d-block'>
                      <Form.Control
                        as='textarea'
                        value={question.question}
                        onChange={(event) => handleQuestionChange(questionIndex,event.target.value) }
                        placeholder='Add question text'
                        style={{ height: '120px', width: '683px' }}
                      />
                        </FloatingLabel>

                        <div>
                        <h6 className='h6 fw-normal mt-3'>Answers</h6>
                        <Form>
                        <div className='s_ans_block1 mx-3'>
                  <div className='select-answer-are s_ans_area_or'>
                  
              { question.answers.map( (answer, answerIndex ) => {
                return(
                  <>
                  
                  
                    <div className='select-answer-inner  '>
                      <Form.Control value={ answer } onChange={(event)=>{handleAnswerChange(questionIndex,answerIndex,event.target.value)}} size='sm' className="mx-auto" type='text' placeholder='Answer' />
                        
                      <div className='d-flex mt-2'>
                        <Form.Check value={ answerIndex } onChange={(event) => setCorrectAnswer( questionIndex, event.target.value) } name={`group-${questionIndex}`} type={'radio'} aria-label='option 1' checked={ question.answer == answerIndex } />
                        <p className='mx-1'>Correct Answer</p>
                      </div>
                    </div>
       
    
    
    
    
                 
    

                  </>
                )
              })}
                  
              </div>
                        </div>
                        </Form>
                        </div>

                    </div>
                  )
                  
                })
              
              
              }
                
                
              </div>
            </div>
          </div>
         
  )
            }
}

export default function QuizMain({ url,operation }) {

  const [ selectedCourse, setSelectedCourse ] = React.useState('');
  const [ numberOfQuestions, setNumberOfQuestions ] = React.useState(5);
  const [ courseIdState, setCourseIdState ] = React.useState(null);
  const [ availableCoursesForAddingQuiz, setAvailableCoursesForAddingQuiz ] = React.useState([]);
  const [ passingScore, setPassingScore ] = React.useState(70);
  const [ quizType, setQuizType ] = React.useState('trueFalse');
  const [ questions, setQuestions ] = React.useState(null);
  const [ isLoading, setIsLoading ] = React.useState(true);

  const history = useHistory();

  const { quizId } = useParams();

  const setQuestionsState = (questions) => {
    setQuestions(questions);
  }

  const validateQuizData = () => {
    let errors = [];

    questions.forEach((question,questionIndex) => {
      if(question.question.length == 0){
        errors.push(`Question number ${questionIndex + 1} is empty`)
      }
      question.answers.forEach( (answer,index) => {
        if(answer.length == 0 ){
          errors.push(`answer number ${index + 1} of question number ${questionIndex + 1} is empty`)
        }
      })
    })
    if(operation == 'Add' ){
      if(!courseIdState){
        errors.push(`No course is selected`);

      }
    }
    for(let error of errors){
      toast.error(error);
    }
    return errors.length == 0;
  }


  const handleOperation = async () => {

      let data;

      if( validateQuizData() ) {
        data = {'questions_number': numberOfQuestions, 'passing_score': passingScore}
        if(quizType === 'trueFalse') {
          data.type = 'True False';
          data.true_false_questions = questions
        }else if (quizType == 'multipleChoice') {
          data.type = 'Multiple choice';
          data.multiple_choice_questions = questions
        }
      }


    try{
        let response;
      switch ( operation ){
       
        case 'Add':
            response = await addQuiz( courseIdState, data );
            history.push(`${url}/quizzes/owned`);
            toast.success('Quiz have been added successfuly');
          break;
        case 'Edit':
            response = await updateQuiz( quizId,data );
            history.push(`${url}/quizzes/owned`);
            toast.success('Quiz have been updated successfuly')
        default:
          break;
      }


    }catch(error){
      console.log(error)
    }
  }
  //init
  useEffect( () => { 
    switch( operation ) {

      case 'View':
        initData();
        break;
      case 'Edit':
        initData();
        break;
      case 'Add':
        setQuizType('trueFalse');
        initAvailableCoursesForQuiz();
        break;
      
      default:
        console.error('No operaion is being specified for QuizMain component')
    }
  }, [] )


  const initData = async () => {
    const response = await getQuiz(quizId);
    try{
    if(response.data.data.type === 'True False') {

      setQuizType( 'trueFalse' );
      setQuestions(response.data.data.true_false_questions);

    }else if (response.data.data.type ==='Multiple choice') {

      setQuizType( 'multipleChoice' );
      setQuestions(response.data.data.multiple_choice_questions);

    }

    setPassingScore(response.data.data.passing_score);
    setNumberOfQuestions(response.data.data.questions_number);
    setIsLoading(false);
  }catch(error){
    console.log( error );
  }

  }
  const initAvailableCoursesForQuiz = async () => {
    try{
    const response = await getOwnedCoursesThatNeedQuiz();
    setAvailableCoursesForAddingQuiz(response.data.data);
    setIsLoading(true);
    setIsLoading(false);
    }catch(error){
      console.log(error)
    }
  }


  if(!isLoading){
  return (
          <>
          { !(operation === 'Edit' || operation === 'Add') ||
          <div className='mt-4 px-3'>
            <div className='dashboardContentPanel dashboardContentPanel_box'>
              {/* selection area start */}
              { operation !== 'Add' ||
              <div className='Instructor-quiz-input'>
                
                <h6>{availableCoursesForAddingQuiz.length == 0 ? 'No available courses to add quiz' : 'Choose Course' }</h6>
                <Form.Select onChange={(event) => {setCourseIdState(event.target.value)}} >
                <option> select a course </option>
                  {availableCoursesForAddingQuiz.length == 0 ||
 
                  availableCoursesForAddingQuiz.map( (course, index)=>{
                    return(
                      <option value={course._id}> {course.name} </option>
                    )
                  })}
    
                </Form.Select>
              </div>
              }
              
                  <>
                            <div className='Instructor-quiz-input'>
                <h6>Number of Questions</h6>
                <Form.Select value={ numberOfQuestions } onChange={(event) => {setNumberOfQuestions(event.target.value)}}>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='15'>15</option>
                  <option value='20'>20</option>
                  <option value='25'>25</option>
                  <option value='30'>30</option>
                  <option value='40'>40</option>
                  <option value='50'>50</option>
                  <option value='60'>60</option>
                </Form.Select>
              </div>
              <div className='Instructor-quiz-input'>
                <h6>Passing Score</h6>
                <Form.Select value={ passingScore } onChange={(event)=> setPassingScore(event.target.value)}>
                  <option value='70'>70%</option>
                  <option value='80'>80%</option>
                  <option value='90'>90%</option>
                  <option value='100'>100%</option>
                </Form.Select>
              </div>

              <div className='Instructor-quiz-input'>
                <h6>Quiz type</h6>
                <Form.Select value={quizType} onChange={(event)=> { setQuestions(null); setQuizType(event.target.value);} }>
                  <option value='trueFalse'>True/False</option>
                  <option value='multipleChoice'>Multiple Questions</option>
                </Form.Select>
              </div>

              <div className='Instructor-quiz-input'>
         
                <Button onClick={ handleOperation }> {operation === 'Add' ? 'Add Quiz' : 'Edit Quiz'} </Button>
              </div>
                  </>

             
    

            </div>
          </div>
           }

          { (operation === 'Edit' || operation === 'Add') || 
          <div className='mt-4 px-3'>
            <div className='dashboardContentPanel dashboardContentPanel_box'>
              
                  <>
                            <div className='Instructor-quiz-input'>
                <h6>Number of Questions</h6>
                <Form.Select value={ numberOfQuestions } onChange={(event) => {setNumberOfQuestions(event.target.value)}}>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='15'>15</option>
                  <option value='20'>20</option>
                  <option value='25'>25</option>
                  <option value='30'>30</option>
                  <option value='40'>40</option>
                  <option value='50'>50</option>
                  <option value='60'>60</option>
                </Form.Select>
              </div>
              <div className='Instructor-quiz-input'>
                <h6>Passing Score</h6>
                <Form.Select value={ passingScore } onChange={(event)=> setPassingScore(event.target.value)}>
                  <option value='70'>70%</option>
                  <option value='80'>80%</option>
                  <option value='90'>90%</option>
                  <option value='100'>100%</option>
                </Form.Select>
              </div>

              <div className='Instructor-quiz-input'>
                <h6>Quiz type</h6>
                <Form.Select value={quizType} onChange={(event)=> { setQuestions(null); setQuizType(event.target.value);} }>
                  <option value='trueFalse'>True/False</option>
                  <option value='multipleChoice'>Multiple Questions</option>
                </Form.Select>
              </div>
              { !(operation !== 'View') ||
              <div className='Instructor-quiz-input'>
         
                <Button onClick={ handleOperation }> {operation === 'Add' ? 'Add Quiz' : 'Edit Quiz'} </Button>
              </div>
              }
                  </>
                  

             
    

            </div>
          </div>
          }
          { quizType == 'trueFalse' 
          ? <TrueFalseQuiz questionsNumber={numberOfQuestions} setQuestionsStateOnParent={ setQuestionsState } questions={questions} ></TrueFalseQuiz>
          : <MultipleQuestionsQuiz questionsNumber={numberOfQuestions} setQuestionsStateOnParent={ setQuestionsState } questions={questions}></MultipleQuestionsQuiz>
          }
        </>
  );
  }
}
