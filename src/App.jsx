import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import "./App.css";

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

function App() {
  const [soalList, setSoalList] = useState([]);
  const [jawaban, setJawaban] = useState([]);
  const [hasil, setHasil] = useState([]);

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
        maxWidth: "1400px",
        backgroundColor: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Permainan Matematika</h1>
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

export default App;
