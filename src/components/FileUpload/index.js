import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import Categorise from "../../utils/categorise";
import firebase from "firebase";

class FileUpload extends Component {
  state = {
    useHeaders: true,
    successfull: null
  };

  formatRow = async row => {
    const moddedRow = row;

    // Format dates
    const dateArr = row.Date.split("/");
    const event =
      dateArr.length === 3
        ? new Date(`20${dateArr[2]}`, dateArr[1] - 1, dateArr[0]).toISOString()
        : "";
    moddedRow.Date = event;
    // Categorise
    const desc = row.Description;
    const category = await Categorise(desc);
    moddedRow.Category = category ? category : "";

    return moddedRow;
  };

  pushData = data => {
    // Push to firebase by row eventually, but for now just do the whole lot.
    // This replaces the whole transactions object
    firebase
      .database()
      .ref(`users/${this.props.userId}`)
      .set({
        transactions: data
      })
      .then(this.setState({ successfull: true }));
  };

  handleData = data => {
    let transactions = [];
    let count = 0;
    const dataLen = data.length;
    data.forEach(async row => {
      if (row.Account) {
        transactions.push(await this.formatRow(row));
      }
      count++;
      if (count === dataLen) {
        this.pushData(transactions);
      }
    });
  };

  onDrop = async (accepted, rejected) => {
    Papa.parse(accepted[0], {
      header: true,
      complete: ({ data }) => {
        this.handleData(data);
      }
    });
  };

  render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        {({ getRootProps, getInputProps }) => {
          return (
            <>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                  Try dropping some files here, or click to select files to
                  upload.
                </p>
              </div>
              {this.state.successfull === true && <div>Success</div>}
            </>
          );
        }}
      </Dropzone>
    );
  }
}

export default FileUpload;
