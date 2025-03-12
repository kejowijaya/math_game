import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import "./App.css";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const greaterNumber = () => {
  const generateQuestion = () => {
    const numCount = Math.floor(Math.random() * 4) + 3;
    const numbersA = Array.from(
      { length: numCount },
      () => Math.floor(Math.random() * 900) + 100
    );
    const numbersB = Array.from(
      { length: numCount },
      () => Math.floor(Math.random() * 900) + 100
    );
    const soalA = numbersA.join(" + ");
    const soalB = numbersB.join(" + ");

    const jawabanA = numbersA.reduce((acc, num) => acc + num, 0);
    const jawabanB = numbersB.reduce((acc, num) => acc + num, 0);

    return { soalA, jawabanA, soalB, jawabanB };
  };

  const [question, setQuestion] = useState(generateQuestion());
  const [chosen, setChosen] = useState("");
  const [correct, setCorrect] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setQuestion(generateQuestion());
    setChosen(null);
    setCorrect(null);
  }, []);

  const handleChoice = (choice) => {
    setChosen(choice);
    const correctAnswer = Math.max(question.jawabanA, question.jawabanB);
    setCorrect(choice === correctAnswer ? "Benar! 🎉" : "Salah! ❌");

    setTimeout(() => {
      setQuestion(generateQuestion());
      setChosen(null);
      setCorrect(null);
    }, 1500);
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "10px",
        width: "100%",
        height: "96vh",
        backgroundColor: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "absolute",
          top: "50px",
          left: "200px",
          backgroundColor: "#f9f9f9",
          color: "#333",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              backgroundColor: "#333",
              color: "white",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
              textAlign: "center",
              zIndex: 1000, // Supaya tetap di atas elemen lain
            }}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>
              MATH GAMES
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                onClick={() => navigate("/")}
                style={{
                  width: "50%",
                  backgroundColor: "#555",
                  padding: "15px",
                  borderRadius: "5px",
                  color: "white",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                50 Quiz
              </button>
              <button
                onClick={() => navigate("/greaterNumber")}
                style={{
                  width: "50%",
                  backgroundColor: "#555",
                  padding: "15px",
                  borderRadius: "5px",
                  color: "white",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                Greater Number
              </button>
            </div>
          </div>
        </div>
      )}
      <h1>Greater Number</h1>
      <div style={{ display: "flex", gap: "20px", margin: "20px" }}>
        <div
          style={{
            padding: "20px",
            border:
              chosen === question.jawabanA
                ? "3px solid green"
                : "2px solid gray",
            backgroundColor:
              chosen === question.jawabanA ? "#d4edda" : "#f9f9f9",
            cursor: "pointer",
            minWidth: "250px",
            borderRadius: "10px",
            textAlign: "center",
          }}
          onClick={() => handleChoice(question.jawabanA)}
        >
          <h3>{question.soalA}</h3>
          <h2>{chosen !== null && question.jawabanA}</h2>
        </div>

        {/* Kotak Soal B */}
        <div
          style={{
            padding: "20px",
            border:
              chosen === question.jawabanB
                ? "3px solid green"
                : "2px solid gray",
            backgroundColor:
              chosen === question.jawabanB ? "#d4edda" : "#f9f9f9",
            cursor: "pointer",
            minWidth: "250px",
            borderRadius: "10px",
            textAlign: "center",
          }}
          onClick={() => handleChoice(question.jawabanB)}
        >
          <h3>{question.soalB}</h3>
          <h2>{chosen !== null && question.jawabanB}</h2>
        </div>
      </div>

      {/* Tampilkan Hasil */}
      {correct !== null && (
        <h2 style={{ color: correct === "Benar! 🎉" ? "green" : "red" }}>
          {correct}
        </h2>
      )}
    </div>
  );
};

export default greaterNumber;
