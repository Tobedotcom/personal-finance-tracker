import { useState } from "react";
import { useFinance } from "../contexts/FinanceContext";
import PotCard from "../components/pots/PotCard";
import { AnimatedPage } from "../components/ui/AnimatedPage";
import { AnimatedItem } from "../components/ui/AnimatedItem";

import "../css/pages/pots.css";

function Pots() {
  const { pots, setPots } = useFinance();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPot, setEditingPot] = useState(null);

  const [openMenuId, setOpenMenuId] = useState(null);

  const [moneyAction, setMoneyAction] = useState(null);
  const [moneyAmount, setMoneyAmount] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    target: "",
    theme: "#277C78",
  });

  // =========================
  // FORM INPUT
  // =========================

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  // =========================
  // RESET POT FORM
  // =========================

  function resetForm() {
    setFormData({
      name: "",
      target: "",
      theme: "#277C78",
    });

    setEditingPot(null);
    setIsModalOpen(false);
  }

  // =========================
  // CREATE POT
  // =========================

  async function handleSubmit(event) {
    event.preventDefault();

    const newPot = {
      name: formData.name,
      target: Number(formData.target),
      total: 0,
      theme: formData.theme,
    };

    try {
      const response = await fetch("http://localhost:3000/pots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPot),
      });

      if (!response.ok) {
        throw new Error("Failed to create pot");
      }

      const createdPot = await response.json();

      setPots((currentPots) => [...currentPots, createdPot]);

      resetForm();
    } catch (error) {
      console.error("Error adding pot:", error);
    }
  }

  // =========================
  // EDIT POT
  // =========================

  function handleEditClick(pot) {
    setOpenMenuId(null);

    setEditingPot(pot);

    setFormData({
      name: pot.name,
      target: pot.target,
      theme: pot.theme,
    });

    setIsModalOpen(true);
  }

  async function handleEdit(pot) {
    const updatedPot = {
      ...pot,
      name: formData.name,
      target: Number(formData.target),
      theme: formData.theme,
    };

    try {
      const response = await fetch(`http://localhost:3000/pots/${pot.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPot),
      });

      if (!response.ok) {
        throw new Error("Failed to update pot");
      }

      const savedPot = await response.json();

      setPots((currentPots) =>
        currentPots.map((currentPot) =>
          currentPot.id === savedPot.id ? savedPot : currentPot,
        ),
      );

      resetForm();
    } catch (error) {
      console.error("Error editing pot:", error);
    }
  }

  // =========================
  // DELETE POT
  // =========================

  async function handleDelete(potId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this pot?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/pots/${potId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete pot");
      }

      setPots((currentPots) => currentPots.filter((pot) => pot.id !== potId));
    } catch (error) {
      console.error("Error deleting pot:", error);
    }
  }

  // =========================
  // ADD MONEY
  // =========================

  function handleAddMoneyClick(pot) {
    setMoneyAction({
      type: "add",
      pot,
    });

    setMoneyAmount("");
  }

  async function handleAddMoney(pot) {
    const amount = Number(moneyAmount);

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const updatedTotal = pot.total + amount;

    try {
      const response = await fetch(`http://localhost:3000/pots/${pot.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total: updatedTotal,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add money");
      }

      const updatedPot = await response.json();

      setPots((currentPots) =>
        currentPots.map((currentPot) =>
          currentPot.id === updatedPot.id ? updatedPot : currentPot,
        ),
      );

      closeMoneyModal();
    } catch (error) {
      console.error("Error adding money:", error);
    }
  }

  // =========================
  // WITHDRAW
  // =========================

  function handleWithdrawClick(pot) {
    setMoneyAction({
      type: "withdraw",
      pot,
    });

    setMoneyAmount("");
  }

  async function handleWithdraw(pot) {
    const amount = Number(moneyAmount);

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (amount > pot.total) {
      alert("You cannot withdraw more than the amount saved.");
      return;
    }

    const updatedTotal = pot.total - amount;

    try {
      const response = await fetch(`http://localhost:3000/pots/${pot.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total: updatedTotal,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to withdraw money");
      }

      const updatedPot = await response.json();

      setPots((currentPots) =>
        currentPots.map((currentPot) =>
          currentPot.id === updatedPot.id ? updatedPot : currentPot,
        ),
      );

      closeMoneyModal();
    } catch (error) {
      console.error("Error withdrawing money:", error);
    }
  }

  // =========================
  // CLOSE MONEY MODAL
  // =========================

  function closeMoneyModal() {
    setMoneyAction(null);
    setMoneyAmount("");
  }

  // =========================
  // OPEN NEW POT MODAL
  // =========================

  function handleAddPotClick() {
    setEditingPot(null);

    setFormData({
      name: "",
      target: "",
      theme: "#277C78",
    });

    setIsModalOpen(true);
  }

  return (
    <AnimatedPage className="pots-page">
      {/* =========================
          PAGE HEADER
      ========================= */}

      <AnimatedItem>
        <div className="pots-header">
          <h1>Savings Pots</h1>

          <button className="btn btn-primary" onClick={handleAddPotClick}>
            + Add new pØt
          </button>
        </div>
      </AnimatedItem>

      {/* =========================
          POT CARDS
      ========================= */}

      <div className="pots-grid">
        {pots.map((pot) => (
          <AnimatedItem key={pot.id}>
            <PotCard
              pot={pot}
              onDelete={handleDelete}
              onEdit={handleEditClick}
              onAddMoney={handleAddMoneyClick}
              onWithdraw={handleWithdrawClick}
              isMenuOpen={openMenuId === pot.id}
              setOpenMenuId={setOpenMenuId}
            />
          </AnimatedItem>
        ))}
      </div>

      {/* =========================
          ADD / EDIT POT MODAL
      ========================= */}

      {isModalOpen && (
        <div className="pot-modal-overlay">
          <div className="pot-modal">
            <div className="pot-modal-header">
              <h2>{editingPot ? "EDIT PØT" : "NEW PØT"}</h2>
            </div>

            <form
              onSubmit={
                editingPot
                  ? (event) => {
                      event.preventDefault();
                      handleEdit(editingPot);
                    }
                  : handleSubmit
              }
            >
              <div className="form-group">
                <label htmlFor="pot-name">Pot Name</label>

                <input
                  id="pot-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. bootycall savings"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pot-target">Target Amount</label>

                <input
                  id="pot-target"
                  name="target"
                  type="number"
                  min="1"
                  value={formData.target}
                  onChange={handleChange}
                  placeholder="e.g. 500000"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pot-theme">Theme Color</label>

                <input
                  id="pot-theme"
                  name="theme"
                  type="color"
                  value={formData.theme}
                  onChange={handleChange}
                />
              </div>

              <div className="pot-modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  {editingPot ? "Save Changes" : "Create Pot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          ADD / WITHDRAW MONEY MODAL
      ========================= */}

      {moneyAction && (
        <div className="pot-modal-overlay">
          <div className="pot-modal">
            <div className="pot-modal-header">
              <h2>{moneyAction.type === "add" ? "PLUS UP" : "WITHDRAW"}</h2>
            </div>

            <p>{moneyAction.pot.name}</p>

            <p>
              Current balance:{" "}
              {moneyAction.pot.total.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
              })}
            </p>

            <div className="form-group">
              <label htmlFor="money-amount">Amount</label>

              <input
                id="money-amount"
                type="number"
                min="1"
                value={moneyAmount}
                onChange={(event) => setMoneyAmount(event.target.value)}
                placeholder="e.g. 10000"
              />
            </div>

            <div className="pot-modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeMoneyModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  moneyAction.type === "add"
                    ? handleAddMoney(moneyAction.pot)
                    : handleWithdraw(moneyAction.pot)
                }
              >
                {moneyAction.type === "add" ? "Add Money" : "Withdraw"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AnimatedPage>
  );
}

export default Pots;
