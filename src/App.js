import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
} from "reactstrap";

class App extends Component {
  state = {
    books: [],
    newBooksData: {
      title: "",
      rating: "",
    },
    editBookData: {
      id: "",
      title: "",
      rating: "",
    },
    newBookModal: false,
    editBookModal: false,
  };

  componentWillMount() {
    this._refershlist();
  }

  toggleNewBookModal() {
    this.setState({
      newBookModal: !this.state.newBookModal,
    });
  }

  toggleEditBookModal() {
    this.setState({
      editBookModal: !this.state.editBookModal,
    });
  }

  addBook() {
    axios
      .post(
        "https://6008378b309f8b0017ee59e4.mockapi.io/book-store",
        this.state.newBooksData
      )
      .then((response) => {
        let { books } = this.state;
        books.push(response.data);
        this.setState({
          books,
          newBookModal: false,
          newBooksData: {
            title: "",
            rating: "",
          },
        });
      });
  }

  deleteBook(id) {
    axios
      .delete("https://6008378b309f8b0017ee59e4.mockapi.io/book-store/" + id)
      .then((response) => {
        this._refershlist();
      });
  }

  updateBook() {
    let { title, rating } = this.state.editBookData;
    axios
      .put(
        "https://6008378b309f8b0017ee59e4.mockapi.io/book-store/" +
          this.state.editBookData.id,
        {
          title,
          rating,
        }
      )
      .then((response) => {
        this._refershlist();
        this.setState({
          editBookModal: false,
          editBookData: { id: "", title: "", rating: "" },
        });
      });
  }

  _refershlist() {
    axios
      .get("https://6008378b309f8b0017ee59e4.mockapi.io/book-store")
      .then((response) => {
        this.setState({
          books: response.data,
        });
      });
  }

  editBook(id, title, rating) {
    this.setState({
      editBookData: { id, title, rating },
      editBookModal: !this.state.editBookModal,
    });
  }

  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.rating}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={this.editBook.bind(
                this,
                book.id,
                book.title,
                book.rating
              )}
            >
              Edit
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={this.deleteBook.bind(this, book.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App container">
        <h1>Books App</h1>

        <Button
          className="my-3"
          color="primary"
          onClick={this.toggleNewBookModal.bind(this)}
        >
          Add A New Book
        </Button>
        <Modal
          isOpen={this.state.newBookModal}
          toggle={this.toggleNewBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>
            Modal title
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.state.newBooksData.title}
                onChange={(e) => {
                  let { newBooksData } = this.state;
                  newBooksData.title = e.target.value;
                  this.setState({ newBooksData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input
                id="rating"
                value={this.state.newBooksData.rating}
                onChange={(e) => {
                  let { newBooksData } = this.state;
                  newBooksData.rating = e.target.value;
                  this.setState({ newBooksData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>
              Add Book
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.editBookModal}
          toggle={this.toggleEditBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>
            Modal title
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.state.editBookData.title}
                onChange={(e) => {
                  let { editBookData } = this.state;
                  editBookData.title = e.target.value;
                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input
                id="rating"
                value={this.state.editBookData.rating}
                onChange={(e) => {
                  let { editBookData } = this.state;
                  editBookData.rating = e.target.value;
                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook.bind(this)}>
              Update Book
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleEditBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.newBookModal}
          toggle={this.toggleNewBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>
            Modal title
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.state.newBooksData.title}
                onChange={(e) => {
                  let { newBooksData } = this.state;
                  newBooksData.title = e.target.value;
                  this.setState({ newBooksData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input
                id="rating"
                value={this.state.newBooksData.rating}
                onChange={(e) => {
                  let { newBooksData } = this.state;
                  newBooksData.rating = e.target.value;
                  this.setState({ newBooksData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>
              Add Book
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>{books}</tbody>
        </Table>
      </div>
    );
  }
}

export default App;
