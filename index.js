var readlineSync = require("readline-sync");
var chalk = require('chalk');
var score = 0;
var highScores = [{name: "A", score:1},{name:"B",score:3}];


function welcome(){
  console.log(chalk.red("Hellooo! Welcome to ") + chalk.red.bgYellowBright.bold("Guess these famous kdramas."));

  console.log("We will be playing a fun quiz to know if you can guess these kdramas based on questions around the plot and characters.")
  var userName = readlineSync.question("First things first, what is your name? ")
  console.log("Welcome " + chalk.black.bgYellowBright.bold(userName) + " !!!!")
  console.log("--------------------------------");
}
function finalscore(){
    console.log("Your final score is " + score);
}
function highscore(){
  var flag = false;
  console.log("Current high scores are:");
  for(i=0;i<highScores.length;i++){
    console.log(highScores[i].name, " : ", highScores[i].score)
  }
  for(i=0;i<highScores.length;i++){
    if(score>highScores[i].score){
      console.log(chalk.blue("Congratulations! You are one of the high scorers. Message me and I will update the list."));
      flag = true;
      break;
    }
  }
  if(flag===false){
    console.log(chalk.red("Sorry you could not beat the high score."))
  }
}
var options = ['World of the Married', 'It\'s Okay to Not Be Okay', 'Itaewon Class', 'Crash Landing on You', 'Hospital Playlist', 'Dr. Romantic', 'When the Camellia Blooms', 'Descendants of the Sun'];

var questions = [
  {Question: "The story of two star-crossed lovers, Yoon Se-ri, a South Korean fashion entrepreneur with her company Se-ri's Choice, and Ri Jeong-hyeok, a member of the North Korean elite and a Captain in the North Korean Special Police Force", Answer: 3},
  {
    Question: "A love story between Captain Yoo Shi Jin, Korean Special Forces, and Doctor Kang Mo Yeon, surgeon at Haesung Hospital. Together they face danger in a war-torn country.", Answer: 7
  },
  {
    Question:"An ex-con and his friends fight to make their ambitious dreams for their street bar a reality.",
    Answer: 2
  }
]
var questions1 = [
  {Question: "Moon Gang-tae and Ko Moon-young are the lead characters of which show?", Answer: 1}, 
  {Question: "Oh Dong-baek and Hwang Yong-sik are the lead characters of which show? ", Answer: 6}
]

function game(ques, i){
  // var userAnswer = readlineSync.question();
  console.log(chalk.bgRedBright.bold(ques.Question));
  var userAnswer = readlineSync.keyInSelect(options, 'Guess the correct answer: ');
    if(userAnswer === ques.Answer){
      score+=1;
      console.log(chalk.green("Your answer is correct. Your current score is " + score))
      if(i===0){
        console.log("Here comes your next question....")
      }
    }
    else{
      console.log(chalk.red("Oops! Your answer is incorrect. Your current score remains unchanged."))
    }
}
function play(questions){
  for(i=0;i<questions.length - 2;i++){
    ques = questions[i];
    game(ques,0);
  }
  game(questions[questions.length - 2], -1);
  console.log("Here comes your last question...");
  game(questions[questions.length - 1], -1);
}



welcome();

console.log(chalk.blue.bgYellowBright.bold('In the first round, guess the dramas based on the given synopsis.'));
console.log("--------------------------------");
play(questions);

var answersvar = ['Yes', 'No'];
if(score===questions.length){
  console.log(chalk.blue.bgYellowBright("Congratulations! You have cleared level 1. Will you want to continue to level 2?"));
  if (readlineSync.keyInYN('Press Y if you want to continue, else press any other key')) {
    console.log("--------------------------------");
    console.log(chalk.blue.bgYellowBright.bold('In the second round, guess the dramas based on the names of the lead characters.'));
    console.log("--------------------------------");
    play(questions1);
    finalscore();
    highscore();
    }
  else {
    finalscore();
    highscore();
  }
}
else{
  console.log(chalk.red("Sorry! You can't proceed to next level."));
  finalscore();
  highscore();
}