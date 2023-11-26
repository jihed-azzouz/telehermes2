import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import axios from "axios";

const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Rome", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    answer: "Mars",
  },
  {
    question:
      "What gas do plants absorb from the atmosphere for photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  {
    question: "In which country are the ancient Pyramids of Giza located?",
    options: ["Mexico", "India", "Egypt", "Peru"],
    answer: "Egypt",
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Jane Austen",
      "Charles Dickens",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "Which is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Grizzly Bear"],
    answer: "Blue Whale",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["WO", "H2O", "HO2", "W2"],
    answer: "H2O",
  },
  {
    question: "In what year did man first walk on the moon?",
    options: ["1969", "1972", "1965", "1980"],
    answer: "1969",
  },
  {
    question:
      "Which language is used to create websites along with HTML and CSS?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quizTaken, setQuizTaken] = useState(false);

  //allow users to play once every 24 hours
  useEffect(() => {
    // Check if the user has already taken the quiz today
    const lastTaken = localStorage.getItem("lastQuizTaken");
    if (
      lastTaken &&
      new Date().getTime() - new Date(lastTaken).getTime() < 24 * 60 * 60 * 1000
    ) {
      setQuizTaken(true);
    }
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 10); // Each correct answer gives 10 XP
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      localStorage.setItem("lastQuizTaken", new Date().toISOString());
      // Send score to the backend for storing in the database
      axios
        .post("/api/save-quiz-score", { score })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error saving the quiz score", error);
        });
    }
  };

  if (quizTaken) {
    return (
      <div>You have already taken the quiz today. Come back tomorrow!</div>
    );
  }

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          Quiz Game
        </CardTitle>
        <CardBody>
          <Container>
            {showScore ? (
              <div>
                You scored {score} out of
                {(quizQuestions.length * 10).toString()}
              </div>
            ) : (
              <div>
                <div className="mb-2">
                  <span>Question {currentQuestion + 1}</span>/
                  {quizQuestions.length}
                </div>
                <div className="mb-4">
                  {quizQuestions[currentQuestion].question}
                </div>
                <div>
                  {quizQuestions[currentQuestion].options.map((option) => (
                    <Button
                      key={option}
                      onClick={() =>
                        handleAnswerOptionClick(
                          option === quizQuestions[currentQuestion].answer
                        )
                      }
                      className="me-2 mb-2"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </CardBody>
      </Card>
    </div>
  );
};

export default Quiz;
