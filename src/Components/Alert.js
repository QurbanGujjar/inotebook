import React from "react";

function Alert({alert}) {
    const handleLetter=(word)=>{
      if(word==="danger"){
        word="error"
      }
        let lower= word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)


    }
  return (

    alert && <div className={`alert alert-${alert.type}  alert-dismissible fade show`}  role='alert'>
        <strong>{handleLetter(alert.type)}! </strong>{alert.message}

      </div>

  );
}

export default Alert;
