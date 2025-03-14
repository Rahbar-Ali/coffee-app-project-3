import { useState } from "react";
import { coffeeOptions } from "../utils";
import Modal from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CoffeeForm = ({ isAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCoffee, setSelectedCoffe] = useState(null);
  const [showCoffeeOther, setShowCoffeeOther] = useState(false);
  const [coffeeCost, setCoffeeCost] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);

  const { globalData, setGlobalData, globalUser } = useAuth();

  async function handleSubmitForm() {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
    if (!selectedCoffee) {
      return;
    }

    try {
      const newGlobalData = {
        ...(globalData || {}),
      };

      const nowTime = Date.now();
      const timeToSubtract = hour * 60 * 60 * 1000 + min * 60 * 1000;
      const timestamp = nowTime - timeToSubtract;

      const newData = {
        name: selectedCoffee,
        cost: coffeeCost,
      };
      newGlobalData[timestamp] = newData;

      setGlobalData(newGlobalData);

      const userRef = doc(db, "users", globalUser.uid);
      const res = await setDoc(
        userRef,
        {
          [timestamp]: newData,
        },
        { merge: true }
      );
      setSelectedCoffe(null);
      setHour(0);
      setMin(0);
      setCoffeeCost(0);
    } catch (err) {
      console.log(err.message);
    } finally {
    }
  }

  return (
    <>
      {showModal && (
        <Modal
          handleCloseModal={() => {
            setShowModal(false);
          }}
        >
          <Authentication
            handleCloseModal={() => {
              setShowModal(false);
            }}
          />
        </Modal>
      )}
      <div className="section-header">
        <i className="fa-solid fa-pencil" />
        <h2>Start Tracking Today</h2>
      </div>
      <h4>Select coffee type</h4>
      <div className="coffee-grid">
        {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
          return (
            <button
              onClick={() => {
                setSelectedCoffe(option.name);
                setShowCoffeeOther(false);
              }}
              className={
                "button-card " +
                (option.name === selectedCoffee ? "coffee-button-selected" : "")
              }
              key={optionIndex}
            >
              <h4>{option.name}</h4>
              <p>{option.caffeine}mg</p>
            </button>
          );
        })}
        <button
          onClick={() => {
            setShowCoffeeOther(true);
            setSelectedCoffe(null);
          }}
          className={
            "button-card " + (showCoffeeOther ? "coffee-button-selected" : "")
          }
        >
          <h4>Other</h4>
          <p>n/a</p>
        </button>
      </div>
      {showCoffeeOther && (
        <select
          onChange={(e) => {
            setSelectedCoffe(e.target.value);
          }}
          id="coffee-list"
          className="coffee-list"
        >
          <option value={null}>Select type</option>
          {coffeeOptions.map((option, optionIndex) => {
            return (
              <option value={option.name} key={optionIndex}>
                {option.name} ({option.caffeine}mg)
              </option>
            );
          })}
        </select>
      )}
      <h4>Add the cost ($)</h4>
      <input
        value={coffeeCost}
        onChange={(e) => {
          setCoffeeCost(e.target.value);
        }}
        className="w-full"
        type="number"
        placeholder="4.5"
      />
      <h4>Time since consumption</h4>
      <div className="time-entry">
        <div>
          <h4>Hours</h4>
          <select
            onChange={(e) => {
              setHour(e.target.value);
            }}
            id="hours-select"
          >
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23,
            ].map((hour, hourIndex) => {
              return (
                <option key={hourIndex} value={hour}>
                  {hour}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h4>Hours</h4>
          <select
            onChange={(e) => {
              setMin(e.target.value);
            }}
            id="hours-select"
          >
            {[0, 5, 10, 15, 30, 45].map((min, minIndex) => {
              return (
                <option key={minIndex} value={min}>
                  {min}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button onClick={handleSubmitForm}>
        <p>Add Entry</p>
      </button>
    </>
  );
};

export default CoffeeForm;
