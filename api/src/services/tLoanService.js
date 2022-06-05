

const e = require('express')
//Database Connection

var TLoan = {}

TLoan.getAll = () =>{
    return new Promise((resolve, reject) => {
        pool.connect((err, connection) => {
          if (err) {
            console.log("Database connection error", err);
            resolve(err);
          } else {
            try {
              connection.query(
                "",
                [],
                (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                }
              );
              connection.release();
            } catch (error) {
              reject(error);
            }
          }
        });
      });
}

TLoan.getTLoanByNo = (TLoanNo) =>{
    return new Promise((resolve, reject) => {
        pool.connect((err, connection) => {
          if (err) {
            console.log("Database connection error", err);
            resolve(err);
          } else {
            try {
              connection.query(
                "",
                [],
                (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                }
              );
              connection.release();
            } catch (error) {
              reject(error);
            }
          }
        });
      });
}

TLoan.createTLoan = (TLoanTypeID, CompanyID, TLoanNumber, Requestor, Purpose, ApplicationDate, Duration, RequiredDate, TLoanStatusID, PickStatus, Remarks) =>{
    return new Promise((resolve, reject) => {
        pool.connect((err, connection) => {
          if (err) {
            console.log("Database connection error", err);
            resolve(err);
          } else {
            try {
              connection.query(
                "INSERT INTO TLoan(TLoanTypeID, CompanyID, TLoanNumber, Requestor, Purpose, ApplicationDate, Duration, RequiredDate, TLoanStatusID, PickStatus, Remarks) VALUES (?,?,?,?,?,?,?,?,?,?,?) ",
                [TLoanTypeID, CompanyID, TLoanNumber, Requestor, Purpose, ApplicationDate, Duration, RequiredDate, TLoanStatusID, PickStatus, Remarks],
                (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                }
              );
              connection.release();
            } catch (error) {
              reject(error);
            }
          }
        });
      });
}

module.exports = TLoan