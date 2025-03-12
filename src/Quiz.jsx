import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import { Menu } from "lucide-react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const generateQuestion = () => {
  const operators = ["+", "-", "×"];
  const numCount = Math.floor(Math.random() * 4) + 2;
  let soal = "";
  let expression = "";

  for (let i = 0; i < numCount; i++) {
    let num = Math.floor(Math.random() * 90) + 10;
    let operator = operators[Math.floor(Math.random() * operators.length)];

    if (i === 0) {
      soal += num;
      expression += num;
    } else {
      soal += ` ${operator} ${num}`;
      expression += ` ${operator.replace("×", "*").replace("÷", "/")} ${num}`;
    }
  }
  const jawaban = evaluate(expression);

  return { soal, jawaban };
};

const evalExpression = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "×":
      return num1 * num2;
    case "÷":
      return num1 / num2;
    default:
      return null;
  }
};

function Quiz() {
  const [soalList, setSoalList] = useState([]);
  const [jawaban, setJawaban] = useState([]);
  const [hasil, setHasil] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const generateSoal = () => {
      const soalBaru = Array.from({ length: 50 }, generateQuestion);
      setSoalList(soalBaru);
      setJawaban(Array(50).fill(""));
      setHasil(Array(50).fill(""));
    };

    generateSoal();
  }, []);

  const handleInputChange = (index, value) => {
    const newJawaban = [...jawaban];
    newJawaban[index] = value;
    setJawaban(newJawaban);
  };

  const cekSemuaJawaban = () => {
    // if (jawaban.some((jwb) => jwb === "")) {
    //   window.alert("Jawaban tidak boleh kosong!");
    //   return;
    // }

    const newHasil = soalList.map((soal, index) =>
      parseFloat(jawaban[index]) === parseFloat(soal.jawaban) ? (
        "✅ Benar"
      ) : (
        <>
          ❌ Salah <br /> Jawaban : {soal.jawaban}
        </>
      )
    );

    setHasil(newHasil);
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "10px",
        width: "100%",
        backgroundColor: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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

      <h1>Math Quiz</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
          margin: "10px",
        }}
      >
        {soalList.map((soal, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              textAlign: "center",
            }}
          >
            <p>{soal.soal}</p>
            <input
              type="text"
              value={jawaban[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              style={{
                width: "70px",
                padding: "5px",
                textAlign: "center",
              }}
            />
            <p>{hasil[index]}</p>
          </div>
        ))}
      </div>

      <br />
      <button
        onClick={cekSemuaJawaban}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Cek Jawaban
      </button>
    </div>
  );
}

export default Quiz;
