import React from "react";

function Card({card, index, hide}) {

  return (
    <div className="card" value={index}>
      {card.suit === '\u2665' || card.suit === '\u2666' ? (
        <div>
          <p className="display" style={{ color: "red" }}>{card.display}</p>
          <p className="suit" style={{ color: "red" }}>{card.suit}</p>
        </div>
      ) : (
        <div>
          <p className="display">{card.display}</p>
          <p className="suit">{card.suit}</p>
        </div>
      )}
    </div>
  )
}

export default Card