import { useState } from "react";
import Card from "../ui/Card";
import "../../css/components/potCard.css";

function PotCard({
  pot,
  onDelete,
  onEdit,
  onAddMoney,
  onWithdraw,
  isMenuOpen,
  setOpenMenuId,
}) {
  const percentage = Math.min((pot.total / pot.target) * 100, 100);

  function handleDeleteClick() {
    setOpenMenuId(null);
    onDelete(pot.id);
  }
  function handleEditClick() {
    setOpenMenuId(null);

    if (onEdit) {
      onEdit(pot);
    }
  }

  return (
    <Card className="pot-card">
      {/* Header */}
      <div className="pot-card-header">
        <div className="pot-title">
          <span className="color-dot" style={{ backgroundColor: pot.theme }} />

          <h3>{pot.name}</h3>
        </div>

        {/* Options Menu */}
        <div className="pot-menu">
          <button
            className="icon-button"
            onClick={() => setOpenMenuId(isMenuOpen ? null : pot.id)}
            aria-label="Pot options"
          >
            •••
          </button>

          {isMenuOpen && (
            <div className="pot-menu-dropdown">
              <button onClick={handleEditClick}>Edit Pot</button>

              <button className="delete-option" onClick={handleDeleteClick}>
                Delete Pot
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="pot-amount">
        <div className="pot-amount-labels">
          <span>Total Saved</span>

          <span className="pot-target">
            Target:{" "}
            {pot.target.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </span>
        </div>

        <strong>
          {pot.total.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}
        </strong>
      </div>

      {/* Progress */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: pot.theme,
          }}
        />
      </div>

      <span className="progress-label">{percentage.toFixed(0)}%</span>

      {/* Actions */}
      <div className="pot-actions">
        <button className="btn btn-secondary" onClick={() => onAddMoney(pot)}>
          Add Money
        </button>

        <button className="btn btn-secondary" onClick={() => onWithdraw(pot)}>
          Withdraw
        </button>
      </div>
    </Card>
  );
}

export default PotCard;
